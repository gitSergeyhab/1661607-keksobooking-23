import {MAX_PRICE, OFFER_COUNT} from './data.js';


const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const housingGuest = mapFilter.querySelector('#housing-guests');
const housingFeature = mapFilter.querySelector('#housing-features');

const FEATURES_SPLIT_ELEMENT = 'filter-';

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

const inputsFeature = housingFeature.querySelectorAll('input');

// список features из инпутов
const getCheckedFeatures = () => {
  // возвращет имя фильтра или NaN, если тот не выбран:
  const checkOneFilter = (filter) => filter.checked ? filter.id.split(FEATURES_SPLIT_ELEMENT)[1] : NaN;
  return Array.from(inputsFeature)
    .map((filter) => checkOneFilter(filter))
    .filter((filter) => filter);
};

// проверка, что в предложении есть все нужные features
const allArrayInArray = (arrayFilter, arrayData = []) => {
  // возвращает true/false - есть или нет чекнутая Feature в массиве с данными:
  const checkFilterFromFormInData = (filterForm) => arrayData.some((filterData) => filterData === filterForm);
  return arrayFilter.every((filter) => checkFilterFromFormInData(filter)); //проверяет, что есть все (каждый===true)
};

const filterFeature = (arrayData, arrayFilter) =>
  arrayData.filter((element) => allArrayInArray(arrayFilter, element.offer.features));


// фильтр фильтров )
const reduceAllFilters = (arr) => [
  [filterType, housingType.value],
  [filterPrice, housingPrice.value],
  [filterRoom, housingRoom.value],
  [filterGuest, housingGuest.value],
  [filterFeature, getCheckedFeatures()],
].reduce((acc, elem) => elem[0](acc, elem[1]), arr);

const getNeedPoints = (arr) => {
  const reduceArr = reduceAllFilters(arr);
  // console.log(reduceArr)
  return reduceArr.length > OFFER_COUNT ? reduceArr.slice(0, OFFER_COUNT) : reduceArr;
};

export {getNeedPoints, mapFilter};
