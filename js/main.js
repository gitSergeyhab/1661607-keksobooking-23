import {disableFormsCondition} from './modules/change-form-condition.js';
import {validateForm} from './modules/validate-form.js';
import {createMap} from './modules/map.js';
import {getData, postData} from './modules/api.js';
// import {resetForms} from './modules/reset-forms.js'


const URL_GET_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://23.javascript.pages.academy/keksobooking';

const map = document.querySelector('.map');
const adformSubmitBlock = document.querySelector('.ad-form__element--submit');
const adform = document.querySelector('.ad-form');

disableFormsCondition();

validateForm();

getData(URL_GET_DATA, createMap, map);

adform.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postData(URL_POST_DATA, adform, adformSubmitBlock);
});

// resetForms();
