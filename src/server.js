import data from './data/countries.json';

export const getData = () => new Promise(resolve => resolve(data));
