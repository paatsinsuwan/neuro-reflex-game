import { jsx, jsxs } from '../vendor.js';
import { useContainerWidth } from '../hooks/useContainerWidth.js';
import { useStroopGame } from '../hooks/useStroopGame.js';
import { StimulusMonitor } from './StimulusMonitor.js';
import { StatsBar } from './StatsBar.js';
import { ColorButtons } from './ColorButtons.js';
import { SegmentedToggle } from './SegmentedToggle.js';

const TASK_MODE_OPTIONS = [
  { value: "ink", label: "Ink Color", title: "Match Ink Color" },
  { value: "word", label: "Word Text", title: "Match Written Word" }
];
const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Standard", title: "Easy pace" },
  { value: "hard", label: "Accelerated", title: "Hard pace" }
];

export function StroopGameWidget() {
  const { containerRef, width } = useContainerWidth();
  const game = useStroopGame();

  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "w-full bg-card text-foreground font-sans selection:bg-primary/20 flex flex-col", children: [
    /* @__PURE__ */ jsx(StimulusMonitor, {
      width,
      isPlaying: game.isPlaying,
      onTogglePlaying: game.togglePlaying,
      taskMode: game.taskMode,
      currentWord: game.currentWord,
      currentInk: game.currentInk,
      feedback: game.feedback,
      timeLeftPercent: game.timeLeftPercent,
      history: game.history
    }),
    /* @__PURE__ */ jsx(StatsBar, { score: game.score, streak: game.streak, stats: game.stats }),
    /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(ColorButtons, { disabled: !game.isPlaying, onChoice: game.handleChoice }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60", children: [
        /* @__PURE__ */ jsx(SegmentedToggle, { label: "Cognitive Target", value: game.taskMode, onChange: game.setTaskMode, options: TASK_MODE_OPTIONS }),
        /* @__PURE__ */ jsx(SegmentedToggle, { label: "Inhibition Pacing", value: game.difficulty, onChange: game.setDifficulty, options: DIFFICULTY_OPTIONS })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 pt-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Press the color matching the current target instruction." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: game.resetMetrics,
            className: "rounded-full text-xs font-medium h-8 px-4 bg-muted hover:bg-secondary-hover text-foreground whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary relative after:absolute after:-inset-y-1 after:inset-x-0",
            children: "Reset Metrics"
          }
        )
      ] })
    ] })
  ] });
}
