export const getData = () => JSON.parse(localStorage.getItem("cards")) ?? [];
