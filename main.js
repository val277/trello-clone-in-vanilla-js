import { addCard } from "./modules/addCard.js";
import { refreshBoard } from "./modules/utils.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header button").addEventListener("click", addCard);
  refreshBoard();
});
