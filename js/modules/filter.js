import {MAX_PRICE} from './data.js';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const housingGuest = mapFilter.querySelector('#housing-guests');
const housingFeature = mapFilter.querySelector('#housing-features');

const prices = {
  'any': [0, MAX_PRICE],
  'middle': [10000, 50000],
  'low': [0, 10000],
  'high': [50000, MAX_PRICE],
};

// ф-ция возвращающая ф-цию для каждого фильтра по простому key
const filterByOneValue = (key) => (
  (array, value) => (
    value === 'any' ?
      array :
      array.filter((element) => element.offer[key] === value || element.offer[key] === +value)
      // я бы поменял на просто element.offer[key] == value
  )
);

const filterType = filterByOneValue('type');

const filterRoom = filterByOneValue('rooms');

const filterGuest = filterByOneValue('guests');

const filterPrice = (array, value) => {
  const [min, max] = prices[value];
  return array.filter((element) => element.offer.price >= min && element.offer.price <= max);
};

const inputsFeature = housingFeature.querySelectorAll('input');

// список futures из инпутов
const getCheckedFututes = () => {
  const checkedInputs = [];
  inputsFeature.forEach((input) => {
    if (input.checked) {
      checkedInputs.push(input.id.slice(7));
    }
  });
  return checkedInputs;
  // можно, конечно и так, но сам с трудом понимаю, что написал:
  // return Array.from(inputsFeature)
  //   .map((input) => input.checked ? input.id.slice(7) : NaN)
  //   .filter((item) => item);
};

// проверка, что в предложении есть все нужные futures
const allArrayInArray = (arrayFromFilter, arrayFromData) => {
  let res = true;
  arrayFromFilter.forEach((elem1) => {
    if (arrayFromData.indexOf(elem1) === -1) {
      res = false;
    }
  });
  return res;
};

const filterFuture = (array, values) => {
  const newArray = [];
  array.forEach((element) => {
    const futures = element.offer.futures;
    if (allArrayInArray(values, futures)) {
      newArray.push(element);
    }
  });
  return newArray;
};

// фильтр фильтров )
const reduceAllFilters = (arr) => [
  [filterType, housingType.value],
  [filterPrice, housingPrice.value],
  [filterRoom, housingRoom.value],
  [filterGuest, housingGuest.value],
  [filterFuture, getCheckedFututes()],
].reduce((acc, elem) => elem[0](acc, elem[1]), arr);


export {reduceAllFilters, housingType, housingPrice, housingRoom, housingGuest, housingFeature};
