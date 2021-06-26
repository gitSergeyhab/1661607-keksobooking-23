// import '../../leaflet/leaflet.js.map';
// import '../../leaflet/leaflet.js';
// ??? так и не понял, как подключить их из файла, пока добавил отдельным скриптом... ???

import {TOKYO_COORDINATE} from './data.js';
import {changeFormCondition} from './change-form-condition.js';
import {getMockData} from './get-mock-data.js';
import {OFFER_COUNT} from './data.js';
import {createNewCard} from './create-new-card.js';
import {reduceAllFilters, allInputFields} from './filter.js';

const points = getMockData(OFFER_COUNT);

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    changeFormCondition('.ad-form', 'ad-form--disabled', false);
    changeFormCondition('.map__filters', 'ad-form--disabled', false);
  })
  .setView({
    lat: TOKYO_COORDINATE.LAT,
    lng: TOKYO_COORDINATE.LNG,
  }, 12);

// иконки
const mainPinIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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

  allInputFields.forEach((field) => field.addEventListener('change', () => {
    markerGroup.remove();
  }));
};

// колбэк, чтоб можно было потом удалить
function onChangeFilter() {
  const newArr = reduceAllFilters(points);
  createMarkerGroup(newArr);
}

// листенеры всех полей для отрисовки
allInputFields.forEach((field)=> field.addEventListener('change', onChangeFilter));

const creteMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // спец метка
  const mainMarker = L.marker({
    lat: TOKYO_COORDINATE.LAT,
    lng: TOKYO_COORDINATE.LNG,
  }, {
    draggable: true,
    icon: mainPinIcon,
  });
  mainMarker.addTo(map);

  // координаты в поле адреса
  const getCoordinate = (lat, lng) => `широта: ${lat.toFixed(4)}  долгота: ${lng.toFixed(4)}`;
  mainMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = getCoordinate(lat, lng);
  });

  // начальные координаты
  address.value = getCoordinate(TOKYO_COORDINATE.LAT, TOKYO_COORDINATE.LNG);
  // загрузка всех точек на карте
  createMarkerGroup(points);
};

export {creteMap, points};
