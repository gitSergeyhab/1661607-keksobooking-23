import {disableFormsCondition} from './modules/change-form-condition.js';
import {validateForm, formField} from './modules/validate-form.js';
import {getData, postData} from './modules/api.js';
import {loadMap} from './modules/map.js';
import {resetByReset, onSubmitReset} from './modules/add-listeners-forms-map.js';

const URL_GET_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://23.javascript.pages.academy/keksobooking';

const map = document.querySelector('.map');
const adformSubmitBlock = document.querySelector('.ad-form__element--submit');

disableFormsCondition();

loadMap();
resetByReset();

validateForm();

getData(URL_GET_DATA, map);

formField.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postData(URL_POST_DATA, formField, adformSubmitBlock);
  // .then(() => onSubmitReset()); // долго...
  onSubmitReset(); // так быстрее
});
