const cardTemplate = document.querySelector('#card').content.querySelector('article');

const createNewCard = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
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
    element.innerHTML = content;
    if (!showMarker) {
      element.style.display = 'none';
    }
  };

  showBlock('.popup__title', title, title);
  showBlock('.popup__text--address', address, address);
  showBlock('.popup__text--price', `${price} <span>₽/ночь</span>`, price);
  showBlock('.popup__type', types[type], type);
  showBlock('.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, rooms);
  showBlock('.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, checkin);
  showBlock('.popup__description', description, description);

  const makeFeature = (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`;
  const featureListText = features ? features.reduce((acc, elem) => acc + makeFeature(elem), '') : [];
  showBlock('.popup__features', featureListText, features && features[0]);

  const makePhoto = (photo) => `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья ${title}">`;
  const photoListText = photos ? photos.reduce((acc, elem) => acc + makePhoto(elem), '') : [];
  showBlock('.popup__photos', photoListText, photos && photos[0]);

  const popupAvatar = card.querySelector('.popup__avatar');
  avatar ? popupAvatar.src = avatar : popupAvatar.style.display = 'none';

  return card;
};

export {createNewCard};
