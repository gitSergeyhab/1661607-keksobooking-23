/* eslint-disable no-use-before-define */
const POST_ERROR_MESSAGE = 'При отправке данных произошла ошибка. Попробуйте позже.';
const POST_SUCCES_MESSAGE = 'всё ок';
const errorMessageBlock = document.querySelector('#error').content.querySelector('.error');
const successMessageBlock = document.querySelector('#success').content.querySelector('.success');

const addPostErrorMessage = () => {
  errorMessageBlock.querySelector('.error__message').textContent = POST_ERROR_MESSAGE;
  document.body.append(errorMessageBlock);

  const errorButton = errorMessageBlock.querySelector('.error__button');

  const onBtnCloseErrorModal = () => closeErrorPopup();
  const onEscCloseErrorModal = (evt) => {
    if (evt.keyCode === 27) {
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

const addPostSuccessMessage = () => {
  successMessageBlock.querySelector('.success__message').textContent = POST_SUCCES_MESSAGE;
  document.body.append(successMessageBlock);

  const onBtnCloseModal = () => closePopup();
  const onEscCloseModal = (evt) => {
    if (evt.keyCode === 27) {
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

const addMessage = (color, element, text, time) => {
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = `<span style="color: ${color}; text-transform: uppercase">${text}</span>`;
  element.before(errorMessage);
  setTimeout(() => errorMessage.remove(), time);
};

export {addPostErrorMessage, addPostSuccessMessage, addMessage};
