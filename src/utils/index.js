// Changes the size of the array based in the params passed to the function
const arraySize = (size, array) => {
  const arrayTemp = [];

  for (let i = 0; i < size; i++) {
    if (array[i])
      arrayTemp.push(array[i]);
  }

  return arrayTemp;
};

// Generates a random number based in array size
const arrayRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

module.exports = {
  arraySize,
  arrayRandomIndex,
};
