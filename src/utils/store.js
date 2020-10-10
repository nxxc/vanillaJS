const defaultObj = {
  data: [],
  message: 'data가 없어용',
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

const setRecentWords = (data) => {
  localStorage.setItem('recentWords', JSON.stringify(data));
};
const setRandomData = (data) => {
  localStorage.setItem('randomCats', JSON.stringify(data));
};
const setCurrentData = (data) => {
  localStorage.setItem('currentData', JSON.stringify(data));
};

const store = {
  getRecentWords,
  getRandomData,
  getCurrentData,
  setRecentWords,
  setRandomData,
  setCurrentData,
};
export default store;
