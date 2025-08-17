import { addCardDragAndDrop } from "./addCardDragAndDrop.js";
import { addChangeEvents } from "../utils/addChangeEvents.js";
import { deleteCard } from "./deleteCard.js";
import { changeTaskColor } from "../Task/changeTaskColor.js";
import { addDraggingClassEvents } from "../utils/addDraggingClassEvents.js";
import { changeTaskDate } from "../Task/changeTaskDate.js";
import { deleteTask } from "../Task/deleteTask.js";
import { addTask } from "../Task/addTask.js";

export const generateCard = function (cardData) {
  const container = document.querySelector(".board");

  const card = document.createElement("article");
  card.classList.add("card");
  card.draggable = "true";
  addDraggingClassEvents(card);
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
      task.textContent = el.title;
      task.draggable = "true";
      addDraggingClassEvents(task);

      const changeTaskDateBtn = document.createElement("input");
      changeTaskDateBtn.type = "datetime-local";
      changeTaskDateBtn.classList.add("changeTaskDueDateBtn");
      changeTaskDateBtn.addEventListener("change", () =>
        changeTaskDate(changeTaskDateBtn, cardData.title, index)
      );
      if (cardData.tasks[index].date) {
        changeTaskDateBtn.value = cardData.tasks[index].date;
        changeTaskDateBtn.style.textShadow = "0 0 1px #000";
        const dueDate = new Date(cardData.tasks[index].date);
        const now = new Date();
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        if (daysDiff < 0) {
          changeTaskDateBtn.style.color = "#ff6b6b";
        } else if (daysDiff <= 1) {
          changeTaskDateBtn.style.color = "#ffa726";
        } else if (daysDiff <= 3) {
          changeTaskDateBtn.style.color = "#ffe600";
        }
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
