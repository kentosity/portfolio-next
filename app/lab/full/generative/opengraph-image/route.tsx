import { ImageResponse } from "next/og";
import { featuredProjects, siteContent } from "@/lib/content";
import { createPrint } from "../_components/art";
import { printSource } from "../_components/routing";

export function GET() {
  const artwork = createPrint(
    printSource(featuredProjects[0], siteContent.source.reviewedOn),
  );
  const artworkUrl = `data:image/svg+xml;base64,${Buffer.from(artwork).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f1f3f5",
          color: "#252c32",
          padding: 64,
          alignItems: "center",
          gap: 70,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ fontSize: 28, marginBottom: 38 }}>Kento Iizuka</div>
          <div style={{ fontSize: 78, lineHeight: 1.05, letterSpacing: -5 }}>
            Making systems make sense.
          </div>
          <div style={{ fontSize: 24, marginTop: 36 }}>
            Software, interpreted as computational prints.
          </div>
        </div>
        <img src={artworkUrl} width="350" height="420" alt="" />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
