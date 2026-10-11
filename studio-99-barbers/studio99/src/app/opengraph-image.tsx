import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.seo.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const c = site.theme.colors;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.background, color: c.text, padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: -40, bottom: -150, fontSize: 620, fontWeight: 900, color: c.surface, letterSpacing: -20, display: "flex" }}>
          {site.business.wordmark.mark}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, textTransform: "uppercase", color: c.accent }}>
            {site.business.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase" }}>
            <span>Your cut.</span>
            <span>Your signature.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: c.muted }}>{site.business.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
