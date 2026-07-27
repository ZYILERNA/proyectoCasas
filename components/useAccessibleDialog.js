"use client";

import { useEffect, useRef } from "react";

const dialogStack = [];

export default function useAccessibleDialog(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const token = Symbol("dialog");
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const inertedSiblings = [];
    dialogStack.push(token);
    document.body.style.overflow = "hidden";

    let branch = dialogRef.current;
    while (branch?.parentElement) {
      const parent = branch.parentElement;
      for (const sibling of parent.children) {
        if (sibling === branch || sibling.contains(branch)) continue;
        inertedSiblings.push({
          element: sibling,
          wasInert: sibling.hasAttribute("inert"),
        });
        sibling.setAttribute("inert", "");
      }
      if (parent === document.body) break;
      branch = parent;
    }

    const getFocusable = () =>
      [
        ...(dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || []),
      ].filter((element) => element.getClientRects().length > 0);

    window.requestAnimationFrame(() => {
      const focusable = getFocusable();
      (focusable[0] || dialogRef.current)?.focus?.();
    });

    const handleKeyDown = (event) => {
      if (dialogStack[dialogStack.length - 1] !== token) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      const index = dialogStack.lastIndexOf(token);
      if (index >= 0) dialogStack.splice(index, 1);
      document.body.style.overflow = previousOverflow;
      inertedSiblings.forEach(({ element, wasInert }) => {
        if (!wasInert) element.removeAttribute("inert");
      });
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  return dialogRef;
}
