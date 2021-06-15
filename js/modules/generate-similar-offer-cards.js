import {getMockData} from './get-mock-data.js';
import {OFFER_COUNT} from './data.js';
import {createNewCard} from './create-new-card.js';


const generateSimilarOfferCards = () => {
  const offers = getMockData(OFFER_COUNT);
  return offers.map((offer) => createNewCard(offer));
};

export {generateSimilarOfferCards};
