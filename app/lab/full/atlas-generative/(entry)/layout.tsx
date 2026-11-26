import type { ReactNode } from "react";
import type { Viewport } from "next";
import { palette, paletteVariables } from "../_components/palette";
import "../[locale]/reset.css";

export const viewport: Viewport = {
  themeColor: palette.blue,
  colorScheme: "light",
};

export default function PortfolioEntryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="atlas-generative" style={paletteVariables}>
      <body>{children}</body>
    </html>
  );
}
