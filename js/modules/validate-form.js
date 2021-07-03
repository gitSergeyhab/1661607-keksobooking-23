import {MAX_PRICE} from './setup.js';

const MAX_LEN_TITLE = 100;
const MIN_LEN_TITLE = 30;
const ERROR_BORDER = '4px solid red';

const typeAndPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsAndGuests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validationMessages = {
  characters: 'символов',
  tooFew: 'нужно еще',
  tooMany: 'удалите',
  minPrice: 'минимальная цена',
  maxPrice: 'максимальная цена',
};

const formField = document.querySelector('.ad-form');
const titleField = formField.querySelector('#title');
const priceField = formField.querySelector('#price');
const typeField = formField.querySelector('#type');
const roomNumber = formField.querySelector('#room_number');
const timein = formField.querySelector('#timein');
const timeout = formField.querySelector('#timeout');
const capacity = formField.querySelector('#capacity');
const optionCapacitys = capacity.querySelectorAll('option');

const validateForm = () => {
  const getMinPrise = () => typeAndPrice[typeField.value];

  const addTimesListener = (field1, field2) => {
    field1.addEventListener('change', () => {
      field2.value = field1.value;
    });
  };

  const hideOptions = () => optionCapacitys.forEach((option) => option.style.display = 'none');

  const showOptions = (array) => {
    array.forEach((number) => {
      optionCapacitys.forEach((option) => {
        option.removeAttribute('selected');
        if (option.value === number) {
          option.style.display = 'block';
        }
      });
    });
  };

  const addSelectedToOption = (number) => {
    optionCapacitys.forEach((option) => {
      if (option.value === number) {
        option.setAttribute('selected', true);
      }
    });
  };

  // начальные значения
  hideOptions();
  showOptions(['1']);
  addSelectedToOption('1');

  roomNumber.addEventListener('change', (evt) => {
    hideOptions();
    const hideGuestNumbers = roomsAndGuests[evt.target.value];
    showOptions(hideGuestNumbers);
    addSelectedToOption(hideGuestNumbers[0]);
  });

  typeField.addEventListener('change', () => {
    priceField.setAttribute('min', getMinPrise());
    priceField.setAttribute('placeholder', getMinPrise());
  });

  titleField.addEventListener('input', () => {
    const {tooFew, tooMany, characters} = validationMessages;
    if (titleField.value.length < MIN_LEN_TITLE) {
      titleField.setCustomValidity(`${tooFew} ${MIN_LEN_TITLE - titleField.value.length} ${characters}`);
    } else if (titleField.value.length > MAX_LEN_TITLE) {
      titleField.setCustomValidity(`${tooMany} ${titleField.value.length - MAX_LEN_TITLE} ${characters}`);
    } else {
      titleField.setCustomValidity('');
      titleField.style.border = '';
    }
    titleField.reportValidity();
  });

  priceField.addEventListener('input', () => {
    if (priceField.value < getMinPrise()) {
      priceField.setCustomValidity(`${validationMessages.minPrice} ${getMinPrise()}`);
    } else if (priceField.value > MAX_PRICE){
      priceField.setCustomValidity(`${validationMessages.minPrice} ${MAX_PRICE}`);
    } else {
      priceField.setCustomValidity('');
      priceField.style.border = '';
    }
    priceField.reportValidity();
  });

  //а неверно заполненные поля подсвечиваются красной рамкой.
  formField.querySelector('.ad-form__submit').addEventListener('click', () => {
    const inputs = formField.querySelectorAll('input:not(#address)');
    inputs.forEach((input) => {
      input.style.border = input.checkValidity() ? '' : ERROR_BORDER;
    });
  });

  addTimesListener(timein, timeout);
  addTimesListener(timeout, timein);
};

export {validateForm, formField};
