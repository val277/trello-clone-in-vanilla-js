export const addDraggingClassEvents = function (task) {
  task.addEventListener("dragstart", (e) => {
    e.stopPropagation();
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", (e) => {
    e.stopPropagation();
    task.classList.remove("dragging");
  });
};
