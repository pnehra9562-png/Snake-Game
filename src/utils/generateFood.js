import { BOARD_SIZE } from "../constants";

export const generateFood = () => {
  return [
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ];
};
