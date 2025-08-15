import { getData } from "./localStorage.js";
import { generateCard } from "../Card/generateCard.js";

export const refreshBoard = function () {
  if (document.querySelector(".board .card")) {
    document.querySelector(".board").innerHTML = "";
  }
  const data = getData();
  data.forEach((el) => {
    generateCard(el);
  });
};
