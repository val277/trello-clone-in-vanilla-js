import { addTask } from "./addTask.js";
import { moveTask } from "./moveTask.js";
import { deleteCard } from "./deleteCard.js";
import { deleteTask } from "./deleteTask.js";
import { getData } from "./localStorage/loadLocalStorage.js";
import { addChangeEvents } from "./addChangeEvents.js";
import { changeTaskColor } from "./changeTaskColor.js";
import { changeTaskDate } from "./changeTaskDate.js";

export const refreshBoard = function () {
  if (document.querySelector(".board .card")) {
    document.querySelector(".board").innerHTML = "";
  }
  const data = getData();
  data.forEach((el) => {
    createCard(el);
  });
};

const getNearestElement = function (card, y) {
  const tasks = card.querySelectorAll("li");

  return tasks.length > 0
    ? Array.from(tasks)
        .reduce((acc, el) => {
          return Math.abs(
            el.getBoundingClientRect().y +
              el.getBoundingClientRect().height / 2 -
              y
          ) <
            Math.abs(
              acc.getBoundingClientRect().y +
                acc.getBoundingClientRect().height / 2 -
                y
            )
            ? el
            : acc;
        })
        .textContent.replace("❌", "")
    : undefined;
};

const addTaskDragAndDrop = function (task) {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
};

const addCardDragAndDrop = function (container) {
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

const createCard = function (cardData) {
  const container = document.querySelector(".board");

  const card = document.createElement("article");
  card.classList.add("card");
  if (cardData.color) {
    card.style.backgroundColor = cardData.color;
  }
  addCardDragAndDrop(card);

  const title = document.createElement("h3");
  title.textContent = cardData.title;
  addChangeEvents(title);

  const deleteCardBtn = document.createElement("button");
  deleteCardBtn.textContent = "❌";
  deleteCardBtn.classList.add("deleteCardBtn");
  deleteCardBtn.addEventListener("click", () => deleteCard(cardData.title));

  const changeCardColorBtn = document.createElement("input");
  changeCardColorBtn.type = "color";
  changeCardColorBtn.classList.add("changeColorBtn");
  changeCardColorBtn.addEventListener("change", () =>
    changeTaskColor(changeCardColorBtn, cardData.title)
  );
  if (cardData.color) {
    changeCardColorBtn.value = cardData.color;
  }

  const tasks = document.createElement("ul");
  tasks.classList.add("tasks");
  if (cardData.tasks) {
    cardData.tasks.forEach((el, index) => {
      const task = document.createElement("li");
      task.textContent = el;
      task.draggable = "true";
      addTaskDragAndDrop(task);

      const changeTaskDateBtn = document.createElement("input");
      changeTaskDateBtn.type = "datetime-local";
      changeTaskDateBtn.classList.add("changeTaskDateBtn");
      changeTaskDateBtn.addEventListener("change", () =>
        changeTaskDate(changeTaskDateBtn, cardData.title, index)
      );
      if (cardData.tasks[index].date) {
        changeTaskDateBtn.value = cardData.tasks[index].date;
      }

      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.textContent = "❌";
      deleteTaskBtn.classList.add("deleteTaskBtn");
      deleteTaskBtn.addEventListener("click", () =>
        deleteTask(cardData.title, index)
      );

      task.append(changeTaskDateBtn, deleteTaskBtn);
      tasks.appendChild(task);
      addChangeEvents(task);
    });
  }

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.classList.add("addTaskBtn");
  addTaskBtn.addEventListener("click", () => addTask(cardData.title));

  card.append(title, deleteCardBtn, changeCardColorBtn, tasks, addTaskBtn);
  container.appendChild(card);
};
