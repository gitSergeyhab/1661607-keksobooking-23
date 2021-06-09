import {getRandomInt, getRandomNumber} from './modules/util.js';

const SIMILAR_OFFER_COUNT = 10;
const START_LAT = 35.65000;
const FINISH_LAT = 35.70000;
const START_LNG = 139.70000;
const FINISH_LNG = 139.80000;
const AFTER_POINT = 5;
const PHOTO_COUNT = 7;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 1000;

const getAvatar = (index) => `img/avatars/user0${index + 1}.png`;
const getTitle = (index) => `offer-title-${index + 1}`;
const getDescription = (index) => `чрезвычайно обычное помещение № ${index + 1}`;

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const protoFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const protoPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// новый массив из случайных элементов massiv
const getSomeFeaturesMassiv = (massiv, repeat = false) => {
  const newMassiv = [];
  if (repeat) {
    for (let ind = 0; ind < repeat; ind++) {
      newMassiv.push(massiv[getRandomInt(0, massiv.length - 1)]);
    }
  } else {
    massiv.forEach(() => {
      const newElement = massiv[getRandomInt(0, massiv.length - 1)];
      if (newMassiv.indexOf(newElement) === -1) {
        newMassiv.push(newElement);
      }
    });
  }
  return newMassiv;
};

const createOffer = (index) => {
  const lat = getRandomNumber(START_LAT, FINISH_LAT, AFTER_POINT);
  const lng = getRandomNumber(START_LNG, FINISH_LNG, AFTER_POINT);
  const time = times[getRandomInt(0, times.length - 1)];
  return {
    author: {
      avatar: getAvatar(index),
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: getTitle(index),
      address: `${lat}, ${lng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: types[getRandomInt(0, types.length - 1)],
      rooms: getRandomInt(1, MAX_ROOMS),
      guests: getRandomInt(1, MAX_GUESTS),
      checkin: time,
      checkout: time,
      futures: getSomeFeaturesMassiv(protoFeatures),
      description: getDescription(index),
      photos: getSomeFeaturesMassiv(protoPhotos, PHOTO_COUNT),
    },
  };
};

const offers = new Array(SIMILAR_OFFER_COUNT).fill(null).map((offer, index) => createOffer(index));
offers;
console.log(offers);
