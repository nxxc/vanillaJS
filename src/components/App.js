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
      error: {},
    };
    //header
    this.header = document.createElement('header');
    this.header.className = 'search';
    this.toggleBtn = new ToggleBtn(this.header);
    this.searchInput = new SearchInput(this.header, this._onSearch);
    this.randomBtn = new SearchRandom(this.header, this._onBtnClick);
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
    if (this.state.randomCats.data.length) {
      this.randomSlide.setState({
        isLoading: false,
      });
      return;
    }
    this.randomSlide.setState({ isLoading: true });
    const res = await api.getRandomCats();
    if (!res.isError) {
      this.setState({ randomCats: res.data });
      this.randomSlide.setState({
        ...res,
        isLoading: false,
      });
      store.setRandomData({
        ...res,
        isLoading: false,
      });
    } else {
      this.setState({
        error: res,
      });
      this.randomSlide.setState({
        ...res,
        isLoading: false,
      });
    }
  };

  _onSearch = async (keyword) => {
    const cats = await api.getCats(keyword);
    this.setState({ currentData: cats });
    this.searchResults.setState(cats);
    this._handleRecent(keyword);
    store.setCurrentData(this.state.currentData);
  };

  _onImageClick = async (id) => {
    const imageInfo = await api.getCatInfoById(id);
    this.imageInfo.setState({
      visible: true,
      data: imageInfo,
    });
  };

  _onBtnClick = async () => {
    this.randomSlide.setState({ isLoading: true });
    const res = await api.getRandomCats();
    if (!res.isError) {
      this.setState({ randomCats: res.data });
      this.randomSlide.setState({
        ...res,
        isLoading: false,
      });
      store.setRandomData({
        ...res,
        isLoading: false,
      });
    } else {
      this.setState({
        error: res,
      });
      this.randomSlide.setState({
        ...res,
        isLoading: false,
      });
    }
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

  render() {
    if (this.state.error.isError) {
      console.log(1);
      this.randomSlide.innerHTML = this.state.error.message;
    }
  }
}

export default App;
