import { refreshBoard } from "../utils.js";

export const saveData = function (data, refresh = true) {
  localStorage.setItem("cards", JSON.stringify(data));
  if (refresh) {
    refreshBoard();
  }
};
