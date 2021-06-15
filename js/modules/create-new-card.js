const cardTemplate = document.querySelector('#card').content.querySelector('article');

const createNewCard = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, futures, description, photos},
}) => {

  const types = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const card = cardTemplate.cloneNode(true);

  //Предусмотрите ситуацию, когда данных для заполнения не хватает ...
  const showBlock = (selector, content, showMarker) => {
    const element = card.querySelector(selector);
    showMarker ?
      element.innerHTML = content :
      element.style.display = 'none';
  };

  showBlock('.popup__title', title, title);
  showBlock('.popup__text--address', address, address);
  showBlock('.popup__text--price', `${price} <span>₽/ночь</span>`, price);
  showBlock('.popup__type', types[type], type);
  showBlock('.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, rooms);
  showBlock('.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, checkin);
  showBlock('.popup__description', description, description);

  const makeFeature = (future) => `<li class="popup__feature popup__feature--${future}"></li>`;
  const futureListText = futures.reduce((acc, elem) => acc + makeFeature(elem), '');
  showBlock('.popup__features', futureListText, futures[0]);

  const makePhoto = (photo) => `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья ${title}">`;
  const photoListText = photos.reduce((acc, elem) => acc + makePhoto(elem), '');
  showBlock('.popup__photos', photoListText, photos[0]);

  card.querySelector('.popup__avatar').src = avatar;

  return card;
};

export {createNewCard};
