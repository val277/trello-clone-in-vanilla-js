import { getData, saveData } from "../utils/localStorage.js";
import { verifyIfTaskExist } from "../utils/verifyIfTaskExist.js";

export const addTask = function (cardTitle) {
  const data = getData();
  const card = data.find((el) => el.title === cardTitle);

  const input = document.createElement("input");
  input.addEventListener("blur", () => {
    if (input.value !== "" && !verifyIfTaskExist(input.value)) {
      card.tasks.push({ title: input.value });
      saveData(data);
    } else if (verifyIfTaskExist(input.value)) {
      alert("A task with that name already exist!");
      input.remove();
    } else {
      input.remove();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });

  const cardToAppend = Array.from(document.querySelectorAll(".card")).find(
    (card) => card.querySelector("h3").textContent === cardTitle
  );

  cardToAppend.querySelector(".addTaskBtn").before(input);
  input.focus();
};
