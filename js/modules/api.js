import {createMarkerGroup} from './map.js';
import {getNeedPoints} from './filter.js';

const urls = {
  get: 'https://23.javascript.pages.academy/keksobooking/data',
  post: 'https://23.javascript.pages.academy/keksobooking',
};

const onSuccessGet = (response) => createMarkerGroup(getNeedPoints(response));

const getData = (onSuccess, onError) => (
  fetch(urls.get)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then(onSuccess)
    .catch(onError)
);

const postData = (form, onSuccess, onError, onReset, clearImg) => (
  fetch(urls.post, {
    method: 'post',
    body: new FormData(form),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(onSuccess)
    .then(clearImg)
    .then(onReset)
    .catch(onError)
);

export {getData, postData, onSuccessGet};
