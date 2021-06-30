const CLASS_BLOCK = 'ad-form--disabled';

const changeFormCondition = (formSelector,  classBlock, disable) => {
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

const disableFormsCondition = (disable = true) => {
  changeFormCondition('.ad-form', CLASS_BLOCK, disable);
  changeFormCondition('.map__filters', CLASS_BLOCK, disable);
};

export {disableFormsCondition};
