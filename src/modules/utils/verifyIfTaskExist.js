export const verifyIfTaskExist = (taskTitle) => {
  const tasks = Array.from(document.querySelectorAll("li")).map((task) =>
    task.textContent.replace("❌", "")
  );
  return tasks.find((task) => task === taskTitle) ? true : false;
};
