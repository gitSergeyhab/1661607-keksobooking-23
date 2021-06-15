import { generateSimilarOfferCards } from './modules/generate-similar-offer-cards.js';

const offerElements = generateSimilarOfferCards();

const canvas = document.querySelector('#map-canvas');

canvas.append(offerElements[4]);
