import {disableForms} from './modules/form-condition.js';
import {validateForm, formField, submitBtn} from './modules/validate-form.js';
import {getData, postData} from './modules/api.js';
import {loadMap, createMarkerGroup} from './modules/map.js';
import {resetFormsAndMap} from './modules/listener-forms-map.js';
import {mapFilter, getNeedPoints} from './modules/filter.js';
import {btnReset} from './modules/listener-forms-map.js';
import {showPostSuccess, showPostError, showGetError} from './modules/message.js';
import {showPromoAvatar, showPromoImages, clearImagesFields} from './modules/promo.js';
import {debounce} from './modules/util.js';
import {changeBtnCondiion} from './modules/util.js';


const loadMarkers = (response) => createMarkerGroup(getNeedPoints(response));

disableForms();

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
  postData(formField, showPostSuccess, showPostError, resetFormsAndMap, clearImagesFields)
    .finally(() => {
      getData(loadMarkers, showGetError); // в любом случае рисую точки...
      changeBtnCondiion(submitBtn, true); // ...и убираю disabled с кнопки
    });
});

showPromoAvatar();
showPromoImages();
