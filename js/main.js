import {disableFormsCondition} from './modules/change-form-condition.js';
import {validateForm, formField, submitBtn} from './modules/validate-form.js';
import {getData, postData, loadMarkers} from './modules/api.js';
import {loadMap} from './modules/map.js';
import {resetFormsAndMap} from './modules/add-listeners-forms-map.js';
import {mapFilter} from './modules/filter.js';
import {btnReset} from './modules/add-listeners-forms-map.js';
import {showPostSuccess, showPostError, showGetError} from './modules/message.js';
import {showPromoAvatar, showPromoImages, clearImagesFields} from './modules/show-promo.js';
import {debounce} from './utils/debounce.js';
import {changeBtnCondiion} from './modules/util.js';


disableFormsCondition();

loadMap();

validateForm();

getData(loadMarkers, showGetError); //отрисовка при загрузке

// обработчики на фильтры, кнопку сброса, кнопку отправки:
mapFilter.addEventListener('change', debounce(() => getData(loadMarkers, showGetError)));

btnReset.addEventListener('click', debounce((evt) => {
  evt.preventDefault(); // чтоб не сбрасывалась строка адреса
  resetFormsAndMap();
  getData(loadMarkers, showGetError)
    .finally(clearImagesFields);
}));

formField.addEventListener('submit', (evt) =>  {
  evt.preventDefault();
  // postData(formField, onPostSuccess, onPostError, onSubmitReset, clearImagesFields)
  postData(formField, showPostSuccess, showPostError, resetFormsAndMap, clearImagesFields)

    .finally(() => {
      getData(loadMarkers, showGetError); // в любом случае рисую точки...
      changeBtnCondiion(submitBtn, true); // ...и убираю disabled с кнопки
    });
});

showPromoAvatar();
showPromoImages();
