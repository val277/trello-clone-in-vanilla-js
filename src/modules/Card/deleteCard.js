import { getData, saveData } from "../utils/localStorage.js";

export const deleteCard = function (cardTitle) {
  const data = getData();
  const cardIndex = data.indexOf(data.find((el) => el.title === cardTitle));
  data.splice(cardIndex, 1);
  saveData(data);
};
