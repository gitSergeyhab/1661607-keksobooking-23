// import {getRandomInt, getRandomNumber} from './util.js';
// import {START_LAT, FINISH_LAT, START_LNG, FINISH_LNG, AFTER_POINT, PHOTO_COUNT, MIN_PRICE, MAX_PRICE, MAX_ROOMS, MAX_GUESTS, types, times, protoFeatures, protoPhotos} from './data.js';

// const getMockData = (offerCount) => {
//   // если эти функции будут использоваться где-то еще, вынесу в отдельный модуль, а пока так:
//   const getAvatar = (index) => {
//     if (index > 8) {
//       return `img/avatars/user${index + 1}.png`;
//     }
//     return `img/avatars/user0${index + 1}.png`;
//   };
//   const getTitle = (index) => `offer-title-${index + 1}`;
//   const getDescription = (index) => `чрезвычайно обычное помещение № ${index + 1}`;
//   const getArrayFromArray = (arr, repeat = false) => {
//     const newArr = [];
//     if (repeat) {
//       for (let ind = 0; ind < repeat; ind++) {
//         newArr.push(arr[getRandomInt(0, arr.length - 1)]);
//       }
//     } else {
//       arr.forEach(() => {
//         const newElement = arr[getRandomInt(0, arr.length - 1)];
//         if (newArr.indexOf(newElement) === -1) {
//           newArr.push(newElement);
//         }
//       });
//     }
//     return newArr;
//   };

//   const createOffer = (index) => {
//     const lat = getRandomNumber(START_LAT, FINISH_LAT, AFTER_POINT);
//     const lng = getRandomNumber(START_LNG, FINISH_LNG, AFTER_POINT);
//     const time = times[getRandomInt(0, times.length - 1)];
//     return {
//       author: {
//         avatar: getAvatar(index),
//       },
//       location: {
//         lat: lat,
//         lng: lng,
//       },
//       offer: {
//         title: getTitle(index),
//         address: `${lat}, ${lng}`,
//         price: getRandomInt(MIN_PRICE, MAX_PRICE),
//         type: types[getRandomInt(0, types.length - 1)],
//         rooms: getRandomInt(1, MAX_ROOMS),
//         guests: getRandomInt(0, MAX_GUESTS),
//         checkin: time,
//         checkout: time,
//         features: getArrayFromArray(protoFeatures),
//         description: getDescription(index),
//         photos: getArrayFromArray(protoPhotos, PHOTO_COUNT),
//       },
//     };
//   };

//   return new Array(offerCount).fill(null).map((offer, index) => createOffer(index));
// };

// export {getMockData};
