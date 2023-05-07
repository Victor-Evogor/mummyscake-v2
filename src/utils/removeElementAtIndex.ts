export const removeElementAtIndex = <T>(arr: T[], index: number): T[] => {
  if (index < 0 || index >= arr.length) {
    throw new Error("Index out of range");
  }

  const newArr = [...arr];
  newArr.splice(index, 1);

  return newArr;
}
