import { refreshBoard } from "./modules/utils.js";
import { addCard } from "./modules/addCard.js";

// localStorage.setItem(
//   "cards",
//   JSON.stringify([
//     {
//       title: "Oui",
//       tasks: ["Tache 1", "Tache 2"],
//     },
//     {
//       title: "Oui",
//       tasks: ["Tache 1", "Tache 2"],
//     },
//   ])
// );

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("header button").addEventListener("click", addCard);
  refreshBoard();
});
