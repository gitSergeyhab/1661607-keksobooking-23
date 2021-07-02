import {disableFormsCondition} from './modules/change-form-condition.js';
import {validateForm, formField} from './modules/validate-form.js';
import {getData, postData} from './modules/api.js';
import {loadMap} from './modules/map.js';
import {onSubmitReset, onResetReset} from './modules/add-listeners-forms-map.js';

import {mapFilter} from './modules/filter.js';
import {btnReset} from './modules/add-listeners-forms-map.js';

import {addPostErrorMessage} from './modules/message.js';


const URL_GET_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://23.javascript.pages.academy/keksobooking';

const mapBlock = document.querySelector('.map');

disableFormsCondition();

loadMap();

validateForm();

getData(URL_GET_DATA, mapBlock);

mapFilter.addEventListener('change', () => getData(URL_GET_DATA, mapBlock));

btnReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  getData(URL_GET_DATA, mapBlock);
  onResetReset();
});

formField.addEventListener('submit', (evt) =>  {
  evt.preventDefault();
  postData(URL_POST_DATA, formField)
    .then(onSubmitReset)
    .catch(() => addPostErrorMessage())
    .finally(() => getData(URL_GET_DATA, mapBlock)); // точки рисую в любом случае
});
