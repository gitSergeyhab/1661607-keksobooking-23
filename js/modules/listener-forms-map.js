/* eslint-disable no-use-before-define */
import {mapFilter} from './filter.js';
import {formField} from './validate-form.js';
import {getCoordinate, map, mainMarker, address} from './map.js';
import {tokyoCoordinate} from './setup.js';
import {debounce} from './util.js';


const btnReset = formField.querySelector('.ad-form__reset');

// создать и удалить листенеры для markerGroup.remove() при change/submit/click на фильтрах и кнопках
const removeMarkersByFilter = (markerGroup) => {
  const onPostSubmit = () => removeMarkerGroup();
  const onResetClick = () => removeMarkerGroup();
  const onFiltersChange = () => removeMarkerGroup();

  mapFilter.addEventListener('change', debounce(onFiltersChange));
  formField.addEventListener('submit', debounce(onPostSubmit));
  btnReset.addEventListener('click', debounce(onResetClick));

  function removeMarkerGroup() {
    markerGroup.remove();

    mapFilter.removeEventListener('change', onFiltersChange);
    formField.removeEventListener('submit', onPostSubmit);
    btnReset.removeEventListener('click', onResetClick);
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

export {removeMarkersByFilter, resetFormsAndMap, btnReset};
