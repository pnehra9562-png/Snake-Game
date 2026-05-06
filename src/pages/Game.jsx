import { useEffect } from "react";
import Board from "../components/Board";
import { useSnakeGame } from "../hooks/useSnakeGame";

const Game = () => {
  const {
    snake,
    food,
    gameOver,
    score,
    highScore,
    restartGame,
    resetGame,
    startGame,
    isStarted,
    setDirection, // 👈 ADD THIS (important)
  } = useSnakeGame();

  // 📱 Swipe Controls
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      // 👉 horizontal swipe
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) setDirection("RIGHT");
        else setDirection("LEFT");
      }
      // 👉 vertical swipe
      else {
        if (dy > 0) setDirection("DOWN");
        else setDirection("UP");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setDirection]);

  return (
    <div className="game-container">
      
      <div className="score">
        Score: <span>{score}</span>
      </div>

      <div className="score">
        High Score: <span>{highScore}</span>
      </div>

      {/* Start Button */}
      {!isStarted && (
        <button onClick={startGame}>
          Start Game
        </button>
      )}

      {/* Controls */}
      <div className="controls-area">
        {gameOver && (
          <>
            <div className="game-over">Game Over</div>

            <div className="buttons">
              <button onClick={restartGame}>Restart</button>
              <button onClick={resetGame}>Reset</button>
            </div>
          </>
        )}
      </div>

      {/* Board */}
      {isStarted && <Board snake={snake} food={food} />}

    </div>
  );
};

export default Game;