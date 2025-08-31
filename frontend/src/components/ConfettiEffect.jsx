import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

// --- Helper Functions for Drawing Treasure ---

// Draws a simple gold coin
const drawCoin = (ctx) => {
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, 2 * Math.PI); // A circle with radius 8
  ctx.fillStyle = "#FFD700"; // Gold color
  ctx.fill();

  // Add a little shine to the coin
  ctx.beginPath();
  ctx.arc(-3, -3, 4, 0.25 * Math.PI, 1.25 * Math.PI);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#FFFACD"; // Lemon chiffon color for shine
  ctx.stroke();
  ctx.closePath();
};

// Draws a ruby (diamond shape)
const drawRuby = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(8, 0);
  ctx.lineTo(0, 10);
  ctx.lineTo(-8, 0);
  ctx.closePath();
  ctx.fillStyle = "#E0115F"; // Ruby red
  ctx.fill();
};

// Draws a sapphire (diamond shape)
const drawSapphire = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(6, 0);
  ctx.lineTo(0, 9);
  ctx.lineTo(-6, 0);
  ctx.closePath();
  ctx.fillStyle = "#0F52BA"; // Sapphire blue
  ctx.fill();
};

// An array of all our treasure drawing functions
const treasureShapes = [drawCoin, drawRuby, drawSapphire];

// A single function that ReactConfetti will call for each particle.
// It randomly selects one of our treasure shapes to draw.
const drawTreasure = (ctx) => {
  const randomShape =
    treasureShapes[Math.floor(Math.random() * treasureShapes.length)];
  randomShape(ctx);
};

// --- Main Component ---

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

const ConfettiEffect = () => {
  const [width, height] = useWindowSize();
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 15000); // The effect will last for 15 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isRunning) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={250} // Reduced for larger shapes
      recycle={false}
      gravity={0.2}
      // Use our custom drawing function instead of default confetti
      drawShape={drawTreasure}
      onConfettiComplete={() => setIsRunning(false)}
    />
  );
};

export default ConfettiEffect;
