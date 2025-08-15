import { getData, saveData } from "../utils/localStorage.js";
import { verifyIfCardExist } from "../utils/verifyIfCardExist.js";

export const addCard = function () {
  const data = getData();
  const title = prompt("Enter a card name");
  if (title !== "" && !verifyIfCardExist(title)) {
    data.push({ title: title, tasks: [] });
    saveData(data);
  } else {
    alert(
      "You didn't enter a card name or one with the same name already exist"
    );
  }
};
