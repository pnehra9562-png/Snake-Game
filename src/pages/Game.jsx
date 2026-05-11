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
    setDirection,
  } = useSnakeGame();

  return (
    <div className="game-container">
      <div className="score">
        Score: <span>{score}</span>
      </div>

      <div className="score">
        High Score: <span>{highScore}</span>
      </div>

      {!isStarted && <button onClick={startGame}>Start Game</button>}

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

      {isStarted && <Board snake={snake} food={food} />}

      {/* Mobile Controls */}
      {isStarted && (
        <div className="mobile-controls">
          <button onClick={() => setDirection("UP")}>↑</button>

          <div className="middle-controls">
            <button onClick={() => setDirection("LEFT")}>←</button>

            <button onClick={() => setDirection("DOWN")}>↓</button>

            <button onClick={() => setDirection("RIGHT")}>→</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
