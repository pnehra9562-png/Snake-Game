import { BOARD_SIZE } from "../constants";
import "../styles/global.css";

const Board = ({ snake, food }) => {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 22px)` }}
    >
      {[...Array(BOARD_SIZE)].map((_, row) =>
        [...Array(BOARD_SIZE)].map((_, col) => {
          const isSnake = snake.some(([x, y]) => x === col && y === row);
          const isHead = snake[0][0] === col && snake[0][1] === row;
          const isFood = food[0] === col && food[1] === row;

          let cls = "cell";
          if (isSnake) cls += isHead ? " snake-head" : " snake";
          if (isFood) cls += " food";

          return <div key={`${row}-${col}`} className={cls}></div>;
        }),
      )}
    </div>
  );
};

export default Board;
