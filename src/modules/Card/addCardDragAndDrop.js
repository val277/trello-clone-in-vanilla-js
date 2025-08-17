import { moveTask } from "../Task/moveTask.js";
import { getNearestTask } from "../Task/getNearestTask.js";
import { refreshBoard } from "../utils/refreshBoard.js";

export const addCardDragAndDrop = function (container) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const task = document.querySelector(".dragging");
    moveTask(
      task.parentElement.parentElement.querySelector("h3").textContent,
      container.querySelector("h3").textContent,
      task.textContent.replace("❌", ""),
      getNearestTask(container, e.clientY),
      e.clientY
    );
  });

  container.addEventListener("drop", (e) => {
    refreshBoard();
  });
};
