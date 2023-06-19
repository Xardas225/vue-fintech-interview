export const getId = (arrId) => {
  const id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
  if (arrId.includes(id)) getId(arrId)
  return id;
};
