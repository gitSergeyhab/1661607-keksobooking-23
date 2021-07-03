import {MAX_PRICE, OFFER_COUNT} from './setup.js';
import { getRaitByFeatures} from './filter-option.js'; // для сортировки по features
// import {getCheckedFeatures, filterFeature} from './filter-option.js'; // для фильтрации по features

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const housingGuest = mapFilter.querySelector('#housing-guests');

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
  )
);

const filterType = filterByOneValue('type');

const filterRoom = filterByOneValue('rooms');

const filterGuest = filterByOneValue('guests');

const filterPrice = (array, value) => {
  const [min, max] = prices[value];
  return array.filter((element) => element.offer.price >= min && element.offer.price <= max);
};

// фильтр фильтров )
const getNeedPoints = (arr) => [
  [filterType, housingType.value],
  [filterPrice, housingPrice.value],
  [filterRoom, housingRoom.value],
  [filterGuest, housingGuest.value],
  // [filterFeature, getCheckedFeatures()], // фильтрация по Features
].reduce((acc, elem) => elem[0](acc, elem[1]), arr)
  .sort((first, second) => getRaitByFeatures(second) - getRaitByFeatures(first)) // сортировка по Features
  .slice(0, OFFER_COUNT);

export {getNeedPoints, mapFilter};
