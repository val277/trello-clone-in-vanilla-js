import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

export const changeTaskDate = function (element, cardTitle, taskIndex) {
  const data = getData();
  const task = data.find((el) => el.title === cardTitle).tasks[taskIndex];
  console.log(task);
  if (element.value !== "" || element.value !== task.date) {
    task.date = element.value;
    saveData(data);
  }
};
