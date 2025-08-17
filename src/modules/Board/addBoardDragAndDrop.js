import { getData, saveData } from "../utils/localStorage.js";
import { getNearestCard } from "./getNearestCard.js";

export const addBoardDragAndDrop = function () {
  const board = document.querySelector(".board");
  board.addEventListener("dragover", (e) => {
    e.preventDefault();
    const card = document.querySelector(".dragging");

    if (card.tagName === "ARTICLE") {
      const neareastCard = getNearestCard(e.clientX);

      if (
        Array.from(document.querySelectorAll(".card")).indexOf(neareastCard) >
        Array.from(document.querySelectorAll(".card")).indexOf(
          document.querySelector(".dragging")
        )
      ) {
        neareastCard.after(document.querySelector(".dragging"));
      } else {
        neareastCard.before(document.querySelector(".dragging"));
      }

      const data = getData();

      const newData = Array.from(document.querySelectorAll(".card"))
        .map((card) => card.querySelector("h3").textContent)
        .map((title) => data.find((el) => el.title === title));

      saveData(newData, false);
    }
  });
};
