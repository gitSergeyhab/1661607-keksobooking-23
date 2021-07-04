import {disableFormsCondition} from './modules/change-form-condition.js';
import {validateForm, formField} from './modules/validate-form.js';
import {getData, postData, onSuccessGet} from './modules/api.js';
import {loadMap} from './modules/map.js';
import {onSubmitReset, onResetReset} from './modules/add-listeners-forms-map.js';
import {mapFilter} from './modules/filter.js';
import {btnReset} from './modules/add-listeners-forms-map.js';
import {onPostSuccess, onPostError, onGetError} from './modules/message.js';
import {showPromoAvatar, showPromoImages, clearImagesFields} from './modules/show-promo.js';
import {debounce} from './utils/debounce.js';


disableFormsCondition();

loadMap();

validateForm();

getData(onSuccessGet, onGetError); //отрисовка при загрузке

// обработчики на фильтры, кнопку сброса, кнопку отправки:
mapFilter.addEventListener('change', debounce(() => getData(onSuccessGet, onGetError)));

btnReset.addEventListener('click', debounce((evt) => {
  evt.preventDefault(); // чтоб не сбрасывалась строка адреса
  onResetReset();
  getData(onSuccessGet, onGetError)
    .finally(clearImagesFields);
}));

formField.addEventListener('submit', (evt) =>  {
  evt.preventDefault();
  postData(formField, onPostSuccess, onPostError, onSubmitReset, clearImagesFields)
    .finally(() => getData(onSuccessGet, onGetError)); // точки рисую в любом случае
});

showPromoAvatar();
showPromoImages();
