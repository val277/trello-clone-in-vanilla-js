import { getData, saveData } from "../utils/localStorage.js";
import { getNearestCard } from "./getNearestCard.js";
import { getNearestTask } from "./getNearestTask.js";

export const addBoardDragAndDrop = function () {
  const board = document.querySelector(".board");
  board.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");

    if (dragged.tagName === "ARTICLE") {
      const neareastCard = getNearestCard(e.clientX);

      if (
        Array.from(document.querySelectorAll(".card")).indexOf(neareastCard) >
        Array.from(document.querySelectorAll(".card")).indexOf(dragged)
      ) {
        neareastCard.after(dragged);
      } else {
        neareastCard.before(dragged);
      }
    } else if (dragged.tagName === "LI") {
      const nearestCard = getNearestCard(e.clientX);
      const nearestTask = getNearestTask(nearestCard, e.clientY);

      if (nearestTask) {
        if (
          Array.from(nearestCard.querySelectorAll("li")).indexOf(nearestTask) >
          Array.from(nearestCard.querySelectorAll("li")).indexOf(dragged)
        ) {
          nearestTask.after(dragged);
        } else {
          nearestTask.before(dragged);
        }
      } else {
        nearestCard.querySelector("ul").appendChild(dragged);
      }
    }
  });

  board.addEventListener("drop", () => {
    const dragged = document.querySelector(".dragging");
    const data = getData();
    if (dragged.tagName === "ARTICLE") {
      const newData = Array.from(document.querySelectorAll(".card"))
        .map((card) => card.querySelector("h3").textContent)
        .map((title) => data.find((el) => el.title === title));
      saveData(newData);
    } else if (dragged.tagName === "LI") {
      const newData = Array.from(document.querySelectorAll(".card")).map(
        (card) => {
          const obj = {
            title: card.querySelector("h3").textContent,
            tasks: [],
          };
          if (data.find((el) => el.title === obj.title).color) {
            obj.color = card.style.backgroundColor;
          }
          const tasks = card.querySelectorAll("li");
          if (tasks) {
            tasks.forEach((task) => {
              const taskObj = {
                title: task.textContent.replace("❌", ""),
              };
              if (task.querySelector("input").value) {
                taskObj.date = task.querySelector("input").value;
              }
              obj.tasks.push(taskObj);
            });
          }
          return obj;
        }
      );
      saveData(newData);
    }
  });
};
