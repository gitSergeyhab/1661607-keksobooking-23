const form = () => {
  const formField = document.querySelector('.ad-form');
  // const titleField = formField.querySelector('#title'); // так и не понял на что его валидировать в js, если с длиной справляются атрибуты в html
  const priceField = formField.querySelector('#price');
  const typeField = formField.querySelector('#type');
  const roomNumber = formField.querySelector('#room_number');
  const capacity = formField.querySelector('#capacity');
  const optionCapacitys = capacity.querySelectorAll('option');

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
