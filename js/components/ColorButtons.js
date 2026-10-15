import { jsx } from '../vendor.js';
import { STROOP_COLORS } from '../constants.js';

export function ColorButtons({ disabled, onChoice }) {
  return /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-2 sm:grid-cols-4 gap-3", children: STROOP_COLORS.map((color) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onChoice(color.id),
      disabled,
      style: { borderColor: color.hex },
      className: "h-11 rounded-xl bg-muted hover:bg-secondary-hover border-b-2 text-foreground font-medium text-sm transition-colors relative overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed after:absolute after:-inset-y-1 after:inset-x-0",
      children: color.name
    },
    color.id
  )) });
}
