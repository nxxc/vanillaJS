import SearchInput from './Search/SearchInput.js';
import SearchRecent from './Search/SearchRecent.js';
import RandomSlide from './RandomSlide/RandomSlide.js';
import SearchResults from './SearchResults/SearchResults.js';
import ImageInfo from './ImageInfo/ImageInfo.js';
import store, { storeKey } from '../utils/store.js';
import fetchAPI from '../utils/api.js';
import { CustomBtn, StatelessComponent } from './factory/componentFactory.js';

class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      currentData: store.getCurrentData(),
      randomCats: store.getRandomData(),
      recentWords: store.getRecentWords(),
    };
    //header

    this.header = new StatelessComponent($target, 'header', 'search');

    this.toggleBtn = new CustomBtn(
      this.header.htmlTag,
      'toggle-btn',
      this._toggleDarkMode
    );
    this.toggleBtn.htmlTag.innerHTML = 'toggle!';

    // this.searchInput = new SearchInput(this.header.htmlTag, this._onSearch);
    this.searchInput = new SearchInput(
      this.header.htmlTag,
      'search__input',
      this._onSearch
    );

    this.randomBtn = new CustomBtn(
      this.header.htmlTag,
      'search__random',
      this._handleRandom
    );
    this.randomBtn.htmlTag.innerHTML = '랜덤!';

    this.$target.appendChild(this.header.htmlTag);

    this.searchRecent = new SearchRecent($target, this.state.recentWords);

    this.randomSlide = new RandomSlide(
      this.$target,
      'section',
      'random__banner',
      this.state.randomCats,
      this._onImageClick
    );

    //resultsSection
    this.searchResults = new SearchResults(
      $target,
      'section',
      'results',
      this.state.currentData,
      this._onImageClick
    );

    //Popup

    this.imageInfo = new ImageInfo($target, 'div', 'popup', {
      visible: false,
      data: [],
      isLoading: false,
    });

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
  _toggleDarkMode = () => {
    document.querySelector('body').classList.toggle('dark');
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
    console.log(id);
    const imageInfo = await fetchAPI.getCatInfoById(id);
    this.imageInfo.setState({
      visible: true,
      ...imageInfo,
      isLoading: false,
    });
    // this.imageInfo.toggleLoading();
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
