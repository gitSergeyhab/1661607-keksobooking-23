import {addPostErrorMessage} from './add-post-error-message.js';

const GET_ERROR_MESSAGE = 'Данные не загрузились, попробуте позже.';
const GET_SUCCESS_MESSAGE = 'Данные успешно отправдены.';
const COLOR_ERROR = 'red';
const COLOR_SUCCESS = 'green';

const TIME_MESSAGE_REMOVE = 2500;

const addMessage = (color, element, text) => {
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = `<span style="color: ${color}; text-transform: uppercase">${text}</span>`;
  element.before(errorMessage);
  setTimeout(() => errorMessage.remove(), TIME_MESSAGE_REMOVE);
};

const getData = (url, cbCreateMap, MessageElement) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then((response) => cbCreateMap(response))
    .catch(() => addMessage(COLOR_ERROR, MessageElement, GET_ERROR_MESSAGE));
};

const postData = (url, form, MessageElement) => {

  const formData = new FormData();

  fetch(url, {
    method: 'post',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        addMessage(COLOR_SUCCESS, MessageElement, GET_SUCCESS_MESSAGE);
        form.reset();
      } else {
        addPostErrorMessage();
      }
    })
    .catch(() => addPostErrorMessage());
};

export {getData, postData};
