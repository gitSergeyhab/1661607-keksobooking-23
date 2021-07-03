/* eslint-disable no-use-before-define */
import {mapFilter} from './filter.js';
import {formField} from './validate-form.js';
import {getCoordinate, map, mainMarker, address} from './map.js';
import {tokyoCoordinate} from './setup.js';
import {debounce} from '../utils/debounce.js';


const btnReset = formField.querySelector('.ad-form__reset');

// создать и удалить листенеры формы для markerGroup.remove() при change... на фильтрах
const removeMarkersByFilter = (markerGroup) => {
  const onSubmitToGroupDel = () => removeMarkerGroup();
  const onResetToGroupDel = () => removeMarkerGroup();
  const onChangeFormToGroupDel = () => removeMarkerGroup();

  mapFilter.addEventListener('change', debounce(onChangeFormToGroupDel));
  formField.addEventListener('submit', debounce(onSubmitToGroupDel));
  btnReset.addEventListener('click', debounce(onResetToGroupDel));

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
  /*
  судя по ТЗ, поле address не должно очищаться:
  2.5. При успешной отправке формы или её очистке (нажатие на кнопку .ad-form__reset) страница, не перезагружаясь, переходит в состояние, когда:
  ...
  - значение поля адреса корректируется соответственно исходному положению метки.

  4.1. Приблизительный адрес квартиры указывается перемещением специальной метки по карте Токио. Содержимое поля адреса должно всегда соответствовать координатам метки.
  4.2. Поле адреса должно быть заполнено всегда, в том числе сразу после активации страницы. По умолчанию используются координаты центра Токио.
  */
};

const onResetReset = () => resetFormsAndMap();
const onSubmitReset = () => resetFormsAndMap();

export {removeMarkersByFilter, onSubmitReset, onResetReset, btnReset};
