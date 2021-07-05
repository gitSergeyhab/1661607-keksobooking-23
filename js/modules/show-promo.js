import {formField} from './validate-form.js';

const IMG_SIZE = '70';
const AVATAR_IMG_DEFAULT = 'img/muffin-grey.svg';

const avatarInput = formField.querySelector('#avatar');
const avatarPreview = formField.querySelector('.ad-form-header__preview img');
const imagesInput = formField.querySelector('#images');
const imagesPreview = formField.querySelector('.ad-form__photo');
const imgContainer = formField.querySelector('.ad-form__photo-container');

const showPromoAvatar = () => {
  avatarInput.addEventListener('change', (evt) => {
    const imgFile = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.addEventListener('load', (readerEvt) => avatarPreview.src = readerEvt.target.result);
  });
};

const clearImages = () => {
  Array.from(imgContainer.children).forEach((div) => {
    if (div.classList.contains('ad-form__photo')) {
      div.remove();
    }
  });
};

const showPromoImages = () => {
  imagesInput.addEventListener('change', (evt) => {
    // очищает предыдущий change
    clearImages();
    // для кажкого файла - див с картинкой
    const addDivImg = (result) => {
      const div =  imagesPreview.cloneNode(true);
      const img = document.createElement('img');
      img.src = result;
      img.width = IMG_SIZE;
      img.height = IMG_SIZE;
      div.append(img);
      imgContainer.append(div);
    };

    const imgFiles = evt.target.files;
    Array.from(imgFiles).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (readerEvt) => addDivImg(readerEvt.target.result));
    });
  });
};

const clearImagesFields = () => {
  avatarPreview.src = AVATAR_IMG_DEFAULT;
  clearImages();
};

export {showPromoAvatar, showPromoImages, clearImagesFields};
