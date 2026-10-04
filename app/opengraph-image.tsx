import { ImageResponse } from "next/og";

export const alt = "DentaLux — стоматология в Алматы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f5f6f7", color: "#17191c", padding: "70px", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>DentaLux</div>
    <div style={{ display: "flex", fontSize: 74, letterSpacing: "-3px", lineHeight: 1.05, maxWidth: 900 }}>Здоровая улыбка. Спокойствие за результат.</div>
    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #cdd0d3", paddingTop: 24, fontSize: 26 }}><span>Стоматология в Алматы</span><span>dentalux.kz</span></div>
  </div>, size);
}
