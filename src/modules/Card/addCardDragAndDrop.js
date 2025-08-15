import { moveTask } from "../Task/moveTask.js";
import { getNearestElement } from "../Task/getNearestElement.js";
import { refreshBoard } from "../utils/refreshBoard.js";

export const addCardDragAndDrop = function (container) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const task = document.querySelector(".dragging");
    moveTask(
      task.parentElement.parentElement.querySelector("h3").textContent,
      container.querySelector("h3").textContent,
      task.textContent.replace("❌", ""),
      getNearestElement(container, e.clientY),
      e.clientY
    );
  });

  container.addEventListener("drop", (e) => {
    refreshBoard();
  });
};
