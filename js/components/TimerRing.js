import { jsx, jsxs } from '../vendor.js';

// Circular countdown for the current trial; turns red under 30% remaining.
export function TimerRing({ width, height, isMobile, timeLeftPercent }) {
  const r = Math.min(width, height) * 0.24;
  const circumference = 2 * Math.PI * r;
  return /* @__PURE__ */ jsxs("g", { transform: `translate(${width * (isMobile ? 0.26 : 0.25)}, ${height * 0.5})`, children: [
    /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r, fill: "#111827", stroke: "#1f2937", strokeWidth: "6" }),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: "0",
        cy: "0",
        r,
        fill: "none",
        stroke: timeLeftPercent < 30 ? "#ea4335" : "#336ef3",
        strokeWidth: "6",
        strokeDasharray: `${circumference}`,
        strokeDashoffset: `${circumference * (1 - timeLeftPercent / 100)}`,
        transform: "rotate(-90)",
        strokeLinecap: "rounded"
      }
    )
  ] });
}
