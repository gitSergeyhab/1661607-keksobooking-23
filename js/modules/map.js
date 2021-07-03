/* eslint-disable no-use-before-define */

import {tokyoCoordinate, AFTER_POINT} from './setup.js';
import {disableFormsCondition} from './change-form-condition.js';
import {createNewCard} from './create-new-card.js';
import {removeMarkersByFilter} from './add-listeners-forms-map.js';
import {getRaitByFeatures} from './filter-option.js';

const openStreetMapTile = {
  png: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

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

// координаты в поле адреса
const getCoordinate = (lat, lng) => `широта: ${lat.toFixed(AFTER_POINT)}  долгота: ${lng.toFixed(AFTER_POINT)}`;

// иконки
const mainPinIcon = L.icon(icons.mainPin);
const pinIcon = L.icon(icons.pin);

const map = L.map('map-canvas');

// спец метка
const mainMarker = L.marker({
  lat: tokyoCoordinate.lat,
  lng: tokyoCoordinate.lng,
}, {
  draggable: true,
  icon: mainPinIcon,
});

// загрузка карты и спецмпркера (оба уже созданы)
const loadMap = () => {
  map.on('load', () => disableFormsCondition(false))
    .setView({
      lat: tokyoCoordinate.lat,
      lng: tokyoCoordinate.lng,
    }, 12);

  L.tileLayer(
    openStreetMapTile.png, {
      attribution: openStreetMapTile.attribution,
    },
  ).addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = getCoordinate(lat, lng);
  });

  address.value = getCoordinate(tokyoCoordinate.lat, tokyoCoordinate.lng); // начальные координаты
};

// создание (группы) точек объявлений и добавление на карту
const createMarkerGroup = (points) => {
  const markerGroup = L.layerGroup().addTo(map);
  const generateMarker = (point) => {
    getRaitByFeatures(point);
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

  // создаем все маркеры из респонса
  points.forEach((point) => generateMarker(point));

  // // создать и удалить листенеры формы для markerGroup.remove() при change на фильтрах
  removeMarkersByFilter(markerGroup);
};


export {loadMap, createMarkerGroup, getCoordinate, map, mainMarker, address};
