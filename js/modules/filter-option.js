// и в ТЗ, и в ДЗ говориться только о фильтрации, а в лайве сказано - сделать сортировку по features
// здесь оба варианта:

const FEATURES_SPLIT_ELEMENT = 'filter-';
const SCORE_FOR_MATCH = 10;
const housingFeature = document.querySelector('#housing-features');
const inputsFeature = housingFeature.querySelectorAll('input');

//Фильтрация по Features

// список features из инпутов
const getCheckedFeatures = () => {
  // возвращет имя фильтра или NaN, если тот не выбран:
  const checkOneFilter = (filter) => filter.checked ? filter.id.split(FEATURES_SPLIT_ELEMENT)[1] : NaN;
  return Array.from(inputsFeature)
    .map((filter) => checkOneFilter(filter))
    .filter((filter) => filter);
};

// проверка, что в предложении есть все нужные features
const checkAllArrayInArray = (arrayFilter, arrayData = []) => {
  // возвращает true/false - есть или нет чекнутая Feature в массиве с данными:
  const checkFilterFromFormInData = (filterForm) => arrayData.some((filterData) => filterData === filterForm);
  return arrayFilter.every((filter) => checkFilterFromFormInData(filter)); //проверяет, что есть все (каждый===true)
};

const filterFeature = (arrayData, arrayFilter) =>
  arrayData.filter((element) => checkAllArrayInArray(arrayFilter, element.offer.features));


// Сортировка по Features
// рейтинг для каждого объявления за кол-во совпадений и чуть-чуть за кол-во Features
const getRaitByFeatures = ({offer: {features = []}}) => {
  let rait = 0;

  getCheckedFeatures().forEach((filter) => {
    rait += features.reduce((acc, feature) => filter === feature ? acc + SCORE_FOR_MATCH : acc, 0);
  });

  rait += features.length;
  return rait;
};

export {getCheckedFeatures, filterFeature, getRaitByFeatures};
