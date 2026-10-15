import { jsx, jsxs } from '../vendor.js';
import { TimerRing } from './TimerRing.js';
import { ResponseChart } from './ResponseChart.js';

// Dark top panel: play/pause control, countdown ring, stimulus word,
// current objective label, and response-time chart.
export function StimulusMonitor({ width, height, isMobile, isPlaying, onTogglePlaying, taskMode, currentWord, currentInk, feedback, timeLeftPercent, history }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-hidden border-b border-border bg-[#0b0f19] select-none", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-3 z-10 flex items-center justify-end pointer-events-none", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onTogglePlaying,
        onMouseDown: (e) => e.stopPropagation(),
        onTouchStart: (e) => e.stopPropagation(),
        className: "w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-none bg-muted/90 hover:bg-secondary-hover text-foreground pointer-events-auto relative overflow-visible after:absolute after:-inset-1",
        "aria-label": isPlaying ? "Pause animation" : "Play animation",
        children: /* @__PURE__ */ jsx("span", { className: "material-icons !text-base", children: isPlaying ? "pause" : "play_arrow" })
      }
    ) }),
    /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${width} ${height}`, width, height, role: "img", "aria-label": "Stroop task interaction monitor displaying cognitive performance profile charts and reaction speeds", children: [
      /* @__PURE__ */ jsx("g", { opacity: "0.15", children: /* @__PURE__ */ jsx("line", { x1: width * 0.5, y1: "0", x2: width * 0.5, y2: height, stroke: "#fff", strokeWidth: "1", strokeDasharray: "4,4" }) }),
      /* @__PURE__ */ jsx(TimerRing, { width, height, isMobile, timeLeftPercent }),
      /* @__PURE__ */ jsx(ResponseChart, { width, height, isMobile, history })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute text-center bg-card/60 backdrop-blur-xs rounded-lg p-2 border border-border/10 text-white pointer-events-none",
        style: {
          left: `${width * 0.08}px`,
          top: `${height * 0.08}px`,
          width: `${width * (isMobile ? 0.36 : 0.34)}px`
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-wider text-slate-400 font-medium uppercase", children: "Current Objective" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-primary mt-0.5 truncate", children: taskMode === "ink" ? "Match Ink Color" : "Match Written Word" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute flex flex-col items-center justify-center pointer-events-none",
        style: {
          left: `${width * (isMobile ? 0.07 : 0.08)}px`,
          top: `${height * 0.28}px`,
          width: `${width * (isMobile ? 0.38 : 0.34)}px`,
          height: `${height * 0.44}px`
        },
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-2xl sm:text-3xl font-medium tracking-wide transition-all duration-75 block w-full text-center",
              style: { color: currentInk.hex, filter: isPlaying ? "none" : "blur(4px)" },
              children: isPlaying ? currentWord.name : "PAUSED"
            }
          ),
          feedback && /* @__PURE__ */ jsx(
            "div",
            {
              className: `text-xs mt-2 px-2 py-0.5 rounded-full font-medium ${feedback.type === "success" ? "bg-success/20 text-success" : "bg-error/20 text-error"}`,
              children: feedback.text
            }
          )
        ]
      }
    )
  ] });
}
