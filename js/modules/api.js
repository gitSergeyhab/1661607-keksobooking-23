import {createMarkerGroup} from './map.js';
import {getNeedPoints} from './filter.js';

const URL_GET_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://23.javascript.pages.academy/keksobooking';

const onSuccessGet = (response) => createMarkerGroup(getNeedPoints(response));

const getData = (onSuccess, onError) => (
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then(onSuccess)
    .catch(onError)
);

const postData = (form, onSuccess, onError, onReset) => {
  const formData = new FormData(form);

  return fetch(URL_POST_DATA, {
    method: 'post',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // ??? а что с ответом-то делать ???
      } else {
        throw new Error('completely useless magic string)');
      }
    })
    .then(onSuccess)
    .then(onReset)
    .catch(onError);
};

export {getData, postData, onSuccessGet};
