/* eslint-disable no-use-before-define */
const POST_ERROR_MESSAGE = 'При отправке данных произошла ошибка. Попробуте позже.';
const errorMessageBlock = document.querySelector('#error').content.querySelector('.error');

const addPostErrorMessage = () => {
  const block = errorMessageBlock.cloneNode(true);
  block.querySelector('.error__message').textContent = POST_ERROR_MESSAGE;
  document.body.append(block);

  const errorButton = block.querySelector('.error__button');

  const onBtnCloseErrorModal = () => closeErrorPopup();
  const onEscCloseErrorModal = (evt) => {
    if (evt.keyCode === 27) {
      closeErrorPopup();
    }
  };

  errorButton.addEventListener('click', onBtnCloseErrorModal);
  document.addEventListener('keydown', onEscCloseErrorModal);

  function closeErrorPopup() {
    block.remove();
    document.removeEventListener('keydown', onBtnCloseErrorModal);
  }
};

export {addPostErrorMessage};
