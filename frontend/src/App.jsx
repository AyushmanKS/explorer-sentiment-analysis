import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { story, levelBackgrounds, introduction } from "./constants";
import Hero from "./sections/Hero";
import TopNavBar from "./components/TopNavBar";
import ConfettiEffect from "./components/ConfettiEffect";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PROGRESS_API_ROUTE = `${API_BASE_URL}/api/progress`;

const getUserId = () => {
  let userId = localStorage.getItem("sentimentAdventureUserId");
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("sentimentAdventureUserId", userId);
  }
  return userId;
};

function App() {
  const [gameState, setGameState] = useState("intro");
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [robotState, setRobotState] = useState("intro");
  const [gameData, setGameData] = useState(story);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const userId = useMemo(() => getUserId(), []);

  useEffect(() => {
    const initializeApp = async () => {
      if (!userId) {
        setIsAppLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${PROGRESS_API_ROUTE}/${userId}`);
        setUnlockedLevel(data.unlockedLevel);
        setCurrentLevel(1);
      } catch (error) {
        console.error("Could not fetch progress. Starting fresh.", error);
        setUnlockedLevel(1);
        setCurrentLevel(1);
      } finally {
        setIsAppLoading(false);
      }
    };
    initializeApp();
  }, [userId]);

  const saveProgress = useCallback(
    async (newLevel) => {
      if (!userId || newLevel <= unlockedLevel) return;
      try {
        await axios.post(`${PROGRESS_API_ROUTE}/${userId}`, {
          newUnlockedLevel: newLevel,
        });
        setUnlockedLevel(newLevel);
      } catch (error) {
        console.error("Failed to save progress", error);
      }
    },
    [userId, unlockedLevel]
  );

  const activeContentData = useMemo(() => {
    if (gameState === "intro") return { steps: introduction };
    return gameData.find((l) => l.level === currentLevel);
  }, [gameState, gameData, currentLevel]);

  const currentStepData = useMemo(() => {
    if (!activeContentData?.steps?.[currentStep]) {
      return { robot: "thinking", type: "intro", text: "Loading..." };
    }
    return activeContentData.steps[currentStep];
  }, [activeContentData, currentStep]);

  useEffect(() => {
    setRobotState(currentStepData.robot || "thinking");
    if (currentLevel === 8) {
      setShowConfetti(true);
      saveProgress(8);
    } else {
      setShowConfetti(false);
    }
  }, [currentStep, currentLevel, gameState, currentStepData, saveProgress]);

  const handleSetCurrentLevel = useCallback(
    (level) => {
      if (level <= unlockedLevel) {
        setCurrentLevel(level);
        setCurrentStep(0);
        setGameState("playing");
      }
    },
    [unlockedLevel]
  );

  const handleAnswer = useCallback(
    (isCorrect) => {
      let newRobotState;
      if (isCorrect === true) newRobotState = "happy";
      else if (isCorrect === false) newRobotState = "sad";
      else if (isCorrect)
        newRobotState =
          isCorrect === "Positive"
            ? "happy"
            : isCorrect === "Negative"
            ? "sad"
            : "neutral";

      if (newRobotState) {
        setRobotState(newRobotState);
      }

      if (isCorrect) {
        const newGameData = JSON.parse(JSON.stringify(gameData));
        const level = newGameData.find((l) => l.level === currentLevel);
        if (level?.steps?.[currentStep]) {
          level.steps[currentStep].isComplete = true;
          setGameData(newGameData);
        }
      }
    },
    [gameData, currentLevel, currentStep]
  );

  const handleNext = useCallback(() => {
    if (
      (currentStepData.type !== "intro" &&
        !currentStepData.isComplete &&
        gameState === "playing") ||
      currentLevel === 8
    )
      return;

    if (gameState === "intro") {
      if (currentStep < introduction.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setGameState("playing");
        setCurrentStep(0);
        setCurrentLevel(1);
      }
      return;
    }

    const isLastStep = currentStep === activeContentData?.steps.length - 1;
    if (isLastStep) {
      if (currentLevel < 8) {
        const nextLevel = currentLevel + 1;
        saveProgress(nextLevel);
        setCurrentLevel(nextLevel);
        setCurrentStep(0);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [
    gameState,
    currentStep,
    saveProgress,
    currentLevel,
    activeContentData,
    currentStepData,
  ]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const isNextDisabled =
    (gameState === "playing" &&
      currentStepData.type !== "intro" &&
      !currentStepData.isComplete) ||
    currentLevel === 8;

  const background =
    gameState === "intro"
      ? levelBackgrounds[0]
      : levelBackgrounds[currentLevel - 1];

  if (isAppLoading) {
    return (
      <main
        className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${levelBackgrounds[0]})` }}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Loading Maya's Adventure...
        </h1>
      </main>
    );
  }

  return (
    <main
      className="w-screen h-screen bg-cover bg-center overflow-hidden transition-all duration-1000"
      style={{ backgroundImage: `url(${background})` }}
    >
      {showConfetti && <ConfettiEffect />}
      {gameState === "playing" && (
        <TopNavBar
          levels={gameData}
          currentLevel={currentLevel}
          unlockedLevel={unlockedLevel}
          setCurrentLevel={handleSetCurrentLevel}
        />
      )}

      {activeContentData && activeContentData.steps && (
        <Hero
          levelData={activeContentData}
          currentStep={currentStep}
          robotState={robotState}
          onNext={handleNext}
          onPrev={handlePrev}
          onAnswer={handleAnswer}
          isNextDisabled={isNextDisabled}
          isIntro={gameState === "intro"}
        />
      )}
    </main>
  );
}

export default App;
