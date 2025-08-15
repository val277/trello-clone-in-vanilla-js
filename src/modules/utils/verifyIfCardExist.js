export const verifyIfCardExist = (cardTitle) => {
  const cards = Array.from(document.querySelectorAll(".card h3")).map(
    (card) => card.textContent
  );
  return cards.find((card) => card === cardTitle) ? true : false;
};
