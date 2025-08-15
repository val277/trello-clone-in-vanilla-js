import { getData, saveData } from "../utils/localStorage.js";

export const changeTaskColor = function (element, cardTitle) {
  const data = getData();
  const card = data.find((el) => el.title === cardTitle);
  card.color = element.value;
  saveData(data);
};
