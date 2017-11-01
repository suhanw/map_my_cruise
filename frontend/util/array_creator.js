export const arrayCreator = (object) => {
  let arr = [];
  for (let key in object) {
    arr.push(key);
  }
  return arr;
};
