import { BOARD_SIZE } from "../constants";

export const checkWallCollision = (head) => {
  return (
    head[0] < 0 || head[1] < 0 || head[0] >= BOARD_SIZE || head[1] >= BOARD_SIZE
  );
};

export const checkSelfCollision = (snake) => {
  const [head, ...body] = snake;
  return body.some(([x, y]) => x === head[0] && y === head[1]);
};
