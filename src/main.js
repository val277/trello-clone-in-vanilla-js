import { addCard } from "./modules/Card/addCard.js";
import { refreshBoard } from "./modules/utils/refreshBoard.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header button").addEventListener("click", addCard);
  refreshBoard();
});
