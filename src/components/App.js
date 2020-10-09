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
    this.toggleBtn = new ToggleBtn(this.header);
    this.searchInput = new SearchInput(this.header, this._onSearch);
    this.randomBtn = new SearchRandom(this.header, this._onBtnClick);
    this.searchRecent = new SearchRecent(this.header, this.state.recentWords);
    this.$target.appendChild(this.header);

    //randomSection
    this.randomSlide = new RandomSlide(this.$target, this.state.randomCats);

    //resultsSection
    this.searchResults = new SearchResults(
      $target,
      this.state.currentData,
      this._onImageClick
    );

    //Popup
    this.imageInfo = new ImageInfo($target);

    this.init();
  }
  init = async () => {
    const randomCats = await api.getRandomCats();
    this.setState({ randomCats });
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
    const randomCats = await api.getRandomCats();
    this.setState({ randomCats });
    store.setRandomData(randomCats);
  };

  _handleRecent = (value) => {
    const currentWords = this.state.recentWords;
    currentWords.push(value);
    if (currentWords.length > 5) {
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
