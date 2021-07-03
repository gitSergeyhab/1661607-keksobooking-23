/* eslint-disable no-use-before-define */
const ESC_KEY_CODE = 27;
const MESSAGE_POST_ERROR = 'При отправке данных произошла ошибка. Попробуйте позже.';
const MESSAGE_POST_SUCCESS = 'всё ок';
const MESSAGE_GET_ERROR = 'Данные не загрузились, попробуте позже.';
const COLOR_ERROR = 'red';
const TIME_MESSAGE_REMOVE = 2500;

const errorMessageBlock = document.querySelector('#error').content.querySelector('.error');
const successMessageBlock = document.querySelector('#success').content.querySelector('.success');
const mapBlock = document.querySelector('.map');

const onPostError = () => {
  errorMessageBlock.querySelector('.error__message').textContent = MESSAGE_POST_ERROR;
  document.body.append(errorMessageBlock);

  const errorButton = errorMessageBlock.querySelector('.error__button');

  const onBtnCloseErrorModal = () => closeErrorPopup();
  const onEscCloseErrorModal = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeErrorPopup();
    }
  };

  errorButton.addEventListener('click', onBtnCloseErrorModal);
  document.addEventListener('keydown', onEscCloseErrorModal);

  function closeErrorPopup() {
    errorMessageBlock.remove();
    document.removeEventListener('keydown', onBtnCloseErrorModal);
  }
};

const onPostSuccess = () => {
  successMessageBlock.querySelector('.success__message').textContent = MESSAGE_POST_SUCCESS;
  document.body.append(successMessageBlock);

  const onBtnCloseModal = () => closePopup();
  const onEscCloseModal = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  };

  document.addEventListener('click', onBtnCloseModal);
  document.addEventListener('keydown', onEscCloseModal);

  function closePopup() {
    successMessageBlock.remove();
    document.removeEventListener('click', onBtnCloseModal);
    document.removeEventListener('keydown', onBtnCloseModal);
  }
};

const onGetError = () => {
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = `<span style="color: ${COLOR_ERROR}; text-transform: uppercase">${MESSAGE_GET_ERROR}</span>`;
  mapBlock.before(errorMessage);
  setTimeout(() => errorMessage.remove(), TIME_MESSAGE_REMOVE);
};

export {onPostError, onPostSuccess, onGetError};
