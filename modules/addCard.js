import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

export const addCard = function () {
  const data = getData();
  const title = prompt("Enter a card name");
  if (title !== "") {
    data.push({ title: title, tasks: [] });
    saveData(data);
  } else {
    alert("You didn't enter a card name");
  }
};
