import {getMockData} from './modules/get-mock-data.js';
import {SIMILAR_OFFER_COUNT} from './modules/data.js'

const offers = getMockData(SIMILAR_OFFER_COUNT);
offers; // чтоб eslint не ругался, потом удалю

// console.log(offers);
