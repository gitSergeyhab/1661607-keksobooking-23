import {getMockData} from './modules/get-mock-data.js';

const SIMILAR_OFFER_COUNT = 10;

const offers = getMockData(SIMILAR_OFFER_COUNT);
offers; // чтоб npm t не ругался, потом удалю

console.log(offers);
