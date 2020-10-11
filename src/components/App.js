import ToggleBtn from './ToggleBtn.js';
import SearchInput from './Search/SearchInput.js';
import SearchRandom from './Search/SearchRandom.js';
import SearchRecent from './Search/SearchRecent.js';

import RandomSlide from './RandomSlide/RandomSlide.js';

import SearchResults from './SearchResults/SearchResults.js';

import ImageInfo from './ImageInfo/ImageInfo.js';

import store, { storeKey } from '../utils/store.js';
import fetchAPI from '../utils/api.js';

class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      currentData: store.getCurrentData(),
      randomCats: store.getRandomData(),
      recentWords: store.getRecentWords(),
    };
    //header
    this.header = document.createElement('header');
    this.header.className = 'search';
    this.toggleBtn = new ToggleBtn(this.header);
    this.searchInput = new SearchInput(this.header, this._onSearch);
    this.randomBtn = new SearchRandom(this.header, this._handleRandom);
    this.$target.appendChild(this.header);
    this.searchRecent = new SearchRecent($target, this.state.recentWords);

    //randomSection
    this.randomSlide = new RandomSlide(
      this.$target,
      this.state.randomCats,
      this._onImageClick
    );

    //resultsSection
    this.searchResults = new SearchResults(
      $target,
      this.state.currentData,
      this._onImageClick
    );

    //Popup
    this.imageInfo = new ImageInfo($target);

    //initializing
    this.init();
  }
  init = async () => {
    if (this.state.randomCats.data.length) return;
    this._handleRandom();
  };
  _handleRandom = async () => {
    this.randomSlide.toggleLoading();
    const res = await fetchAPI.getRandomCats();
    this.randomSlide.setState(res);
    this.randomSlide.toggleLoading();
    if (!res.isError) {
      this.setState({ randomCats: res.data });
      store.setData(storeKey.randomCats, res);
    }
  };

  _onSearch = async (keyword) => {
    this._handleRecent(keyword);
    this.searchResults.toggleLoading();
    const res = await fetchAPI.getCats(keyword);
    this.searchResults.setState(res);
    this.searchResults.toggleLoading();
    if (!res.isError) {
      this.setState({ currentData: res.data });
      store.setData(storeKey.currentData, res);
    }
  };

  _onImageClick = async (id) => {
    this.imageInfo.toggleLoading();
    const imageInfo = await fetchAPI.getCatInfoById(id);
    this.imageInfo.setState({
      visible: true,
      ...imageInfo,
    });
    this.imageInfo.toggleLoading();
  };

  _handleRecent = (value) => {
    const createdAt = Date.now();
    const currentWords = [...this.state.recentWords, [value, createdAt]];
    if (currentWords.length > 5) {
      console.log(currentWords);
      currentWords.shift();
    }
    this.setState({
      recentWords: currentWords,
    });
    this.searchRecent.setState(this.state.recentWords);
    store.setData(storeKey.recentWords, this.state.recentWords);
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

export default App;
