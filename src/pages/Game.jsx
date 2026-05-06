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
  } = useSnakeGame();

  return (
    <div className="game-container">
      <div className="score">
        Score: <span>{score}</span>
      </div>

      <div className="score">
        High Score: <span>{highScore}</span>
      </div>

      {/* Start Button */}
      {!isStarted && <button onClick={startGame}>Start Game</button>}

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
