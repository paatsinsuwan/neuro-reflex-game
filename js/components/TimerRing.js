import { jsx, jsxs } from '../vendor.js';

// Circular countdown for the current trial; turns red under 30% remaining.
export function TimerRing({ cx, cy, r, timeLeftPercent }) {
  const circumference = 2 * Math.PI * r;
  return /* @__PURE__ */ jsxs("g", { transform: `translate(${cx}, ${cy})`, children: [
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
