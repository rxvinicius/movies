// Changes the size of the array based in the params passed to the function
const arraySize = (size, array) => {
  const arrayTemp = [];

  for (let i = 0; i < size; i++) {
    if (array[i]) arrayTemp.push(array[i]);
  }

  return arrayTemp;
};

// Generates a random number based in array size
const arrayRandomIndex = array => {
  return Math.floor(Math.random() * array.length);
};

const getVoteAverage = movie => {
  const { vote_average } = movie;
  const vote = vote_average || '0';
  return `${parseInt(vote)}/10`;
};

module.exports = {
  arraySize,
  arrayRandomIndex,
  getVoteAverage,
};
