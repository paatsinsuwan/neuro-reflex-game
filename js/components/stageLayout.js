// Geometry for the dark stimulus stage. Wide screens put the timer ring and the
// chart side by side; narrow screens stack the chart under the ring.
export const MOBILE_BREAKPOINT = 600;
const MOBILE_RING_AREA_RATIO = 0.62;
const MOBILE_CHART_HEIGHT = 170;
const MOBILE_OBJECTIVE_HEIGHT = 58;
const MOBILE_CHART_INSET = 16;

export function getStageLayout(width) {
  if (width >= MOBILE_BREAKPOINT) {
    const height = width * 0.52;
    return {
      height,
      divider: { x1: width * 0.5, y1: 0, x2: width * 0.5, y2: height },
      ring: { cx: width * 0.25, cy: height * 0.5, r: Math.min(width, height) * 0.24 },
      objective: { left: width * 0.08, top: height * 0.08, width: width * 0.34 },
      stimulus: { left: width * 0.08, top: height * 0.28, width: width * 0.34, height: height * 0.44 },
      chart: { x: width * 0.52, y: 0, width: width * 0.42, height: height * 0.65 }
    };
  }

  const ringAreaHeight = width * MOBILE_RING_AREA_RATIO;
  const height = ringAreaHeight + MOBILE_CHART_HEIGHT;
  const cx = width / 2;
  const cy = MOBILE_OBJECTIVE_HEIGHT + (ringAreaHeight - MOBILE_OBJECTIVE_HEIGHT) / 2;
  const r = Math.min(width, ringAreaHeight) * 0.3;
  return {
    height,
    divider: { x1: 0, y1: ringAreaHeight, x2: width, y2: ringAreaHeight },
    ring: { cx, cy, r },
    objective: { left: width * 0.2, top: 12, width: width * 0.6 },
    stimulus: { left: cx - r, top: cy - r, width: r * 2, height: r * 2 },
    // Inset so the right-aligned tick labels ("2000ms") clear the left edge.
    chart: { x: MOBILE_CHART_INSET, y: ringAreaHeight, width: width - MOBILE_CHART_INSET, height: MOBILE_CHART_HEIGHT }
  };
}
