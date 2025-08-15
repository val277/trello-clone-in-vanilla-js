import { refreshBoard } from "./refreshBoard.js";

export const getData = () => JSON.parse(localStorage.getItem("cards")) ?? [];

export const saveData = function (data, refresh = true) {
  localStorage.setItem("cards", JSON.stringify(data));
  if (refresh) {
    refreshBoard();
  }
};
