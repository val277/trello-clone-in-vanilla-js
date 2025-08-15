import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

export const moveTask = function (
  oldCardTitle,
  newCardTitle,
  taskTitle,
  taskToBefore,
  y
) {
  const data = getData();
  const oldCard = data.find((el) => el.title === oldCardTitle);
  const newCard = data.find((el) => el.title === newCardTitle);

  const tasks = data.reduce((acc, card) => {
    card.tasks.forEach((task) => acc.push(task));
    return acc;
  }, []);

  const containerToAppend = Array.from(document.querySelectorAll(".card")).find(
    (el) => el.querySelector("h3").textContent === newCardTitle
  );

  if (taskToBefore) {
    const taskToAppend = Array.from(
      containerToAppend.querySelectorAll("li")
    ).find((el) => el.textContent.replace("❌", "") === taskToBefore);

    const rect = taskToAppend.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;

    if (y < middleY) {
      taskToAppend.before(document.querySelector(".dragging"));
    } else {
      taskToAppend.after(document.querySelector(".dragging"));
    }
  } else {
    containerToAppend
      .querySelector("ul")
      .appendChild(document.querySelector(".dragging"));
  }

  if (oldCard !== newCard) {
    const taskIndex = oldCard.tasks.indexOf(
      oldCard.tasks.find((el) => el.title === taskTitle)
    );
    oldCard.tasks.splice(taskIndex, 1);
  }

  newCard.tasks = Array.from(containerToAppend.querySelectorAll("li")).map(
    (el) => {
      const obj = {
        title: el.textContent.replace("❌", ""),
      };

      const oldTask = tasks.find((el) => el.title === obj.title);
      if (oldTask && oldTask.date) {
        obj.date = oldTask.date;
      }
      return obj;
    }
  );

  saveData(data, false);
};
