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

// генератор меток объявлений
const generateMarker = (point) => {
  const {location: {lat,lng}} = point;
  const marker = L.marker({
    lat,
    lng,
  }, {
    icon: pinIcon,
  });
  // листенеры для удаления перед новой отрисовкой
  allInputFields.forEach((field) => field.addEventListener('change', () => marker.remove()));

  marker
    .addTo(map)
    .bindPopup(createNewCard(point) /*, {keepInView: true} */ ); // без keepInView почему-то все тоже прекрасн работает
};

// добавляю что есть на карту
const addPointsToMap = (array) => array.map((point) => generateMarker(point));

// листенер запускающий отрисовку при change на любом поле фильтра
const addOneFieldListener = (field, array) => field.addEventListener('change', () => {
  const newArr = reduceAllFilters(array);
  addPointsToMap(newArr);
});

// листенеры всех полей для отрисовки
allInputFields.forEach((field) => addOneFieldListener(field, points));

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
  addPointsToMap(points);

};

export {creteMap, points};
