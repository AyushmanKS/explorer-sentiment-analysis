import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContentDisplay = ({ step, onAnswer }) => {
  if (!step) {
    return null;
  }

  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [cleanedWords, setCleanedWords] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [sortBins, setSortBins] = useState(null);
  const [orderedItems, setOrderedItems] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [filledWord, setFilledWord] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wrongWord, setWrongWord] = useState(null);
  const [isTreasureOpen, setIsTreasureOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  useEffect(() => {
    setIsQuestionComplete(step.isComplete || false);
    setWrongAnswers([]);
    setShowReset(false);
    setIsImageModalOpen(false);

    if (step.type === "cleanup") {
      if (step.isComplete) {
        const allRemovableIds = step.sentence
          .split(" ")
          .map((word, index) =>
            step.wordsToRemove.includes(word) ? `${word}-${index}` : null
          )
          .filter(Boolean);
        setCleanedWords(allRemovableIds);
      } else {
        setCleanedWords([]);
      }
    }

    if (step.type === "fill-in-the-blank") {
      if (step.isComplete) {
        setFilledWord(step.answer);
      } else {
        setFilledWord(null);
      }
    }

    if (step.type === "sort") {
      if (step.isComplete) {
        const solvedBins = {
          [step.bins[0]]: [],
          [step.bins[1]]: [],
          unsorted: [],
        };
        step.items.forEach((item) => {
          if (solvedBins[item.category]) {
            solvedBins[item.category].push(item);
          }
        });
        setSortBins(solvedBins);
      } else {
        setSortBins({
          [step.bins[0]]: [],
          [step.bins[1]]: [],
          unsorted: step.items,
        });
      }
    }

    if (step.type === "order") {
      if (step.isComplete) {
        setOrderedItems(step.correctOrder);
      } else {
        setOrderedItems(step.items);
      }
    }

    if (step.type === "slider") {
      if (step.isComplete) {
        const [min, max] = step.answerRange;
        setSliderValue((min + max) / 2);
      } else {
        setSliderValue(50);
      }
    }

    if (step.type === "sentiment-sleuth") {
      if (step.isComplete) {
        setSelectedWord(step.answer);
        setWrongWord(null);
      } else {
        setSelectedWord(null);
        setWrongWord(null);
      }
    }

    if (step.type === "treasure-reveal") {
      setIsSummaryModalOpen(false);
      if (step.isComplete) {
        setIsTreasureOpen(true);
      } else {
        setIsTreasureOpen(false);
      }
    }
  }, [step]);

  const handleTreasureClick = () => {
    if (isTreasureOpen) {
      setIsSummaryModalOpen(true);
    } else {
      setIsTreasureOpen(true);
      onAnswer(true);
    }
  };

  const handleSleuthClick = (word) => {
    if (isQuestionComplete) return;
    const isCorrect = word === step.answer;
    onAnswer(isCorrect);
    if (isCorrect) {
      setSelectedWord(word);
      setIsQuestionComplete(true);
      setWrongWord(null);
    } else {
      setWrongWord(word);
    }
  };

  const handleFillBlank = (word) => {
    if (isQuestionComplete) return;
    setFilledWord(word);
    const isCorrect = word === step.answer;
    onAnswer(isCorrect);
    if (isCorrect) setIsQuestionComplete(true);
  };
  const handleQuizSubmit = (option) => {
    if (isQuestionComplete) return;
    const isCorrect = option === step.answer;
    onAnswer(isCorrect);
    if (isCorrect) setIsQuestionComplete(true);
    else if (!wrongAnswers.includes(option))
      setWrongAnswers((prev) => [...prev, option]);
  };
  const handleCleanupClick = (word, index) => {
    if (isQuestionComplete) return;
    const uniqueId = `${word}-${index}`;
    if (!cleanedWords.includes(uniqueId)) {
      const newCleanedWords = [...cleanedWords, uniqueId];
      setCleanedWords(newCleanedWords);

      const totalRemovableInstances = step.sentence
        .split(" ")
        .filter((w) => step.wordsToRemove.includes(w)).length;

      if (newCleanedWords.length >= totalRemovableInstances) {
        onAnswer(true);
        setIsQuestionComplete(true);
      }
    }
  };
  const handleDragStart = (e, item) =>
    e.dataTransfer.setData("item", JSON.stringify(item));
  const handleDragOver = (e) => e.preventDefault();
  const handleSortDrop = (e, targetBin) => {
    if (isQuestionComplete) return;
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const newBins = {
      ...sortBins,
      unsorted: sortBins.unsorted.filter((i) => i.id !== item.id),
    };
    if (!newBins[targetBin].find((i) => i.id === item.id))
      newBins[targetBin].push(item);
    setSortBins(newBins);
  };
  const handleOrderDrop = (e, dropIndex) => {
    if (isQuestionComplete) return;
    const itemJSON = e.dataTransfer.getData("item");
    if (!itemJSON) return;
    const item = JSON.parse(itemJSON);
    const newItems = orderedItems.filter((i) => i !== item.id);
    newItems.splice(dropIndex, 0, item.id);
    setOrderedItems(newItems);
  };
  const checkSortAnswer = () => {
    const isCorrect = step.items.every((item) =>
      sortBins[item.category].find((i) => i.id === item.id)
    );
    onAnswer(isCorrect);
    if (isCorrect) setIsQuestionComplete(true);
    else setShowReset(true);
  };
  const checkOrderAnswer = () => {
    const isCorrect = orderedItems.every(
      (item, index) => item === step.correctOrder[index]
    );
    onAnswer(isCorrect);
    if (isCorrect) setIsQuestionComplete(true);
    else setShowReset(true);
  };
  const checkSliderAnswer = () => {
    const [min, max] = step.answerRange;
    const isCorrect = sliderValue >= min && sliderValue <= max;
    onAnswer(isCorrect);
    if (isCorrect) setIsQuestionComplete(true);
  };

  const handleReset = () => {
    setShowReset(false);
    if (step.type === "sort")
      setSortBins({
        [step.bins[0]]: [],
        [step.bins[1]]: [],
        unsorted: step.items,
      });
    if (step.type === "order") setOrderedItems(step.items);
  };

  const renderContent = () => {
    switch (step.type) {
      case "intro":
        return (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <motion.p
              key={step.text}
              className="text-2xl font-semibold text-[var(--color-text-heading)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {step.text}
            </motion.p>
            {step.image && (
              <motion.button
                onClick={() => setIsImageModalOpen(true)}
                className="mt-6 cursor-zoom-in"
                title="Click to enlarge"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src={step.image}
                  alt="Ancient Map"
                  className="max-h-64 object-contain rounded-lg shadow-lg border-4 border-white"
                  layoutId={`map-image-${step.text}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.button>
            )}
          </div>
        );
      case "quiz":
      case "sentiment-strength":
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6">{step.question}</h3>
            <div className="space-y-3">
              {step.options.map((option) => {
                const isCorrectAnswer = option === step.answer;
                const wasChosenWrong = wrongAnswers.includes(option);
                let buttonStyle = "bg-white/70 hover:bg-white";
                if (isQuestionComplete && isCorrectAnswer) {
                  buttonStyle = "bg-green-300";
                } else if (wasChosenWrong) {
                  buttonStyle = "bg-red-300";
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleQuizSubmit(option)}
                    disabled={isQuestionComplete}
                    className={`block w-full p-3 rounded-xl text-lg font-semibold shadow-md transition-all ${buttonStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "cleanup":
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6">{step.question}</h3>
            <div className="bg-white/70 p-4 rounded-xl text-xl font-semibold flex flex-wrap gap-x-2 gap-y-2">
              {step.sentence.split(" ").map((word, index) => {
                const uniqueId = `${word}-${index}`;
                const isRemovable = step.wordsToRemove.includes(word);
                const isRemoved = cleanedWords.includes(uniqueId);

                if (isRemovable) {
                  return (
                    <motion.button
                      key={uniqueId}
                      onClick={() => handleCleanupClick(word, index)}
                      disabled={isQuestionComplete || isRemoved}
                      className={`px-2 py-1 rounded-md transition-all ${
                        isRemoved
                          ? "bg-red-200 text-red-500 line-through"
                          : "bg-blue-200 hover:bg-blue-300"
                      }`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {word}
                    </motion.button>
                  );
                }
                return <span key={uniqueId}> {word} </span>;
              })}
            </div>
          </div>
        );
      case "sort":
        if (!sortBins) return null;
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-4">{step.question}</h3>
            <div className="flex justify-center gap-4 mb-4 min-h-[48px]">
              {sortBins.unsorted.map((item) => (
                <div
                  key={item.id}
                  draggable={!isQuestionComplete}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`p-2 bg-blue-200 rounded-md ${
                    !isQuestionComplete ? "cursor-grab" : "cursor-not-allowed"
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {step.bins.map((binName) => (
                <div
                  key={binName}
                  onDrop={(e) => handleSortDrop(e, binName)}
                  onDragOver={handleDragOver}
                  className={`w-1/2 p-4 border-2 border-dashed rounded-lg min-h-[100px] ${
                    binName === "Hopeful Gems"
                      ? "border-green-400"
                      : "border-red-400"
                  } ${isQuestionComplete ? "bg-gray-100/70" : ""}`}
                >
                  <h4 className="font-bold mb-2">{binName}</h4>
                  {sortBins[binName].map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 rounded-md mb-2 ${
                        isQuestionComplete ? "bg-green-200" : "bg-gray-200"
                      }`}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {showReset ? (
              <button
                onClick={handleReset}
                className="mt-4 p-2 bg-orange-500 text-white rounded-lg font-bold"
              >
                Try Again
              </button>
            ) : (
              sortBins.unsorted.length === 0 &&
              !isQuestionComplete && (
                <button
                  onClick={checkSortAnswer}
                  className="mt-4 p-2 bg-teal-500 text-white rounded-lg font-bold"
                >
                  Check Answer
                </button>
              )
            )}
          </div>
        );
      case "slider":
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-4">{step.question}</h3>
            {isQuestionComplete && (
              <div className="my-4 p-3 bg-green-200 rounded-lg font-bold text-green-800">
                Rating Submitted!
              </div>
            )}
            <p className="font-semibold text-xl mb-4 p-3 bg-white/70 rounded-lg">
              {step.sentence}
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
              disabled={isQuestionComplete}
              className="w-full"
            />
            <div className="flex justify-between w-full text-sm font-bold mt-2">
              <span>{step.labels[0]}</span>
              <span>{step.labels[1]}</span>
              <span>{step.labels[2]}</span>
            </div>
            {!isQuestionComplete && (
              <button
                onClick={checkSliderAnswer}
                className="mt-6 p-2 bg-teal-500 text-white rounded-lg font-bold"
              >
                Submit Rating
              </button>
            )}
          </div>
        );
      case "order":
        if (!orderedItems) return null;
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-4">{step.question}</h3>
            <div className="p-4 bg-white/70 rounded-lg min-h-[200px]">
              {orderedItems.map((item, index) => (
                <div
                  key={item}
                  draggable={!isQuestionComplete}
                  onDragStart={(e) => handleDragStart(e, { id: item })}
                  onDrop={(e) => handleOrderDrop(e, index)}
                  onDragOver={handleDragOver}
                  className={`p-3 mb-2 rounded-lg flex items-center gap-2 ${
                    isQuestionComplete
                      ? "bg-green-200"
                      : "bg-blue-200 cursor-grab"
                  }`}
                >
                  <span className="font-bold">{index + 1}.</span> {item}
                </div>
              ))}
            </div>
            {showReset ? (
              <button
                onClick={handleReset}
                className="mt-4 p-2 bg-orange-500 text-white rounded-lg font-bold"
              >
                Try Again
              </button>
            ) : (
              !isQuestionComplete && (
                <button
                  onClick={checkOrderAnswer}
                  className="mt-4 p-2 bg-teal-500 text-white rounded-lg font-bold"
                >
                  Check Order
                </button>
              )
            )}
          </div>
        );
      case "sentiment-sleuth":
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6">{step.question}</h3>
            <div className="bg-white/70 p-6 rounded-xl text-2xl font-semibold flex flex-wrap gap-x-3 gap-y-2">
              {step.sentence.split(" ").map((word, index) => {
                const isAnswer = word === step.answer;
                const isWronglySelected = wrongWord === word;

                let wordStyle =
                  "cursor-pointer hover:bg-yellow-200/50 rounded-lg px-2 py-1 transition-colors";
                if (isQuestionComplete && isAnswer) {
                  wordStyle = "bg-green-300 rounded-lg px-2 py-1";
                } else if (isWronglySelected) {
                  wordStyle = "bg-red-300 rounded-lg px-2 py-1";
                }

                return (
                  <motion.span
                    key={index}
                    onClick={() => handleSleuthClick(word)}
                    className={wordStyle}
                    style={{
                      pointerEvents: isQuestionComplete ? "none" : "auto",
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          </div>
        );
      case "fill-in-the-blank": {
        const isCorrect = filledWord === step.answer;
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6">{step.question}</h3>
            <div className="bg-white/70 p-6 rounded-xl text-2xl font-semibold mb-6">
              <span>{step.sentenceParts[0]} </span>
              <span
                className={`inline-block px-4 py-1 rounded-lg ${
                  filledWord
                    ? isCorrect
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-gray-300"
                }`}
              >
                {filledWord || "_______"}
              </span>
              <span> {step.sentenceParts[1]}</span>
            </div>
            <div className="flex justify-center gap-4">
              {step.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFillBlank(option)}
                  disabled={isQuestionComplete}
                  className="p-3 rounded-xl text-lg font-semibold shadow-md bg-blue-200 hover:bg-blue-300 disabled:opacity-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case "story-vibe":
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-4">{step.question}</h3>
            <div className="bg-black/10 p-4 rounded-lg text-lg italic mb-6">
              "{step.storyText}"
            </div>
            <div className="space-y-3">
              {step.options.map((option) => {
                const isCorrectAnswer = option === step.answer;
                const wasChosenWrong = wrongAnswers.includes(option);
                let buttonStyle = "bg-white/70 hover:bg-white";
                if (isQuestionComplete && isCorrectAnswer) {
                  buttonStyle = "bg-green-300";
                } else if (wasChosenWrong) {
                  buttonStyle = "bg-red-300";
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleQuizSubmit(option)}
                    disabled={isQuestionComplete}
                    className={`block w-full p-3 rounded-xl text-lg font-semibold shadow-md transition-all ${buttonStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "treasure-reveal":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {!isTreasureOpen ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center"
                >
                  <h3 className="text-3xl font-bold mb-4">
                    {step.initialText}
                  </h3>
                  <motion.button
                    onClick={handleTreasureClick}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    title="Click to open the treasure!"
                  >
                    <img
                      src={step.treasureImage}
                      alt="Treasure Chest"
                      className="max-h-80 object-contain"
                    />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center"
                >
                  <h3 className="text-3xl font-extrabold text-[var(--color-gold)] mb-4">
                    Click the treasure to see what you've learned!
                  </h3>
                  <motion.button
                    onClick={handleTreasureClick}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    title="Reveal your knowledge!"
                  >
                    <img
                      src={step.treasureOpenImage}
                      alt="Open Treasure Chest"
                      className="max-h-80 object-contain"
                    />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  const isIntroStep = step.type === "intro";
  const containerClasses = `w-full h-full flex flex-col items-center p-8 text-center text-[var(--color-text-heading)] ${
    isIntroStep ? "justify-center" : "justify-start"
  }`;

  return (
    <>
      <div className={containerClasses}>{renderContent()}</div>

      <AnimatePresence>
        {isImageModalOpen && step.image && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsImageModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={step.image}
              alt="Ancient Map - Fullscreen"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
              layoutId={`map-image-${step.text}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSummaryModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsSummaryModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-peach)] p-8 rounded-2xl shadow-2xl border-4 border-white max-w-2xl w-full cursor-default"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h3 className="text-4xl font-extrabold text-[var(--color-gold)] mb-6 text-center">
                {step.summaryTitle}
              </h3>
              <ul className="space-y-3">
                {step.summaryPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    className="text-xl font-semibold text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContentDisplay;
