const MAX_LEN_TITLE = 100;
const MIN_LEN_TITLE = 30;
const MAX_PRICE = 1000000;

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

const validateForm = () => {

  const formField = document.querySelector('.ad-form');
  const titleField = formField.querySelector('#title');
  const priceField = formField.querySelector('#price');
  const typeField = formField.querySelector('#type');
  const roomNumber = formField.querySelector('#room_number');
  const timein = formField.querySelector('#timein');
  const timeout = formField.querySelector('#timeout');
  const capacity = formField.querySelector('#capacity');
  const optionCapacitys = capacity.querySelectorAll('option');

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
    if (titleField.value.length < MIN_LEN_TITLE) {
      titleField.setCustomValidity(`нужно еще ${MIN_LEN_TITLE - titleField.value.length} символов`);
    } else if (titleField.value.length > MAX_LEN_TITLE) {
      titleField.setCustomValidity(`удалите ${titleField.value.length - MAX_LEN_TITLE} символов`);
    } else {
      titleField.setCustomValidity('');
    }
    titleField.reportValidity();
  });

  priceField.addEventListener('input', () => {
    if (priceField.value < getMinPrise()) {
      priceField.setCustomValidity(`минимальная цена ${getMinPrise()}`);
    } else if (priceField.value > MAX_PRICE){
      priceField.setCustomValidity(`максимальная цена ${MAX_PRICE}`);
    } else {
      priceField.setCustomValidity('');
    }
    priceField.reportValidity();
  });

  addTimesListener(timein, timeout);
  addTimesListener(timeout, timein);
};

export {validateForm};