$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path '.').Path
$policyRelative = 'output/ai-full-regeneration/direct-imagegen-v1/logo-policy/logo-policy.json'
$v1Root = 'output/ai-full-regeneration/direct-imagegen-v1/raw'
$v2Root = 'output/ai-full-regeneration/direct-imagegen-v2/raw'
$reportRelative = 'output/ai-full-regeneration/direct-imagegen-v2/qa-cross/global-58-audit'
$reportDirectory = Join-Path $workspace $reportRelative
$jsonPath = Join-Path $reportDirectory 'global-58-audit.json'
$markdownPath = Join-Path $reportDirectory 'global-58-audit.md'
$excludedModels = @()
$expectedFinishes = @(
  'original', 'negro', 'wengue', 'gris-oscuro', 'antracita',
  'nogal', 'roble', 'gris-claro', 'natural', 'blanco'
)

function Read-Text([string] $Path) {
  if (Test-Path -LiteralPath $Path -PathType Leaf) {
    return Get-Content -Raw -LiteralPath $Path
  }
  return ''
}

function Try-ReadJson([string] $Path) {
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    return [pscustomobject]@{ exists = $false; parseable = $false; value = $null; error = $null }
  }
  try {
    return [pscustomobject]@{
      exists = $true
      parseable = $true
      value = (Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json)
      error = $null
    }
  }
  catch {
    return [pscustomobject]@{
      exists = $true
      parseable = $false
      value = $null
      error = $_.Exception.Message
    }
  }
}

function Get-DeclaredActiveCount($Object) {
  if ($null -eq $Object) { return $null }
  foreach ($name in @('activeCount', 'activeAssetCount', 'expectedAssets', 'expectedAssetCount', 'actualAssetCount', 'accepted', 'requested')) {
    $property = $Object.PSObject.Properties[$name]
    if ($null -ne $property -and $null -ne $property.Value -and $property.Value -isnot [System.Collections.IEnumerable]) {
      return [int] $property.Value
    }
  }
  if ($null -ne $Object.summary) {
    foreach ($name in @('activeAssetCount', 'activePassedAssets', 'active', 'approvedVisually')) {
      $property = $Object.summary.PSObject.Properties[$name]
      if ($null -ne $property -and $null -ne $property.Value) {
        return [int] $property.Value
      }
    }
  }
  foreach ($name in @('accepted', 'assets', 'activeFinishes', 'outputs', 'finishes')) {
    $property = $Object.PSObject.Properties[$name]
    if ($null -ne $property -and $null -ne $property.Value) {
      return @($property.Value).Count
    }
  }
  return $null
}

function Get-TopStatusSignals($Object) {
  $signals = @()
  if ($null -eq $Object) { return $signals }
  foreach ($name in @('status', 'result', 'score')) {
    $property = $Object.PSObject.Properties[$name]
    if ($null -ne $property -and $null -ne $property.Value) {
      $signals += [string] $property.Value
    }
  }
  if ($null -ne $Object.summary) {
    foreach ($name in @('status', 'overall', 'decision', 'result')) {
      $property = $Object.summary.PSObject.Properties[$name]
      if ($null -ne $property -and $null -ne $property.Value) {
        $signals += [string] $property.Value
      }
    }
  }
  return @($signals | Select-Object -Unique)
}

function Get-HashBindings($Object, [string] $DocumentName) {
  $result = [System.Collections.Generic.List[object]]::new()
  if ($null -eq $Object) { return @() }

  $visit = $null
  $visit = {
    param($Node)
    if ($null -eq $Node -or $Node -is [string] -or $Node -is [ValueType]) { return }

    if ($Node -is [System.Collections.IEnumerable] -and -not ($Node -is [pscustomobject])) {
      foreach ($item in $Node) { & $visit $item }
      return
    }

    $properties = @($Node.PSObject.Properties)
    if ($properties.Count -eq 0) { return }
    $fileProperty = $properties | Where-Object { $_.Name -in @('file', 'filename') } | Select-Object -First 1
    $finishProperty = $properties | Where-Object Name -eq 'finish' | Select-Object -First 1
    $hashProperty = $properties | Where-Object Name -eq 'sha256' | Select-Object -First 1
    if ($null -ne $hashProperty) {
      $file = $null
      if ($null -ne $fileProperty -and $null -ne $fileProperty.Value) {
        $rawFile = ([string] $fileProperty.Value).Replace('\\', '/')
        $file = if ($rawFile.Contains('/')) { $rawFile } else { $rawFile }
      }
      elseif ($null -ne $finishProperty -and $null -ne $finishProperty.Value) {
        $file = ([string] $finishProperty.Value) + '.png'
      }
      if ($null -ne $file) {
        $result.Add([pscustomobject]@{
          document = $DocumentName
          file = $file
          sha256 = ([string] $hashProperty.Value).ToUpperInvariant()
        })
      }
    }
    foreach ($property in $properties) { & $visit $property.Value }
  }

  & $visit $Object
  return @($result)
}

function Add-Issue([System.Collections.Generic.List[object]] $List, [string] $Severity, [string] $Code, [string] $Message) {
  $List.Add([pscustomobject]@{ severity = $Severity; code = $Code; message = $Message })
}

function Test-Regex([string] $Text, [string] $Pattern) {
  return [regex]::IsMatch($Text, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
}

function Get-Sha256OfText([string] $Text) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
    return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '')
  }
  finally { $sha.Dispose() }
}

$policy = Get-Content -Raw -LiteralPath $policyRelative | ConvertFrom-Json
$modelNames = @($policy.models | ForEach-Object model)
$modelNameDuplicates = @($modelNames | Group-Object | Where-Object Count -gt 1 | ForEach-Object Name)
$records = [System.Collections.Generic.List[object]]::new()
$globalAssetRows = [System.Collections.Generic.List[object]]::new()

foreach ($entry in $policy.models) {
  $model = [string] $entry.model
  $expectedPolicy = [string] $entry.policy
  $v2Path = Join-Path $v2Root $model
  $v1Path = Join-Path $v1Root $model
  $v2Exists = Test-Path -LiteralPath $v2Path -PathType Container
  $v1Exists = Test-Path -LiteralPath $v1Path -PathType Container
  $selectedPath = if ($v2Exists) { $v2Path } elseif ($v1Exists) { $v1Path } else { $null }
  $selectedVersion = if ($v2Exists) { 'v2' } elseif ($v1Exists) { 'v1' } else { 'none' }

  if ($model -in $excludedModels) {
    $records.Add([pscustomobject]@{
      model = $model
      expectedLogoPolicy = $expectedPolicy
      excluded = $true
      excludedReason = 'Temporarily mutating; explicitly excluded by audit request.'
      selectedVersionSnapshot = $selectedVersion
      selectedSetSnapshot = $selectedPath
      overall = 'EXCLUDED_MUTATING'
      issues = @()
    })
    continue
  }

  $issues = [System.Collections.Generic.List[object]]::new()
  if ($null -eq $selectedPath) {
    Add-Issue $issues 'ERROR' 'SET_MISSING' 'Neither an exact v2 nor v1 model directory exists.'
    $records.Add([pscustomobject]@{
      model = $model
      expectedLogoPolicy = $expectedPolicy
      excluded = $false
      selectedVersion = 'none'
      selectedSet = $null
      overall = 'FAIL_INVENTORY'
      issues = @($issues)
    })
    continue
  }

  $pngFiles = @(Get-ChildItem -LiteralPath $selectedPath -File -Filter '*.png' | Sort-Object Name)
  $assetRows = [System.Collections.Generic.List[object]]::new()
  $actualHashByFile = @{}
  foreach ($png in $pngFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($png.FullName)
    $isPng = $bytes.Length -ge 8 -and ([BitConverter]::ToString($bytes[0..7]) -eq '89-50-4E-47-0D-0A-1A-0A')
    $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $png.FullName).Hash.ToUpperInvariant()
    $actualHashByFile[$png.Name] = $hash
    $asset = [pscustomobject]@{
      finish = $png.BaseName
      file = $png.Name
      bytes = $png.Length
      sha256 = $hash
      pngSignature = $isPng
    }
    $assetRows.Add($asset)
    $globalAssetRows.Add([pscustomobject]@{ model = $model; file = $png.Name; sha256 = $hash })
  }

  $finishNames = @($pngFiles | ForEach-Object BaseName | Sort-Object)
  $finishDiff = @(Compare-Object ($expectedFinishes | Sort-Object) $finishNames)
  $uniqueHashCount = @($assetRows | ForEach-Object sha256 | Sort-Object -Unique).Count
  $pngSignatureCount = @($assetRows | Where-Object pngSignature).Count
  if ($pngFiles.Count -ne 10) { Add-Issue $issues 'ERROR' 'ROOT_PNG_COUNT' "Expected 10 root PNGs; found $($pngFiles.Count)." }
  if ($finishDiff.Count -gt 0) { Add-Issue $issues 'ERROR' 'FINISH_SET_MISMATCH' 'The ten expected finish names are not present exactly once.' }
  if ($uniqueHashCount -ne 10) { Add-Issue $issues 'ERROR' 'INTRA_MODEL_HASH_DUPLICATE' "Expected 10 unique hashes; found $uniqueHashCount." }
  if ($pngSignatureCount -ne $pngFiles.Count) { Add-Issue $issues 'ERROR' 'PNG_SIGNATURE_INVALID' 'At least one .png file does not carry the PNG signature.' }

  $manifestPath = Join-Path $selectedPath 'manifest.json'
  $qaCandidates = @('QA.json', 'QA.md', 'qa-report.md') | ForEach-Object { Join-Path $selectedPath $_ }
  $qaPath = $qaCandidates | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
  $promptsPath = Join-Path $selectedPath 'PROMPTS.md'
  $manifestRead = Try-ReadJson $manifestPath
  $qaIsJson = $null -ne $qaPath -and $qaPath.EndsWith('.json', [StringComparison]::OrdinalIgnoreCase)
  $qaRead = if ($qaIsJson) { Try-ReadJson $qaPath } else { [pscustomobject]@{ exists = ($null -ne $qaPath); parseable = ($null -ne $qaPath); value = $null; error = $null } }
  $manifestText = Read-Text $manifestPath
  $qaText = if ($null -ne $qaPath) { Read-Text $qaPath } else { '' }
  $promptsText = Read-Text $promptsPath
  $combinedText = $manifestText + "`n" + $qaText + "`n" + $promptsText
  $combinedUpper = $combinedText.ToUpperInvariant()

  if (-not $manifestRead.exists) { Add-Issue $issues 'ERROR' 'MANIFEST_MISSING' 'manifest.json is absent from the selected canonical set.' }
  elseif (-not $manifestRead.parseable) { Add-Issue $issues 'ERROR' 'MANIFEST_INVALID_JSON' $manifestRead.error }
  if ($null -eq $qaPath) { Add-Issue $issues 'ERROR' 'QA_MISSING' 'No QA.json, QA.md, or qa-report.md was found.' }
  elseif ($qaIsJson -and -not $qaRead.parseable) { Add-Issue $issues 'ERROR' 'QA_INVALID_JSON' $qaRead.error }
  elseif (-not $qaIsJson) { Add-Issue $issues 'INFO' 'QA_UNSTRUCTURED' "QA exists as $(Split-Path $qaPath -Leaf); structured JSON cross-checking is unavailable." }

  $manifestCount = if ($manifestRead.parseable) { Get-DeclaredActiveCount $manifestRead.value } else { $null }
  $qaCount = if ($qaRead.parseable -and $qaIsJson) { Get-DeclaredActiveCount $qaRead.value } else { $null }
  if ($null -ne $manifestCount -and $manifestCount -ne 10) { Add-Issue $issues 'ERROR' 'MANIFEST_COUNT_MISMATCH' "Manifest declares $manifestCount active assets; actual count is 10." }
  if ($null -ne $qaCount -and $qaCount -ne 10) { Add-Issue $issues 'ERROR' 'QA_COUNT_MISMATCH' "QA declares $qaCount active assets; actual count is 10." }

  $manifestHashCoverage = 0
  $qaHashCoverage = 0
  $combinedHashCoverage = 0
  foreach ($hash in @($assetRows | ForEach-Object sha256)) {
    if ($manifestText.ToUpperInvariant().Contains($hash)) { $manifestHashCoverage++ }
    if ($qaText.ToUpperInvariant().Contains($hash)) { $qaHashCoverage++ }
    if ($combinedUpper.Contains($hash)) { $combinedHashCoverage++ }
  }

  $bindings = @()
  if ($manifestRead.parseable) { $bindings += @(Get-HashBindings $manifestRead.value 'manifest.json') }
  if ($qaRead.parseable -and $qaIsJson) { $bindings += @(Get-HashBindings $qaRead.value 'QA.json') }
  $activeBindings = @($bindings | Where-Object { $actualHashByFile.ContainsKey($_.file) })
  $bindingMismatches = @($activeBindings | Where-Object { $actualHashByFile[$_.file] -ne $_.sha256 })
  $matchingBindingFiles = @($activeBindings | Where-Object { $actualHashByFile[$_.file] -eq $_.sha256 } | ForEach-Object file | Sort-Object -Unique)
  if ($bindingMismatches.Count -gt 0) {
    $description = ($bindingMismatches | ForEach-Object { "$($_.document):$($_.file)" }) -join ', '
    Add-Issue $issues 'ERROR' 'DOCUMENTED_HASH_MISMATCH' "Documented active hash differs from disk for: $description."
  }
  if ($combinedHashCoverage -eq 0) { Add-Issue $issues 'WARN' 'NO_ACTIVE_HASH_BINDING' 'Neither manifest nor QA contains any of the ten current active SHA-256 hashes.' }
  elseif ($combinedHashCoverage -lt 10) { Add-Issue $issues 'ERROR' 'PARTIAL_ACTIVE_HASH_BINDING' "Only $combinedHashCoverage/10 active hashes appear in the selected documentation." }

  $manifestStatuses = if ($manifestRead.parseable) { @(Get-TopStatusSignals $manifestRead.value) } else { @() }
  $qaStatuses = if ($qaRead.parseable -and $qaIsJson) { @(Get-TopStatusSignals $qaRead.value) } else { @() }
  $badStatuses = @($manifestStatuses + $qaStatuses | Where-Object { $_ -match '^(?i)(BLOCKED|INVALIDATED|SUPERSEDED|FAIL)' })
  if ($badStatuses.Count -gt 0) { Add-Issue $issues 'ERROR' 'NON_PASS_CURRENT_STATUS' ('Current top-level status signals: ' + ($badStatuses -join ', ')) }

  $explicitPolicyValues = @([regex]::Matches($combinedText, '(?i)"(?:logoPolicy|policy)"\s*:\s*"(KEEP_WONLY|NO_LOGO)"') | ForEach-Object { $_.Groups[1].Value.ToUpperInvariant() } | Sort-Object -Unique)
  $policyConflict = @($explicitPolicyValues | Where-Object { $_ -ne $expectedPolicy }).Count -gt 0
  $exactPolicyDeclared = $combinedText -match [regex]::Escape($expectedPolicy)
  if ($expectedPolicy -eq 'KEEP_WONLY') {
    $semanticPolicyDeclared = $exactPolicyDeclared -or (Test-Regex $combinedText '(exactly\s+one.{0,50}WONLY|official.{0,30}WONLY.{0,20}(logo|wordmark)|WONLY.{0,20}(logo|wordmark).{0,50}(preserv|retain|keep)|same.{0,50}master.{0,80}official.{0,20}logo)')
  }
  else {
    $semanticPolicyDeclared = $exactPolicyDeclared -or (Test-Regex $combinedText '(zero.{0,30}(logo|badge|brand|wordmark)|(?:generate|contain|carry|show|must have|with).{0,20}no.{0,20}(logo|badge|brand|wordmark)|intentionally\s+unbranded|no\s+legitimate.{0,30}logo|logoReference(?:Used)?"?\s*:\s*false)')
  }
  if ($policyConflict) { Add-Issue $issues 'ERROR' 'LOGO_POLICY_CONFLICT' ('Explicit policy values conflict with ' + $expectedPolicy + ': ' + ($explicitPolicyValues -join ', ')) }
  if (-not $semanticPolicyDeclared) { Add-Issue $issues 'ERROR' 'LOGO_POLICY_UNDECLARED' "Selected documentation does not clearly declare $expectedPolicy semantics." }
  elseif (-not $exactPolicyDeclared) { Add-Issue $issues 'WARN' 'LOGO_POLICY_ENUM_IMPLICIT' "Policy semantics match, but the exact enum $expectedPolicy is absent." }

  $imageGenDeclared = Test-Regex $combinedText '\bImageGen\b'
  $independentDeclared = Test-Regex $combinedText '(\bindependence\b|independent|independiente|independentCallPerActiveAsset"?\s*:\s*true|independentCalls"?\s*:|fresh.{0,30}(render|call))'
  $masterDeclared = Test-Regex $combinedText '(sourceMaster|masterReference|onlyReference|soleReference|master-no-logo|base-tight|canonical.{0,20}master|same.{0,20}master)'
  $masterRestrictionDeclared = Test-Regex $combinedText '(masterOnly(?:References)?"?\s*:\s*(?:true|"[^\"]+master[^\"]*")|onlyReference|soleReference|master[- ]only|only.{0,60}(?:canonical\s+)?master|independentMasterOnlyCall"?\s*:\s*true|independentSingleReferenceCall"?\s*:\s*true|singleReference(?:Call|Only)"?\s*:\s*true|referencePerCall"?\s*:\s*"[^\"]*only|(?:only|sole|single).{0,40}(?:image\s+)?reference|reference.{0,40}(?:only|sole)|base-tight.{0,40}only)'
  if ($expectedPolicy -eq 'KEEP_WONLY' -and -not $masterRestrictionDeclared) {
    $masterRestrictionDeclared = Test-Regex $combinedText '(same.{0,40}master.{0,80}official.{0,30}logo|sources.{0,100}master.{0,200}logo)'
  }
  $noOutputReferenceDeclared = $masterRestrictionDeclared -or (Test-Regex $combinedText '((?:generated)?outputs?(?:UsedAs)?References?|outputReference(?:Used)?|usedPreviousOutputAsReference)"?\s*:\s*false|no.{0,60}(generated\s+)?output.{0,40}(reference|input)|no.{0,60}generated\s+(?:finish|variant|result).{0,50}(?:input|reference)|not.{0,40}derived.{0,50}generated|no\s+accepted\s+finish.{0,60}derived|generated\s+output.{0,60}(never|false|not)')
  if (-not $imageGenDeclared) { Add-Issue $issues 'ERROR' 'IMAGEGEN_ORIGIN_UNDECLARED' 'Built-in ImageGen origin is not documented.' }
  if (-not $independentDeclared) { Add-Issue $issues 'WARN' 'INDEPENDENCE_UNDECLARED' 'Independent per-finish generation is not explicitly documented.' }
  if (-not $masterDeclared) { Add-Issue $issues 'ERROR' 'MASTER_ORIGIN_UNDECLARED' 'A canonical master source is not documented.' }
  elseif (-not $masterRestrictionDeclared) { Add-Issue $issues 'WARN' 'MASTER_ONLY_RESTRICTION_UNDECLARED' 'The master is named, but the allowed-reference restriction is not explicit.' }
  if (-not $noOutputReferenceDeclared) { Add-Issue $issues 'WARN' 'NO_OUTPUT_REFERENCE_UNDECLARED' 'Absence of output-to-output references is not explicitly documented.' }

  $noFiltersDeclared = Test-Regex $combinedText '(filters?[^"\r\n]{0,100})"?\s*:\s*(?:false|0)|pixelProcessing"?\s*:\s*"none"|(?:post)?processing"?\s*:\s*"none|operationsNotUsed.{0,120}filter|no\s+(?:pixel\s+processing|filters?)|without\s+filters?|prohibit(?:ed|s)?.{0,30}filters?'
  $noConversionDeclared = Test-Regex $combinedText '(converted|conversionPerformed|conversion)"?\s*:\s*false|operationsNotUsed.{0,160}conversion|no\s+(?:format\s+)?conversion|without\s+conversion|no\s+se\s+ha\s+convertido|sin\s+conversi|\bunconverted\b|(?:post)?processing"?\s*:\s*"none|raw\s+ImageGen\s+PNG'
  $noPublicDeclared = Test-Regex $combinedText '(publicWritten|publicModified|publicFilesModified|publicFilesChanged|public image writes?)"?\s*:\s*false|promotedToPublic"?\s*:\s*false|publicPromotionPerformed"?\s*:\s*false|promotion"?\s*:\s*"(?:NOT_PERFORMED|[^\"]*not promoted[^\"]*)|no\s+public|public.{0,45}(?:untouched|not\s+modified|not\s+written)|not\s+promoted\s+to\s+public|no\s+se\s+ha\s+promovido\s+a\s+`?public|sin\s+publicaci|\bunpublished\b'
  if (-not $noFiltersDeclared) { Add-Issue $issues 'WARN' 'NO_FILTERS_UNDECLARED' 'Absence of filters/pixel processing is not explicitly documented.' }
  if (-not $noConversionDeclared) { Add-Issue $issues 'WARN' 'NO_CONVERSION_UNDECLARED' 'Absence of conversion is not explicitly documented.' }
  if (-not $noPublicDeclared) { Add-Issue $issues 'WARN' 'NO_PUBLIC_WRITE_UNDECLARED' 'Absence of public writes is not explicitly documented.' }

  $rootMarkerFiles = @(Get-ChildItem -LiteralPath $selectedPath -File | Where-Object { $_.Name -match '(?i)(BLOCKED|INVALIDATED|SUPERSEDED)' } | ForEach-Object Name)
  if ($rootMarkerFiles.Count -gt 0) {
    Add-Issue $issues 'WARN' 'STALE_OR_CONTRADICTORY_MARKER' ('Root contains marker-like audit files: ' + ($rootMarkerFiles -join ', ') + '. Review their current meaning against QA/manifest.')
  }

  $documentationCoherent = $manifestRead.exists -and $manifestRead.parseable -and ($null -ne $qaPath) -and $qaRead.parseable -and $bindingMismatches.Count -eq 0 -and $badStatuses.Count -eq 0 -and -not $policyConflict -and ($null -eq $manifestCount -or $manifestCount -eq 10) -and ($null -eq $qaCount -or $qaCount -eq 10)
  $provenanceComplete = $imageGenDeclared -and $independentDeclared -and $masterDeclared -and $masterRestrictionDeclared -and $noOutputReferenceDeclared
  $processingDeclarationsComplete = $noFiltersDeclared -and $noConversionDeclared -and $noPublicDeclared
  $errorCount = @($issues | Where-Object severity -eq 'ERROR').Count
  $warningCount = @($issues | Where-Object severity -eq 'WARN').Count
  $inventoryErrorCodes = @('SET_MISSING', 'ROOT_PNG_COUNT', 'FINISH_SET_MISMATCH', 'INTRA_MODEL_HASH_DUPLICATE', 'PNG_SIGNATURE_INVALID')
  $hasInventoryError = @($issues | Where-Object { $_.severity -eq 'ERROR' -and $_.code -in $inventoryErrorCodes }).Count -gt 0
  $overall = if ($hasInventoryError) { 'FAIL_INVENTORY' } elseif ($errorCount -gt 0) { 'FAIL_DOCUMENTATION' } elseif ($warningCount -gt 0) { 'PASS_WITH_WARNINGS' } else { 'PASS' }

  $records.Add([pscustomobject]@{
    model = $model
    expectedLogoPolicy = $expectedPolicy
    excluded = $false
    selectedVersion = $selectedVersion
    selectedSet = $selectedPath.Replace('\\', '/')
    fallbackReason = if ($selectedVersion -eq 'v1') { 'No exact v2 directory exists.' } else { $null }
    inventory = [pscustomobject]@{
      rootPngCount = $pngFiles.Count
      exactFinishSet = ($finishDiff.Count -eq 0)
      pngSignatureCount = $pngSignatureCount
      uniqueSha256Count = $uniqueHashCount
      pass = ($pngFiles.Count -eq 10 -and $finishDiff.Count -eq 0 -and $pngSignatureCount -eq 10 -and $uniqueHashCount -eq 10)
      assets = @($assetRows)
    }
    documentation = [pscustomobject]@{
      manifest = [pscustomobject]@{ exists = $manifestRead.exists; parseable = $manifestRead.parseable; declaredActiveCount = $manifestCount; activeHashCoverage = $manifestHashCoverage; statusSignals = $manifestStatuses }
      qa = [pscustomobject]@{ exists = ($null -ne $qaPath); file = if ($null -ne $qaPath) { Split-Path $qaPath -Leaf } else { $null }; parseable = $qaRead.parseable; declaredActiveCount = $qaCount; activeHashCoverage = $qaHashCoverage; statusSignals = $qaStatuses }
      promptsExists = (Test-Path -LiteralPath $promptsPath -PathType Leaf)
      combinedActiveHashCoverage = $combinedHashCoverage
      matchingStructuredHashFiles = $matchingBindingFiles
      structuredHashMismatches = $bindingMismatches
      coherent = $documentationCoherent
    }
    logoPolicy = [pscustomobject]@{
      expected = $expectedPolicy
      exactEnumDeclared = $exactPolicyDeclared
      semanticallyDeclared = $semanticPolicyDeclared
      explicitEnumValues = $explicitPolicyValues
      conflict = $policyConflict
    }
    provenance = [pscustomobject]@{
      imageGenDeclared = $imageGenDeclared
      independentPerFinishDeclared = $independentDeclared
      masterDeclared = $masterDeclared
      allowedReferenceRestrictionDeclared = $masterRestrictionDeclared
      noGeneratedOutputReferenceDeclared = $noOutputReferenceDeclared
      complete = $provenanceComplete
      keepWonlyNote = if ($expectedPolicy -eq 'KEEP_WONLY') { 'Official WONLY logo reference is policy-permitted in addition to the canonical master; generated-output references are not.' } else { $null }
    }
    processingDeclarations = [pscustomobject]@{
      noFilters = $noFiltersDeclared
      noConversion = $noConversionDeclared
      noPublicWrite = $noPublicDeclared
      complete = $processingDeclarationsComplete
    }
    overall = $overall
    issues = @($issues)
  })
}

$auditedRecords = @($records | Where-Object { -not $_.excluded })
$excludedRecords = @($records | Where-Object excluded)
$globalDuplicateGroups = @($globalAssetRows | Group-Object sha256 | Where-Object Count -gt 1)
$hashChainLines = @($globalAssetRows | Sort-Object model, file | ForEach-Object { "$($_.model)/$($_.file) $($_.sha256)" })
$hashChain = Get-Sha256OfText ($hashChainLines -join "`n")
$allV2ModelDirectories = @(Get-ChildItem -LiteralPath $v2Root -Directory | ForEach-Object {
  $category = $_.Name
  Get-ChildItem -LiteralPath $_.FullName -Directory | ForEach-Object { "$category/$($_.Name)" }
})
$extraV2Directories = @($allV2ModelDirectories | Where-Object { $_ -notin $modelNames } | Sort-Object)
$issuesFlat = @($auditedRecords | ForEach-Object { $model = $_.model; $_.issues | ForEach-Object { [pscustomobject]@{ model = $model; severity = $_.severity; code = $_.code; message = $_.message } } })
$issueCounts = @($issuesFlat | Group-Object code | Sort-Object Name | ForEach-Object { [pscustomobject]@{ code = $_.Name; count = $_.Count } })

$report = [ordered]@{
  schema = 'wonly-global-direct-imagegen-audit/v1'
  generatedAt = (Get-Date).ToUniversalTime().ToString('o')
  mode = 'inventory and documentary audit after text-only reconciliation; no image or public mutation'
  policySource = $policyRelative
  policySourceSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $policyRelative).Hash.ToUpperInvariant()
  selectionRule = 'Use exact v2 model directory when it exists; otherwise exact v1 directory.'
  exclusions = $excludedModels
  interpretation = [ordered]@{
    keepWonlyReferences = 'For KEEP_WONLY, canonical master plus the official WONLY logo is accepted as the documented allowed reference set; generated outputs remain forbidden as references.'
    visualScope = "This is an inventory and documentary audit. It validates bytes, hashes, declarations, and coherence; it does not independently OCR or visually re-review all $($globalAssetRows.Count) images."
    passLabels = 'PASS strings are not trusted on their own; hashes, signatures, counts, policy declarations, status conflicts, and provenance declarations are checked separately.'
  }
  summary = [ordered]@{
    policyModelCount = @($policy.models).Count
    uniquePolicyModelCount = @($modelNames | Sort-Object -Unique).Count
    duplicatePolicyModels = $modelNameDuplicates
    auditedModelCount = $auditedRecords.Count
    excludedModelCount = $excludedRecords.Count
    selectedV2Count = @($auditedRecords | Where-Object selectedVersion -eq 'v2').Count
    selectedV1FallbackCount = @($auditedRecords | Where-Object selectedVersion -eq 'v1').Count
    keepWonlyAuditedCount = @($auditedRecords | Where-Object expectedLogoPolicy -eq 'KEEP_WONLY').Count
    noLogoAuditedCount = @($auditedRecords | Where-Object expectedLogoPolicy -eq 'NO_LOGO').Count
    inventoryPassCount = @($auditedRecords | Where-Object { $_.inventory.pass }).Count
    totalActivePngAudited = $globalAssetRows.Count
    validPngSignatureCount = @($auditedRecords | ForEach-Object { $_.inventory.pngSignatureCount } | Measure-Object -Sum).Sum
    globallyUniqueActiveSha256Count = @($globalAssetRows.sha256 | Sort-Object -Unique).Count
    globalDuplicateHashGroupCount = $globalDuplicateGroups.Count
    documentationCoherentCount = @($auditedRecords | Where-Object { $_.documentation.coherent }).Count
    exactLogoPolicyEnumCount = @($auditedRecords | Where-Object { $_.logoPolicy.exactEnumDeclared }).Count
    semanticLogoPolicyDeclarationCount = @($auditedRecords | Where-Object { $_.logoPolicy.semanticallyDeclared -and -not $_.logoPolicy.conflict }).Count
    provenanceDeclarationCompleteCount = @($auditedRecords | Where-Object { $_.provenance.complete }).Count
    noProcessingAndNoPublicDeclarationCompleteCount = @($auditedRecords | Where-Object { $_.processingDeclarations.complete }).Count
    strictPassCount = @($auditedRecords | Where-Object overall -eq 'PASS').Count
    passWithWarningsCount = @($auditedRecords | Where-Object overall -eq 'PASS_WITH_WARNINGS').Count
    failCount = @($auditedRecords | Where-Object { $_.overall -match '^FAIL_' }).Count
    modelsWithErrors = @($issuesFlat | Where-Object severity -eq 'ERROR' | ForEach-Object model | Sort-Object -Unique)
    modelsWithWarnings = @($issuesFlat | Where-Object severity -eq 'WARN' | ForEach-Object model | Sort-Object -Unique)
    issueCounts = $issueCounts
    inventoryHashChainSha256 = $hashChain
    extraV2DirectoriesNotInPolicyInventory = $extraV2Directories
  }
  globalDuplicateHashes = @($globalDuplicateGroups | ForEach-Object {
    [pscustomobject]@{ sha256 = $_.Name; assets = @($_.Group | ForEach-Object { "$($_.model)/$($_.file)" }) }
  })
  models = @($records)
}

$report | ConvertTo-Json -Depth 14 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$md = [System.Text.StringBuilder]::new()
[void] $md.AppendLine('# Auditoria global del inventario canonico de 58 modelos')
[void] $md.AppendLine()
[void] $md.AppendLine("Snapshot UTC: ``$($report.generatedAt)``")
[void] $md.AppendLine()
[void] $md.AppendLine('Se aplico la seleccion exacta v2 -> v1 a los 58 modelos. `AI/p105` y `ACERO/s119` se incluyen tras confirmarse estables. La reconciliacion solo actualizo manifiestos/documentacion y archivo marcadores historicos; no se editaron imagenes ni `public`. El auditor escribe unicamente este reporte y su JSON reproducible.')
[void] $md.AppendLine()
[void] $md.AppendLine('## Resultado')
[void] $md.AppendLine()
[void] $md.AppendLine("- Modelos de politica: **$($report.summary.policyModelCount)**; auditados: **$($report.summary.auditedModelCount)**; excluidos: **$($report.summary.excludedModelCount)**.")
[void] $md.AppendLine("- Seleccion: **$($report.summary.selectedV2Count) v2** y **$($report.summary.selectedV1FallbackCount) v1**.")
[void] $md.AppendLine("- Inventario fisico: **$($report.summary.inventoryPassCount)/$($report.summary.auditedModelCount)** modelos con 10 PNG raiz, acabados exactos, firma PNG y 10 hashes internos unicos.")
[void] $md.AppendLine("- Unicidad global: **$($report.summary.globallyUniqueActiveSha256Count)/$($report.summary.totalActivePngAudited)** hashes; grupos duplicados: **$($report.summary.globalDuplicateHashGroupCount)**.")
[void] $md.AppendLine("- Coherencia QA/manifest: **$($report.summary.documentationCoherentCount)/$($report.summary.auditedModelCount)**.")
[void] $md.AppendLine("- Politica de logo semanticamente declarada: **$($report.summary.semanticLogoPolicyDeclarationCount)/$($report.summary.auditedModelCount)**; enum exacto: **$($report.summary.exactLogoPolicyEnumCount)/$($report.summary.auditedModelCount)**.")
[void] $md.AppendLine("- Procedencia independiente/ImageGen/referencias documentada de forma completa: **$($report.summary.provenanceDeclarationCompleteCount)/$($report.summary.auditedModelCount)**.")
[void] $md.AppendLine("- Ausencia de filtros, conversion y escritura publica declarada de forma completa: **$($report.summary.noProcessingAndNoPublicDeclarationCompleteCount)/$($report.summary.auditedModelCount)**.")
[void] $md.AppendLine("- Clasificacion estricta: **$($report.summary.strictPassCount) PASS**, **$($report.summary.passWithWarningsCount) PASS_WITH_WARNINGS**, **$($report.summary.failCount) FAIL_DOCUMENTATION/FAIL_INVENTORY**.")
[void] $md.AppendLine()
[void] $md.AppendLine('## Anomalias reales')
[void] $md.AppendLine()
$errorIssues = @($issuesFlat | Where-Object severity -eq 'ERROR')
if ($errorIssues.Count -eq 0) {
  [void] $md.AppendLine('No se detectaron errores.')
}
else {
  [void] $md.AppendLine('| Modelo | Codigo | Detalle |')
  [void] $md.AppendLine('|---|---|---|')
  foreach ($issue in $errorIssues) {
    [void] $md.AppendLine("| ``$($issue.model)`` | ``$($issue.code)`` | $($issue.message.Replace('|', '\|')) |")
  }
}
[void] $md.AppendLine()
[void] $md.AppendLine('## Advertencias documentales')
[void] $md.AppendLine()
$warningIssues = @($issuesFlat | Where-Object severity -eq 'WARN')
if ($warningIssues.Count -eq 0) {
  [void] $md.AppendLine('No se detectaron advertencias.')
}
else {
  [void] $md.AppendLine('| Modelo | Codigo | Detalle |')
  [void] $md.AppendLine('|---|---|---|')
  foreach ($issue in $warningIssues) {
    [void] $md.AppendLine("| ``$($issue.model)`` | ``$($issue.code)`` | $($issue.message.Replace('|', '\|')) |")
  }
}
[void] $md.AppendLine()
[void] $md.AppendLine('## Resultado por modelo')
[void] $md.AppendLine()
[void] $md.AppendLine('| Modelo | Set | Politica | PNG/unicos | QA+manifest | Procedencia | Sin filtros/conversion/public | Resultado | Incidencias |')
[void] $md.AppendLine('|---|---:|---|---:|---:|---:|---:|---|---|')
foreach ($record in $records) {
  if ($record.excluded) {
    [void] $md.AppendLine("| ``$($record.model)`` | $($record.selectedVersionSnapshot) | $($record.expectedLogoPolicy) | -- | -- | -- | -- | EXCLUDED_MUTATING | -- |")
    continue
  }
  $codes = @($record.issues | Where-Object severity -ne 'INFO' | ForEach-Object code) -join ', '
  if (-not $codes) { $codes = '--' }
  $inventoryCell = "$($record.inventory.rootPngCount)/$($record.inventory.uniqueSha256Count)"
  [void] $md.AppendLine("| ``$($record.model)`` | $($record.selectedVersion) | $($record.expectedLogoPolicy) | $inventoryCell | $($record.documentation.coherent) | $($record.provenance.complete) | $($record.processingDeclarations.complete) | $($record.overall) | $codes |")
}
[void] $md.AppendLine()
[void] $md.AppendLine('## Metodo y limites')
[void] $md.AppendLine()
[void] $md.AppendLine('- Se recalculo SHA-256 directamente de cada PNG y se comprobo su firma binaria; no se acepto un estado `PASS` como evidencia suficiente.')
[void] $md.AppendLine('- La coherencia documental compara presencia/parseo, recuentos declarados, estados superiores, politica, y bindings estructurados archivo-hash cuando existen.')
[void] $md.AppendLine('- Para `KEEP_WONLY`, se admite el master canonico mas el logo WONLY oficial como conjunto de referencias permitido; nunca un output generado.')
[void] $md.AppendLine("- Esta auditoria valida inventario y declaraciones. No sustituye una inspeccion visual/OCR independiente de los $($report.summary.totalActivePngAudited) PNG.")
[void] $md.AppendLine("- Cadena SHA-256 del snapshot ordenado modelo/archivo/hash: ``$hashChain``.")
[void] $md.AppendLine('- `ACERO/l5601-correction` aparece como directorio v2 extra fuera del inventario; no se selecciono porque no es un modelo de `logo-policy.json`.')

$md.ToString() | Set-Content -LiteralPath $markdownPath -Encoding UTF8

[pscustomobject]@{
  json = $jsonPath
  markdown = $markdownPath
  summary = $report.summary
} | ConvertTo-Json -Depth 8
