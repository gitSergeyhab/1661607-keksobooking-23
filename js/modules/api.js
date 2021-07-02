import {addPostSuccessMessage, addMessage} from './message.js';
import {createMarkerGroup} from './map.js';
import {getNeedPoints} from './filter.js';


const GET_ERROR_MESSAGE = 'Данные не загрузились, попробуте позже.';
const COLOR_ERROR = 'red';
const TIME_MESSAGE_REMOVE = 2500;

const getData = (url, MessageElement) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then((response) => createMarkerGroup(getNeedPoints(response)))
    .catch(() => addMessage(COLOR_ERROR, MessageElement, GET_ERROR_MESSAGE, TIME_MESSAGE_REMOVE));
};

const postData = (url, form) => {

  const formData = new FormData(form);

  return fetch(url, {
    method: 'post',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        addPostSuccessMessage();
        // console.log(response);
        return response.json(); // ??? а что с ответом-то делать ???
      } else {
        throw new Error('completely useless magic string)');
      }
    });
};

export {getData, postData};
