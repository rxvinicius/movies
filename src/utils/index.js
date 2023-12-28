// Changes the size of the array based in the params passed to the function
export const arraySize = (size, array) => {
  const arrayTemp = [];

  for (let i = 0; i < size; i++) {
    if (array[i]) arrayTemp.push(array[i]);
  }

  return arrayTemp;
};

// Generates a random number based in array size
export const arrayRandomIndex = array => {
  return Math.floor(Math.random() * array.length);
};

export const getVoteAverage = movie => {
  const { vote_average } = movie;
  const vote = vote_average || '0';
  return `${parseInt(vote)}/10`;
};

export const removeDuplicates = (originalArray, newArray, uniqueKey = 'id') => {
  const uniqueKeyMapOriginal = new Map();
  const uniqueKeyMapNew = new Map();

  originalArray.forEach(obj => {
    const key = obj[uniqueKey];
    uniqueKeyMapOriginal.set(key, obj);
  });

  newArray.forEach(obj => {
    const key = obj[uniqueKey];
    if (!uniqueKeyMapOriginal.has(key)) {
      uniqueKeyMapNew.set(key, obj);
    }
  });

  return Array.from(uniqueKeyMapNew.values());
};

export default {
  arraySize,
  arrayRandomIndex,
  getVoteAverage,
  removeDuplicates,
};
