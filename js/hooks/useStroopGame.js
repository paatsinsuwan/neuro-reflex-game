import { useState, useRef, useEffect, useMemo, d3 } from '../vendor.js';
import { STROOP_COLORS, TRIAL_TIME_MS, POINTS } from '../constants.js';

// Game state and rules for the Stroop task: stimulus generation, trial timer,
// scoring, and derived performance stats.
export function useStroopGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [taskMode, setTaskMode] = useState("ink");
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [currentWord, setCurrentWord] = useState(STROOP_COLORS[0]);
  const [currentInk, setCurrentInk] = useState(STROOP_COLORS[0]);
  const [trialStartTime, setTrialStartTime] = useState(Date.now());
  const [timeLeftPercent, setTimeLeftPercent] = useState(100);
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  const maxTrialTime = TRIAL_TIME_MS[difficulty];
  const trialIdCounter = useRef(0);

  const stats = useMemo(() => {
    if (history.length === 0) return { avgRt: 0, accuracy: 100, flexIndex: 0 };
    const correctItems = history.filter((h) => h.correct);
    const avgRt = correctItems.length > 0 ? d3.mean(correctItems, (d) => d.responseTime) || 0 : 0;
    const accuracy = correctItems.length / history.length * 100;
    const speedFactor = Math.max(10, 100 - avgRt / maxTrialTime * 100);
    const flexIndex = Math.min(100, Math.round(accuracy * 0.6 + speedFactor * 0.4));
    return {
      avgRt: Math.round(avgRt),
      accuracy: Math.round(accuracy),
      flexIndex
    };
  }, [history, maxTrialTime]);

  const generateStimulus = () => {
    trialIdCounter.current += 1;
    const randomWord = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];
    let randomInk = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];
    if (difficulty === "hard") {
      if (randomInk.id === randomWord.id) {
        const filtered = STROOP_COLORS.filter((c) => c.id !== randomWord.id);
        randomInk = filtered[Math.floor(Math.random() * filtered.length)];
      }
    } else {
      if (Math.random() > 0.5) {
        randomInk = randomWord;
      }
    }
    setCurrentWord(randomWord);
    setCurrentInk(randomInk);
    setTrialStartTime(Date.now());
    setTimeLeftPercent(100);
  };

  const recordTrial = (responseTime, correct) => {
    setHistory((prev) => [
      ...prev,
      {
        id: trialIdCounter.current,
        word: currentWord.name,
        inkColor: currentInk.name,
        isCongruent: currentWord.id === currentInk.id,
        responseTime,
        correct,
        difficulty,
        mode: taskMode
      }
    ]);
  };

  useEffect(() => {
    generateStimulus();
  }, [difficulty, taskMode]);

  useEffect(() => {
    let frameId;
    const tick = () => {
      if (!isPlayingRef.current) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = Date.now() - trialStartTime;
      const remainingPercent = Math.max(0, 100 - elapsed / maxTrialTime * 100);
      setTimeLeftPercent(remainingPercent);
      if (elapsed >= maxTrialTime) {
        setStreak(0);
        setFeedback({ type: "error", text: "Timeout!" });
        recordTrial(maxTrialTime, false);
        generateStimulus();
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [trialStartTime, maxTrialTime, currentWord, currentInk, difficulty, taskMode]);

  const handleChoice = (colorId) => {
    if (!isPlaying) return;
    const responseTime = Date.now() - trialStartTime;
    const targetId = taskMode === "ink" ? currentInk.id : currentWord.id;
    const isCorrect = colorId === targetId;
    if (isCorrect) {
      const points = POINTS[difficulty];
      setScore((s) => s + points);
      setStreak((st) => st + 1);
      setFeedback({ type: "success", text: `+${points} Correct` });
    } else {
      setStreak(0);
      setFeedback({ type: "error", text: "Incorrect" });
    }
    recordTrial(responseTime, isCorrect);
    generateStimulus();
  };

  const resetMetrics = () => {
    setScore(0);
    setStreak(0);
    setHistory([]);
    setFeedback(null);
    generateStimulus();
  };

  return {
    difficulty,
    setDifficulty,
    taskMode,
    setTaskMode,
    isPlaying,
    togglePlaying: () => setIsPlaying(!isPlaying),
    score,
    streak,
    history,
    feedback,
    currentWord,
    currentInk,
    timeLeftPercent,
    stats,
    handleChoice,
    resetMetrics
  };
}
