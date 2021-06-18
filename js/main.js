import { generateSimilarOfferCards } from './modules/generate-similar-offer-cards.js';
import { changeFormCondition } from './modules/change-form-condition.js';
import {form} from './modules/form.js';

const offerElements = generateSimilarOfferCards();

const canvas = document.querySelector('#map-canvas');

canvas.append(offerElements[4]);

// Напишите функцию, которая будет переводить страницу в активное состояние.
changeFormCondition('.ad-form', 'ad-form--disabled', false);
changeFormCondition('.map__filters', 'ad-form--disabled', false);
form();
