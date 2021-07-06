const btnCondiionColor = {
  enable: 'white',
  disable: 'black',
};

const changeBtnCondiion = (btn, activize = false) => {
  activize ?
    btn.removeAttribute('disabled') :
    setTimeout(() => btn.setAttribute('disabled', true), 0);// задержка, чтоб отправить форму до блокировки кнопки
  btn.style.backgroundColor = activize ?
    btnCondiionColor.enable :
    btnCondiionColor.disable;
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {changeBtnCondiion, debounce};
