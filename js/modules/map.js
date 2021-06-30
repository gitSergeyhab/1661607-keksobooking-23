/* eslint-disable no-use-before-define */

import {tokyoCoordinate, AFTER_POINT} from './data.js';
import {disableFormsCondition} from './change-form-condition.js';
import {createNewCard} from './create-new-card.js';
import {getNeedPoints, mapFilter} from './filter.js';
import {formField} from './validate-form.js';


// словарь иконок
const icons = {
  mainPin: {
    iconUrl: '../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
  pin: {
    iconUrl: '../../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
};

const address = document.querySelector('#address');

const createMap = (points) => {
  const map = L.map('map-canvas')
    .on('load', () => disableFormsCondition(false))
    .setView({
      lat: tokyoCoordinate.lat,
      lng: tokyoCoordinate.lng,
    }, 12);

  // иконки
  const mainPinIcon = L.icon(icons.mainPin);
  const pinIcon = L.icon(icons.pin);

  const createMarkerGroup = (array) => {
    const markerGroup = L.layerGroup().addTo(map);
    const generateMarker = (point) => {
      const {location: {lat,lng}} = point;
      const marker = L.marker({
        lat,
        lng,
      }, {
        icon: pinIcon,
      });
      marker
        .addTo(markerGroup)
        .bindPopup(createNewCard(point));
    };

    array.forEach((point) => generateMarker(point));

    // создать и удалить листенеры формы для markerGroup.remove() при change на фильтрах
    const onChangeFormToGroupDel = () => removeMarkerGroup();
    mapFilter.addEventListener('change', onChangeFormToGroupDel);
    function removeMarkerGroup() {
      markerGroup.remove();
      mapFilter.removeEventListener('change', onChangeFormToGroupDel);
    }
  };

  // создать листенеры формы для createMarkerGroup при change на фильтрах:
  mapFilter.addEventListener('change', () => createMarkerGroup(getNeedPoints(points)));
  // mapFilter.addEventListener('change', () => { // ОСТАВИЛ ДЛЯ ТЕСТОВ
  //   const x = reduceAllFilters(points);
  //   console.log(x);
  //   createMarkerGroup(x);
  // } );

  // const createMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // спец метка
  const mainMarker = L.marker({
    lat: tokyoCoordinate.lat,
    lng: tokyoCoordinate.lng,
  }, {
    draggable: true,
    icon: mainPinIcon,
  });
  mainMarker.addTo(map);

  // координаты в поле адреса
  const getCoordinate = (lat, lng) => `широта: ${lat.toFixed(AFTER_POINT)}  долгота: ${lng.toFixed(AFTER_POINT)}`;
  mainMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = getCoordinate(lat, lng);
  });

  // начальные координаты
  address.value = getCoordinate(tokyoCoordinate.lat, tokyoCoordinate.lng);
  createMarkerGroup(getNeedPoints(points));

  // обработчик кнопки сброса
  const btnReset = formField.querySelector('.ad-form__reset');
  btnReset.addEventListener('click', () => {
    formField.reset();
    mapFilter.reset();

    createMarkerGroup(getNeedPoints(points));

    const newLatLng = new L.LatLng(tokyoCoordinate.lat, tokyoCoordinate.lng);
    mainMarker.setLatLng(newLatLng);

    // address.value = getCoordinate(tokyoCoordinate.lat, tokyoCoordinate.lng); //??? не работает ???
    setTimeout(() => address.value = getCoordinate(tokyoCoordinate.lat, tokyoCoordinate.lng), 0); //??? работает ???
  });
};

export {createMap};
