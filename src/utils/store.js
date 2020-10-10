export const storeKey = Object.freeze({
  currentData: 'currentData',
  randomCats: 'randomCats',
  recentWords: 'recentWords',
});

const defaultObj = {
  data: [],
};

const getRecentWords = () => {
  const recentWords = JSON.parse(localStorage.getItem('recentWords'));
  return recentWords ? recentWords : [];
};
const getRandomData = () => {
  const randomCats = JSON.parse(localStorage.getItem('randomCats'));
  return randomCats ? randomCats : defaultObj;
};

const getCurrentData = () => {
  const currentData = JSON.parse(localStorage.getItem('currentData'));
  return currentData ? currentData : defaultObj;
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const store = {
  getRecentWords,
  getRandomData,
  getCurrentData,
  setData,
};
export default store;
