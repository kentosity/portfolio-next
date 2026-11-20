import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { Locale, Project } from "@/app/content/model";
import { siteContent } from "@/lib/content";

export const socialImageSize = { width: 1200, height: 630 };

export async function socialImage(locale: Locale, project?: Project) {
  const font = await readFile(
    path.join(process.cwd(), "assets/social-font.ttf"),
  );
  const title = project?.title[locale] || siteContent.identity.name[locale];
  const description =
    project?.summary[locale] || siteContent.introduction[locale];
  const steps = project?.workflow[locale];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "54px 64px",
          background: "#faf9f6",
          color: "#202d33",
          fontFamily: "PortfolioSocial",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 23,
            color: "#155e55",
            marginBottom: 32,
          }}
        >
          Kento Iizuka / 飯塚健杜
        </div>
        <div
          style={{
            display: "flex",
            fontSize: project ? 47 : 68,
            lineHeight: 1.25,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.5,
            color: "#526168",
          }}
        >
          {description}
        </div>
        {steps && (
          <div style={{ display: "flex", marginTop: "auto", gap: 20 }}>
            {steps.map((step, index) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  flex: 1,
                  padding: 20,
                  border: "1px solid #bfcfc6",
                  background: "#edf2ed",
                  fontSize: 20,
                  alignItems: "center",
                }}
              >
                {index + 1}. {step}
              </div>
            ))}
          </div>
        )}
        {!steps && (
          <div style={{ display: "flex", marginTop: "auto", fontSize: 24 }}>
            {siteContent.identity.role[locale]} ·{" "}
            {siteContent.identity.location[locale]}
          </div>
        )}
      </div>
    ),
    {
      ...socialImageSize,
      fonts: [
        { name: "PortfolioSocial", data: font, weight: 500, style: "normal" },
      ],
    },
  );
}
