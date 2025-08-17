import { addBoardDragAndDrop } from "./modules/Board/addBoardDragAndDrop.js";
import { addCard } from "./modules/Card/addCard.js";
import { refreshBoard } from "./modules/utils/refreshBoard.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header button").addEventListener("click", addCard);
  addBoardDragAndDrop();
  refreshBoard();
});
