// Функция, возвращающая случайное целое число из переданного диапазона включительно:

const getRandomInt = (min = 1, max = 10) => {
  [min, max] = [
    Math.min(Math.abs(min), Math.abs(max)),
    Math.max(Math.abs(min), Math.abs(max))
  ];
  return Math.round(Math.random() * (max - min) + min);
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min = 1, max = 10, afterPoint = 0) => {
  [min, max] = [
    Math.min(Math.abs(min), Math.abs(max)),
    Math.max(Math.abs(min), Math.abs(max))
  ];
  return +(Math.random() * (max - min) + min).toFixed(afterPoint);
};


//4.9. Больше деталей

const SIMILAR_OFFER_COUNT = 10;
const SIMILAR_AVATAR_COUNT = /*8*/ 10;
// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png,
//где {{xx}} — это число от 1 до 8 с ведущим нулём.
//Например, 01, 02 и т. д. Адреса изображений не повторяются.
//??? - не очень понял: как если объектов 10, а аватарок всего 8, аватарки должны не повторяться ???

const START_LAT = 35.65000;
const FINISH_LAT = 35.70000;
const START_LNG = 139.70000;
const FINISH_LNG = 139.80000;


const offers = new Array(SIMILAR_OFFER_COUNT).fill(null);



const authorAvatars = new Array(SIMILAR_AVATAR_COUNT).fill(null);
authorAvatars.forEach((avatar, ind, array) => {
  array[ind] = `img/avatars/user0${ind + 1}.png`;
  // avatar = `img/avatars/user0${ind + 1}.png`;  ??? а так почему-то не сработало ???
});

// все offer.offer.title
const offerTitles = new Array(SIMILAR_OFFER_COUNT).fill(null);
offerTitles.forEach((element, ind, array) => {
  array[ind] = `offer-title-${ind + 1}`;
});


const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const protoFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const protoPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// новый массив из случайных элементов massiv
const getSomeFeaturesMassiv = (massiv, repeat = false) => {
  const newMassiv = [];
  if (repeat) {
    for (let i = 0; i < repeat; i++) {
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

const createOffer = () => {
  const lat = getRandomNumber(START_LAT, FINISH_LAT, 5);
  const lng = getRandomNumber(START_LNG, FINISH_LNG, 5);
  const time = [getRandomInt(0, times.length - 1)];
  return {
    author: {
      avatar: authorAvatars[getRandomInt(0, authorAvatars.length - 1)],
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: offerTitles[getRandomInt(0, 10)],
      address: `location.${lat}, location.${lng}`,
      price: getRandomInt(1000, 100000),
      type: types[getRandomInt(0, types.length - 1)],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 1000),
      checkin: time,
      checkout: time,
      futures: getSomeFeaturesMassiv(protoFeatures),
      description: 'помещение - обычное помещение, как и все остальные, и больше ничего',
      photos: getSomeFeaturesMassiv(protoPhotos, 7),
    },
  };
};

console.log(createOffer());
