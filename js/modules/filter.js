import {MAX_PRICE} from './data.js';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const housingGuest = mapFilter.querySelector('#housing-guests');
// const housingFeature = mapFilter.querySelector('#housing-features');

const prices = {
  'any': [0, MAX_PRICE],
  'middle': [10000, 50000],
  'low': [0, 10000],
  'high': [50000, MAX_PRICE],
};

// ф-ция возвращающая ф-цию для каждого фильтра по key
const filterByOneValue = (key) => (
  (array, value) => (
    value === 'any' ?
      array :
      array.filter((element) => element.offer[key] == value)
      /* зедесь нужно именно НЕстрогое сравнение, можно заменить на условие
      element.offer[key] === value || element.offer[key] === +value ,
      но будет выглядеть странно  */
  )
);

const filterType = filterByOneValue('type');

const filterRoom = filterByOneValue('rooms');

const filterGuest = filterByOneValue('guests');

const filterPrice = (array, value) => {
  const [min, max] = prices[value];
  return array.filter((element) => element.offer.price >= min && element.offer.price <= max);
};

const reduceAllFilters = (arr) => [
  [filterType, housingType.value],
  [filterPrice, housingPrice.value],
  [filterRoom, housingRoom.value],
  [filterGuest, housingGuest.value],
].reduce((acc, elem) => elem[0](acc, elem[1]), arr);

export {reduceAllFilters, housingType, housingPrice, housingRoom, housingGuest};
