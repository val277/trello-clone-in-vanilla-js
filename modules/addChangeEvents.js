import { getData } from "./localStorage/loadLocalStorage.js";
import { saveData } from "./localStorage/updateLocalStorage.js";

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
        if (element.tagName === "H3") {
          dataElement.title = input.value;
        } else {
          const toReplace = dataElement.tasks.indexOf(
            dataElement.tasks.find(
              (task) => task === element.textContent.replace("❌", "")
            )
          );
          dataElement.tasks[toReplace] = input.value;
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
