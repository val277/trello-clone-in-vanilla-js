export const getNearestCard = function (x) {
  const cards = document.querySelectorAll(".card");

  return Array.from(cards).reduce((prev, next) => {
    const prevRect = prev.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();

    return Math.abs(prevRect.left + prevRect.width / 2 - x) <
      Math.abs(nextRect.left + nextRect.width / 2 - x)
      ? prev
      : next;
  });
};
