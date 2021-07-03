import {formField} from './validate-form.js';

const IMG_SIZE = '70';

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

const showPromoImages = () => {
  imagesInput.addEventListener('change', (evt) => {
    // очищает предыдущий change
    Array.from(imgContainer.children).forEach((div) => {
      if (div.classList.contains('ad-form__photo')) {
        div.remove();
      }
    });
    // для кажкого файла - див с картинкой
    const onLoadAppendImg = (result) => {
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
      reader.addEventListener('load', (readerEvt) => onLoadAppendImg(readerEvt.target.result));
    });
  });
};

export {showPromoAvatar, showPromoImages};
