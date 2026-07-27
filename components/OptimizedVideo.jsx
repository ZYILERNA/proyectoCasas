"use client";

import { useEffect, useRef, useState } from "react";

export default function OptimizedVideo({
  sources,
  poster,
  className = "",
  ariaLabel,
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = navigator.connection?.saveData === true;
    if (reducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.15 },
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    videoRef.current.load();
    videoRef.current.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : "true"}
      tabIndex={-1}
    >
      {shouldLoad &&
        sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
    </video>
  );
}
