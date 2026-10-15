import { jsx, jsxs, useMemo, d3 } from '../vendor.js';
import { STROOP_COLORS } from '../constants.js';

// Line chart of the last 12 response times (green = correct, red = wrong).
export function ResponseChart({ x, y, width, height, history }) {
  const graphContent = useMemo(() => {
    const margin = { top: 20, right: 20, bottom: 25, left: 45 };
    const graphWidth = width;
    const graphHeight = height;
    const dataPoints = history.slice(-12);
    const xScale = d3.scaleLinear().domain([0, Math.max(5, dataPoints.length - 1)]).range([margin.left, graphWidth - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 2e3]).range([graphHeight - margin.bottom, margin.top]);
    const lineGenerator = d3.line().x((d) => xScale(d.index)).y((d) => yScale(d.val)).curve(d3.curveMonotoneX);
    const points = dataPoints.map((item, index) => ({
      val: item.responseTime,
      index,
      correct: item.correct,
      hex: STROOP_COLORS.find((c) => c.name === item.inkColor)?.hex || "#fff"
    }));
    const linePath = dataPoints.length > 0 ? lineGenerator(points.map((p) => ({ val: p.val, index: p.index }))) : "";
    const yTicks = [500, 1e3, 1500, 2e3];
    return {
      linePath,
      points,
      xScale,
      yScale,
      yTicks,
      margin,
      graphWidth,
      graphHeight
    };
  }, [history, width, height]);

  return /* @__PURE__ */ jsxs("g", { transform: `translate(${x}, ${y})`, children: [
    graphContent.yTicks.map((tick, i) => /* @__PURE__ */ jsx(
      "line",
      {
        x1: graphContent.margin.left,
        y1: graphContent.yScale(tick),
        x2: graphContent.graphWidth - graphContent.margin.right,
        y2: graphContent.yScale(tick),
        stroke: "#334155",
        strokeWidth: "1",
        strokeDasharray: "3,3",
        opacity: "0.4"
      },
      i
    )),
    graphContent.yTicks.map((tick, i) => /* @__PURE__ */ jsxs(
      "text",
      {
        x: graphContent.margin.left - 8,
        y: graphContent.yScale(tick) + 4,
        fill: "#94a3b8",
        fontSize: 11,
        textAnchor: "end",
        children: [
          tick,
          "ms"
        ]
      },
      i
    )),
    graphContent.linePath && /* @__PURE__ */ jsx(
      "path",
      {
        d: graphContent.linePath,
        fill: "none",
        stroke: "#336ef3",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    graphContent.points.map((p, i) => /* @__PURE__ */ jsx(
      "circle",
      {
        cx: graphContent.xScale(p.index),
        cy: graphContent.yScale(p.val),
        r: 4,
        fill: p.correct ? "#34a853" : "#ea4335",
        stroke: "#0b0f19",
        strokeWidth: "1.5"
      },
      i
    )),
    /* @__PURE__ */ jsx(
      "text",
      {
        x: graphContent.margin.left,
        y: graphContent.graphHeight - 4,
        fill: "#64748b",
        fontSize: 11,
        textAnchor: "start",
        children: "Last 12 response history trajectory"
      }
    )
  ] });
}
