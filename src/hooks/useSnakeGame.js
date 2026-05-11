import { useEffect, useState } from "react";
import { INITIAL_DIRECTION, INITIAL_SNAKE, BOARD_SIZE } from "../constants";

const randomFood = () => [
  Math.floor(Math.random() * BOARD_SIZE),
  Math.floor(Math.random() * BOARD_SIZE),
];

export const useSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(randomFood());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [isStarted, setIsStarted] = useState(false);

  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0,
  );

  // Keyboard Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (!isStarted) return;

      if (e.key === "ArrowUp" && direction !== "DOWN") {
        setDirection("UP");
      }

      if (e.key === "ArrowDown" && direction !== "UP") {
        setDirection("DOWN");
      }

      if (e.key === "ArrowLeft" && direction !== "RIGHT") {
        setDirection("LEFT");
      }

      if (e.key === "ArrowRight" && direction !== "LEFT") {
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, isStarted]);

  // Game Loop
  useEffect(() => {
    if (!isStarted || gameOver) return;

    const interval = setInterval(moveSnake, speed);

    return () => clearInterval(interval);
  }, [snake, speed, isStarted, gameOver]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = [...newSnake[0]];

    if (direction === "UP") head[1]--;
    if (direction === "DOWN") head[1]++;
    if (direction === "LEFT") head[0]--;
    if (direction === "RIGHT") head[0]++;

    // Wall Collision
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= BOARD_SIZE ||
      head[1] >= BOARD_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // Self Collision
    if (newSnake.some(([x, y]) => x === head[0] && y === head[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Food
    if (head[0] === food[0] && head[1] === food[1]) {
      const newScore = score + 1;

      setScore(newScore);
      setFood(randomFood());

      // Increase speed
      if (newScore % 5 === 0) {
        setSpeed((prev) => Math.max(60, prev - 15));
      }

      // High Score
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore);
      }
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Start
  const startGame = () => {
    setIsStarted(true);
  };

  // Restart
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood());
    setScore(0);
    setSpeed(200);
    setGameOver(false);
    setIsStarted(true);
  };

  // Reset
  const resetGame = () => {
    if (!window.confirm("Reset everything?")) return;

    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood());
    setScore(0);
    setSpeed(200);
    setGameOver(false);
    setIsStarted(false);

    setHighScore(0);

    localStorage.setItem("highScore", 0);
  };

  return {
    snake,
    food,
    gameOver,
    score,
    highScore,
    restartGame,
    resetGame,
    startGame,
    isStarted,
    setDirection,
  };
};