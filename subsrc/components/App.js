import ImageInfo from './ImageInfo/ImageInfo.js';
import store from '../utils/store.js';
import RandomSection from './RandomSection/RandomSection.js';
import RecentWords from './RecentWords/RecentWords.js';
import ResultsSection from './ResultsSection/ResultsSection.js';
import SearchHeader from './SearchHeader/SearchHeader.js';

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
    });
    this.resultsSection = new ResultsSection({
      target: this.$target,
      tag: 'section',
      className: 'results',
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
  };

  setRandomCats = (data) => {
    this.setState({
      randomCats: data,
    });
  };

  setRecentWords = (data) => {
    this.setState({
      setRecentWords: data,
    });
  };

  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.render();
  }
  render() {}
}
