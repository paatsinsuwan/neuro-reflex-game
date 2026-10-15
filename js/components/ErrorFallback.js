import { jsx, jsxs } from '../vendor.js';

export function ErrorFallback({ error }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-5 text-center bg-card text-foreground", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-error", children: "Cognitive engine encountered an error." }),
    /* @__PURE__ */ jsx("pre", { className: "text-xs text-muted-foreground mt-2", children: error.message })
  ] });
}
