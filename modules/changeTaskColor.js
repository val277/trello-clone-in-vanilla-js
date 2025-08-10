import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

export const changeTaskColor = function (element, cardTitle) {
  const data = getData();
  const card = data.find((el) => el.title === cardTitle);
  card.color = element.value;
  saveData(data);
};
