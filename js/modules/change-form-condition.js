const changeFormCondition = (formSelector,  classBlock, disable = true) => {
  const offerForm = document.querySelector(formSelector);
  const fildsets = Array.from(offerForm.children);

  if (disable) {
    offerForm.classList.add(classBlock);
    fildsets.forEach((fildset) => fildset.setAttribute('disabled', disable));
  } else {
    offerForm.classList.remove(classBlock);
    fildsets.forEach((fildset) => fildset.removeAttribute('disabled'));
  }
};

// Реализуйте с помощью JavaScript (удобнее функцией!)
//  перевод страницы в неактивное состояние. Все пункты
changeFormCondition('.ad-form', 'ad-form--disabled');
changeFormCondition('.map__filters', 'ad-form--disabled');

export {changeFormCondition};
