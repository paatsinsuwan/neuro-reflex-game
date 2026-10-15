import { jsx, ErrorBoundary } from '../vendor.js';
import { ErrorFallback } from './ErrorFallback.js';
import { StroopGameWidget } from './StroopGameWidget.js';

export function App() {
  return /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsx(StroopGameWidget, {}) });
}
