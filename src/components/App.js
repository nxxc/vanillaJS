import ImageInfo from './ImageInfo/ImageInfo.js';
import RandomSlide from './RandomSlide/RandomSlide.js';
import SearchInput from './Search/SearchInput.js';
import SearchResults from './SearchResults/SearchResults.js';
import ToggleBtn from './ToggleBtn.js';
import api from '../utils/api.js';
import SearchRecent from './Search/SearchRecent.js';
import store from '../utils/store.js';
import SearchRandom from './Search/SearchRandom.js';

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
    const res = await api.getRandomCats();
    console.log(res);
    if (!res.isError) {
      this.setState({ randomCats: res.data });
      this.randomSlide.setState(res);
      this.randomSlide.toggleLoading();
      store.setRandomData(res);
    } else {
      this.setState({
        error: res,
      });
      this.randomSlide.setState(res);
      this.randomSlide.toggleLoading();
    }
  };

  _onSearch = async (keyword) => {
    this.searchResults.toggleLoading();
    const res = await api.getCats(keyword);
    console.log(res);
    if (!res.isError) {
      this.setState({ currentData: res.data });
      this.searchResults.setState(res);
      this.searchResults.toggleLoading();
      store.setCurrentData(res);
    } else {
      this.setState({
        error: res,
      });
      this.searchResults.setState(res);
      this.searchResults.toggleLoading();
    }
  };

  _onImageClick = async (id) => {
    const imageInfo = await api.getCatInfoById(id);
    this.imageInfo.setState({
      visible: true,
      data: imageInfo,
    });
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
    store.setRecentWords(this.state.recentWords);
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
