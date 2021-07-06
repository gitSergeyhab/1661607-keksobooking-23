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


const showPopup = (messageBlock, selectorMessage, MESSAGE, selectorBtn) => {
  messageBlock.querySelector(selectorMessage).textContent = MESSAGE;
  document.body.append(messageBlock);
  // при наличии обработчика на всем документе, смысла в этой кнопке никакого...  ??? Удалить ???
  const errorButton = selectorBtn ? messageBlock.querySelector(selectorBtn) : null;

  const onAnythingClick = () => closePopup();
  const onBtnCloseClick = () => closePopup();
  const onEscKeydown = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  };

  document.addEventListener('click', onAnythingClick);
  document.addEventListener('keydown', onEscKeydown);
  selectorBtn ? errorButton.addEventListener('click', onBtnCloseClick) : null;

  function closePopup() {
    messageBlock.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onAnythingClick);
  }
};

const showPostError = () => showPopup(errorMessageBlock, '.error__message', MESSAGE_POST_ERROR, '.error__button');
const showPostSuccess = () => showPopup(successMessageBlock, '.success__message', MESSAGE_POST_SUCCESS);

const showGetError = () => {
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = `<span style="color: ${COLOR_ERROR}; text-transform: uppercase">${MESSAGE_GET_ERROR}</span>`;
  mapBlock.before(errorMessage);
  setTimeout(() => errorMessage.remove(), TIME_MESSAGE_REMOVE);
};

export {showPostSuccess, showPostError, showGetError};
