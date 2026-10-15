import { jsx, jsxs, ToggleGroup } from '../vendor.js';

const ITEM_CLASS = "flex-1 min-w-0 text-center px-3 rounded-full text-sm font-medium text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-white hover:text-foreground transition-colors cursor-pointer relative after:absolute after:-inset-y-2 after:inset-x-0 overflow-visible";

// Labeled single-select pill toggle built on Radix ToggleGroup.
export function SegmentedToggle({ label, value, onChange, options }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx(
      ToggleGroup.Root,
      {
        type: "single",
        value,
        onValueChange: (val) => {
          if (val) onChange(val);
        },
        className: "rounded-full flex w-full bg-muted h-9 p-1",
        children: options.map((opt) => /* @__PURE__ */ jsx(ToggleGroup.Item, { value: opt.value, className: ITEM_CLASS, title: opt.title, children: /* @__PURE__ */ jsx("span", { className: "truncate block w-full", children: opt.label }) }, opt.value))
      }
    )
  ] });
}
