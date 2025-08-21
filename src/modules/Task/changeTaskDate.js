import { getData, saveData } from "../utils/localStorage.js";

export const changeTaskDate = function (element, cardTitle, taskIndex) {
  const data = getData();
  const task = data.find((el) => el.title === cardTitle).tasks[taskIndex];
  if (element.value !== "" && element.value !== task.date) {
    task.date = element.value;
    saveData(data);
  } else if (element.value === "" && task.date) {
    delete task.date;
    saveData(data);
  }
};
