import { getData, saveData } from "./localStorage.js";
import { verifyIfCardExist } from "./verifyIfCardExist.js";
import { verifyIfTaskExist } from "./verifyIfTaskExist.js";

export const addChangeEvents = function (element) {
  const data = getData();
  element.addEventListener("dblclick", () => {
    const cardTitle =
      element.tagName === "H3"
        ? element.textContent
        : element.parentElement.parentElement.querySelector("h3").textContent;
    const dataElement = data.find((el) => el.title == cardTitle);

    const input = document.createElement("input");
    input.addEventListener("blur", () => {
      if (
        input.value !== "" &&
        input.value !== element.textContent.replace("❌", "")
      ) {
        if (element.tagName === "H3" && !verifyIfCardExist(input.value)) {
          dataElement.title = input.value;
        } else if (
          element.tagName === "LI" &&
          !verifyIfTaskExist(input.value)
        ) {
          const toReplace = dataElement.tasks.indexOf(
            dataElement.tasks.find(
              (task) => task.title === element.textContent.replace("❌", "")
            )
          );
          dataElement.tasks[toReplace].title = input.value;
        } else {
          alert("A task or a card already exst with that name");
        }
        saveData(data);
      } else {
        input.replaceWith(element);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });
    input.value = element.textContent.replace("❌", "");
    element.replaceWith(input);
    input.focus();
  });
};
