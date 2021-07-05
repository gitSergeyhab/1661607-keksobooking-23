// ничего в итоге не пригодилось) удаляю ?

// const getMinAndMax = (first, second) => [
//   Math.min(Math.abs(first), Math.abs(second)),
//   Math.max(Math.abs(first), Math.abs(second)),
// ];

// const getRandomInt = (min = 1, max = 10) => {
//   [min, max] = getMinAndMax(min, max);
//   return Math.round(Math.random() * (max - min) + min);
// };

// const getRandomNumber = (min = 1, max = 10, afterPoint = 0) => {
//   [min, max] = getMinAndMax(min, max);
//   return +(Math.random() * (max - min) + min).toFixed(afterPoint);
// };

// export {getRandomInt, getRandomNumber};
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

export {changeBtnCondiion};
