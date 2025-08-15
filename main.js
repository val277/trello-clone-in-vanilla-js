import { refreshBoard } from "./modules/utils.js";
import { addCard } from "./modules/addCard.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header button").addEventListener("click", addCard);
  refreshBoard();
});
