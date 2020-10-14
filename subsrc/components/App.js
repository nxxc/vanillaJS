import ImageInfo from './ImageInfo/ImageInfo.js';
import store, { storeKey } from '../utils/store.js';
import RandomSection from './RandomSection/RandomSection.js';
import RecentWords from './RecentWords/RecentWords.js';
import ResultsSection from './ResultsSection/ResultsSection.js';
import SearchHeader from './SearchHeader/SearchHeader.js';
import fetchAPI from '../../src/utils/api.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      currentData: store.getCurrentData(),
      randomCats: store.getRandomData(),
      recentWords: store.getRecentWords(),
    };

    this.searchHeader = new SearchHeader({
      target: this.$target,
      tag: 'header',
      className: 'search',
      setRandomCats: this.setRandomCats,
      setCurrentData: this.setCurrentData,
    });
    this.recentWords = new RecentWords({
      target: this.$target,
      tag: 'p',
      className: 'search__recent',
    });
    this.randomSection = new RandomSection({
      target: this.$target,
      tag: 'div',
      className: 'random',
      data: this.state.randomCats,
      onClick: this.onImageClick,
    });
    this.resultsSection = new ResultsSection({
      target: this.$target,
      tag: 'section',
      className: 'results',
      data: this.state.currentData,
      onClick: this.onImageClick,
    });
    this.imagePopup = new ImageInfo({
      target: this.$target,
      tag: 'div',
      className: 'popup',
    });
  }

  setCurrentData = (data) => {
    this.setState({
      currentData: data,
    });
    this.resultsSection.setState(data);
    store.setData(storeKey.currentData, data);
  };

  setRandomCats = (data) => {
    this.setState({
      randomCats: data,
    });
    this.randomSection.setState(data);
    store.setData(storeKey.randomCats, data);
  };

  setRecentWords = (data) => {
    this.setState({
      setRecentWords: data,
    });
  };

  onImageClick = async (id) => {
    this.imagePopup.setState({
      isLoading: true,
      visible: true,
      data: [],
    });
    const imageInfo = await fetchAPI.getCatInfoById(id);
    this.imagePopup.setState({
      isLoading: false,
      visible: true,
      ...imageInfo,
    });
  };

  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.render();
  }
  render() {
    console.log(this.state);
  }
}
