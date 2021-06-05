// Функция, возвращающая случайное целое число из переданного диапазона включительно:

const getRandomInt = (min = 1, max = 10) => {
  [min, max] = [
    Math.min(Math.abs(min), Math.abs(max)),
    Math.max(Math.abs(min), Math.abs(max))];
  return Math.round(Math.random() * (max - min) + min);
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
getRandomInt(1, 2);


const getRandomNumber = (min = 1, max = 10, afterPoint = 0) => {
  [min, max] = [
    Math.min(Math.abs(min), Math.abs(max)),
    Math.max(Math.abs(min), Math.abs(max))];
  return +(Math.random() * (max - min) + min).toFixed(afterPoint);
};

console.log(getRandomInt(1, 5));
console.log(getRandomNumber(1.1, 4.321, 5));
