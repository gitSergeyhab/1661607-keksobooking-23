const form = () => {
  const MAX_LEN_TITLE = 100;
  const MIN_LEN_TITLE = 30;
  const MAX_PRICE = 1000000;

  const formField = document.querySelector('.ad-form');
  const titleField = formField.querySelector('#title'); // так и не понял на что его валидировать в js, если с длиной справляются атрибуты в html
  const priceField = formField.querySelector('#price');
  const typeField = formField.querySelector('#type');
  const roomNumber = formField.querySelector('#room_number');
  const capacity = formField.querySelector('#capacity');
  const optionCapacitys = capacity.querySelectorAll('option');

  titleField.addEventListener('input', () => {
    // думаю, этот блок лишний, но пусть будет ->
    if (titleField.value.length < MIN_LEN_TITLE) {
      titleField.setCustomValidity(`нужно еще ${MIN_LEN_TITLE - titleField.value.length} символов`);
    } else if (titleField.value.length > MAX_LEN_TITLE) {
      titleField.setCustomValidity(`удалите ${titleField.value.length - MAX_LEN_TITLE} символов`);
    } else {
      titleField.setCustomValidity('');
    } // <-
    titleField.reportValidity();
  });

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


  const getMinPrise = () => typeAndPrice[typeField.value];
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


  const changePriceByType = () => {
    typeField.addEventListener('change', (evt) => {
      const minPrice = typeAndPrice[evt.target.value];
      priceField.setAttribute('min', minPrice);
      priceField.setAttribute('placeholder', minPrice);
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

  const getSelectedToOption = (number) => {
    optionCapacitys.forEach((option) => {
      if (option.value === number) {
        option.setAttribute('selected', true);
      }
    });
  };

  const changeGuestsByRooms = () => {
    roomNumber.addEventListener('change', (evt) => {
      hideOptions();
      const hideGuestNumbers = roomsAndGuests[evt.target.value];
      showOptions(hideGuestNumbers);
      getSelectedToOption(hideGuestNumbers[0]);
    });
  };

  // начальные значения
  hideOptions();
  showOptions(['1']);
  getSelectedToOption('1');

  // значения по change
  changePriceByType();
  changeGuestsByRooms();
};

export {form};
