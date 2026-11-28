"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { palette } from "./palette";

export function PortfolioThemeColor() {
  const pathname = usePathname();

  useEffect(() => {
    let pendingFrame = 0;

    function updateThemeColor() {
      let topElement = document.elementFromPoint(window.innerWidth / 2, 1);
      let themeColor = palette.blue;

      while (topElement) {
        const backgroundColor = getComputedStyle(topElement).backgroundColor;
        const isOpaqueBackground = backgroundColor.startsWith("rgb(");
        if (isOpaqueBackground) {
          themeColor = backgroundColor;
          break;
        }
        topElement = topElement.parentElement;
      }

      const meta = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]',
      );

      if (meta && meta.content !== themeColor) meta.content = themeColor;
    }

    function scheduleUpdate() {
      cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(updateThemeColor);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(pendingFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  return null;
}
