/* eslint-disable no-use-before-define */
import {mapFilter} from './filter.js';
import {formField} from './validate-form.js';
import {getCoordinate, map, mainMarker, address} from './map.js';
import {tokyoCoordinate} from './data.js';

const btnReset = formField.querySelector('.ad-form__reset');

// создать и удалить листенеры формы для markerGroup.remove() при change... на фильтрах
const removeMarkersByFilter = (markerGroup) => {
  const onSubmitToGroupDel = () => removeMarkerGroup();
  const onResetToGroupDel = () => removeMarkerGroup();
  const onChangeFormToGroupDel = () => removeMarkerGroup();

  mapFilter.addEventListener('change', onChangeFormToGroupDel);
  formField.addEventListener('submit', onSubmitToGroupDel);
  btnReset.addEventListener('click', onResetToGroupDel);

  function removeMarkerGroup() {
    markerGroup.remove();

    mapFilter.removeEventListener('change', onChangeFormToGroupDel);
    formField.removeEventListener('submit', onSubmitToGroupDel);
    btnReset.removeEventListener('click', onResetToGroupDel);
  }
};

// очищает поля и сбрасывает карту
const resetFormsAndMap = () => {
  formField.reset();
  mapFilter.reset();

  const newLatLng = new L.LatLng(tokyoCoordinate.lat, tokyoCoordinate.lng);
  map.panTo(newLatLng);
  mainMarker.setLatLng(newLatLng);

  address.value = getCoordinate(tokyoCoordinate.lat, tokyoCoordinate.lng);
};

const onResetReset = () => resetFormsAndMap();
const onSubmitReset = () => resetFormsAndMap();

// обработчик кнопки сброса
const resetByReset = () => btnReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  onResetReset();
});


export {removeMarkersByFilter, resetByReset, onSubmitReset, btnReset};
