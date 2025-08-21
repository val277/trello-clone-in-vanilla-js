export const getNearestTask = function (card, y) {
  const tasks = card.querySelectorAll("li");

  return tasks.length > 0
    ? Array.from(tasks).reduce((acc, el) => {
        return Math.abs(
          el.getBoundingClientRect().y +
            el.getBoundingClientRect().height / 2 -
            y
        ) <
          Math.abs(
            acc.getBoundingClientRect().y +
              acc.getBoundingClientRect().height / 2 -
              y
          )
          ? el
          : acc;
      })
    : undefined;
};
