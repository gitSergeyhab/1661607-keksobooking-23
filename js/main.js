import { generateSimilarOfferCards } from './modules/generate-similar-offer-cards.js';
import { changeFormCondition } from './modules/change-form-condition.js';
import {validateForm} from './modules/validate-form.js';

const offerElements = generateSimilarOfferCards();

const canvas = document.querySelector('#map-canvas');

canvas.append(offerElements[4]);

changeFormCondition('.ad-form', 'ad-form--disabled', false);
changeFormCondition('.map__filters', 'ad-form--disabled', false);
validateForm();
