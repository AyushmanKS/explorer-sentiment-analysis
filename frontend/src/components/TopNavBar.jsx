import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const levelDescriptions = {
  1: "Gather clues from ancient scrolls.",
  2: "Clean the clues to reveal their secrets.",
  3: "Decode the symbols into coordinates.",
  4: "Sort the good clues from the bad.",
  5: "Read the full map and spot the traps.",
  6: "Chart the final course to the treasure.",
  7: "Use your skills on a new adventure!",
  8: "Reveal the Treasure of Insight!",
};

const LevelButton = ({ level, isUnlocked, isActive, onClick, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle =
    "w-24 h-12 rounded-lg font-bold transition-all duration-300 flex items-center justify-center shadow-md border-2";

  const activeStyle =
    "bg-[var(--color-gold)] text-[var(--color-text-heading)] border-white scale-110";
  const unlockedStyle =
    "bg-white/50 backdrop-blur-sm text-[var(--color-text-heading)] border-transparent hover:bg-white/80 hover:scale-105";
  const lockedStyle =
    "bg-black/20 text-white/50 cursor-not-allowed border-transparent";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        disabled={!isUnlocked}
        className={`${baseStyle} ${
          isActive ? activeStyle : isUnlocked ? unlockedStyle : lockedStyle
        }`}
      >
        Level {level}
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-2 bg-[var(--color-text-heading)] text-white text-xs rounded-md shadow-lg z-50 pointer-events-none"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopNavBar = ({
  levels,
  currentLevel,
  unlockedLevel,
  setCurrentLevel,
}) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 flex justify-center p-4">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {levels.map((level) => {
          const isUnlocked = level.level <= unlockedLevel;
          return (
            <LevelButton
              key={level.level}
              level={level.level}
              isUnlocked={isUnlocked}
              isActive={level.level === currentLevel}
              description={levelDescriptions[level.level] || level.title}
              onClick={() => {
                if (isUnlocked) {
                  setCurrentLevel(level.level);
                }
              }}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default TopNavBar;
