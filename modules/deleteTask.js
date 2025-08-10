import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

export const deleteTask = function (cardTitle, taskIndex) {
  const data = getData();
  const card = data.indexOf(data.find((el) => el.title === cardTitle));
  data[card].tasks.splice(taskIndex, 1);
  saveData(data);
};
