import { jsx, jsxs } from '../vendor.js';

function Stat({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5 min-w-0 flex-1", children: [
    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-medium truncate text-center w-full", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground tabular-nums truncate text-center w-full", children })
  ] });
}

export function StatsBar({ score, streak, stats }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-x-4 sm:gap-x-8 md:gap-x-12 border-b border-border px-5 py-3 shrink-0", children: [
    /* @__PURE__ */ jsxs(Stat, { label: "Score / Streak", children: [
      score,
      " ",
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "(",
        streak,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Stat, { label: "Avg Response", children: stats.avgRt > 0 ? `${stats.avgRt} ms` : "--" }),
    /* @__PURE__ */ jsxs(Stat, { label: "Neuro-Plasticity", children: [
      stats.flexIndex,
      "%"
    ] })
  ] });
}
