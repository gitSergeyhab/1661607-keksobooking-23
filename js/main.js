// Функция, возвращающая случайное целое число из переданного диапазона включительно:

const getRandomInt = (min = 1, max = 10) => {
  if (max < min) {
    [max, min] = [min, max];
  }

  if (max < 0) { // блок можно удалить
    return 0;
  }

  if (max === min) {
    return min;
  }

  min = min < 0 ? 0 : min; // блок можно удалить

  return Math.round(Math.random() * (max - min) + min);
};


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// можно заменнить ей и getRandomInt

const getRandomNumber = (min = 1, max = 10, afterPoint = 0) => {
  if (max < min) {
    [max, min] = [min, max];
  }

  if (max < 0) { // блок можно удалить
    return 0;
  }

  if (max === min) {
    return min;
  }

  min = min < 0 ? 0 : min; // блок можно удалить

  return +(Math.random() * (max - min) + min).toFixed(afterPoint);
};


getRandomInt(1, 2);
getRandomNumber(1, 2, 3);

// ну или так:

const getRandomNumber2 = (min = 1, max = 10, afterPoint = 0) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return +(Math.random() * (max - min) + min).toFixed(afterPoint);
};

getRandomNumber2(1.1, 4.321, 3);
