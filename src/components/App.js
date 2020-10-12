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
    this.header = new StatelessComponent({
      target: this.$target,
      tag: 'header',
      className: 'search',
    });
    this.toggleBtn = new CustomBtn({
      target: this.header.htmlTag,
      tag: 'button',
      className: 'toggle-btn',
      onClick: this._toggleDarkMode,
    });
    this.toggleBtn.htmlTag.innerHTML = 'toggle!';
    this.searchInput = new SearchInput({
      target: this.header.htmlTag,
      tag: 'input',
      className: 'search__input',
      onSearch: this._onSearch,
    });
    this.randomBtn = new CustomBtn({
      target: this.header.htmlTag,
      tag: 'button',
      className: 'search__random',
      onClick: this._handleRandom,
    });
    this.randomBtn.htmlTag.innerHTML = '랜덤!';
    this.$target.appendChild(this.header.htmlTag);
    this.searchRecent = new SearchRecent({
      target: this.$target,
      tag: 'p',
      className: 'search__recent',
      initialState: this.state.recentWords,
    });

    //Random images Section
    this.randomSection = new StatelessComponent({
      target: this.$target,
      tag: 'div',
      className: 'random',
    });
    this.randomSlide = new RandomSlide({
      target: this.randomSection.htmlTag,
      tag: 'section',
      className: 'random__banner',
      initialState: this.state.randomCats,
      onClick: this._onImageClick,
    });
    this.prevBtn = new CustomBtn({
      target: this.randomSection.htmlTag,
      tag: 'button',
      className: 'random__btn--prev',
      onClick: () => {
        console.log('prev');
      },
    });
    this.nextBtn = new CustomBtn({
      target: this.randomSection.htmlTag,
      tag: 'button',
      className: 'random__btn--next',
      onClick: () => {
        console.log('next');
      },
    });
    this.prevBtn.htmlTag.innerHTML = 'prev';
    this.nextBtn.htmlTag.innerHTML = 'next';

    //resultsSection
    this.searchResults = new SearchResults({
      target: this.$target,
      tag: 'section',
      className: 'results',
      initialState: this.state.currentData,
      onClick: this._onImageClick,
    });

    //Popup
    this.imageInfo = new ImageInfo({
      target: this.$target,
      tag: 'div',
      className: 'popup',
      initialState: {
        visible: false,
        data: [],
        isLoading: false,
      },
    });

    //initializing
    this.init();
  }
  init = () => {
    if (this.state.randomCats.data.length) return;
    this._handleRandom();
  };
  _handleRandom = async () => {
    this.randomSlide.setState({
      isLoading: true,
    });
    const res = await fetchAPI.getRandomCats();
    this.randomSlide.setState({
      ...res,
      isLoading: false,
    });

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
    this.searchResults.setState({
      isLoading: true,
    });
    const res = await fetchAPI.getCats(keyword);
    this.searchResults.setState({
      ...res,
      isLoading: false,
    });
    if (!res.isError) {
      this.setState({ currentData: res.data });
      store.setData(storeKey.currentData, res);
    }
  };

  _onImageClick = async (id) => {
    this.imageInfo.setState({
      isLoading: true,
      visible: true,
    });
    const imageInfo = await fetchAPI.getCatInfoById(id);
    this.imageInfo.setState({
      ...imageInfo,
      isLoading: false,
    });
  };

  _handleRecent = (value) => {
    console.log(this.state.recentWords);
    const { data } = this.state.recentWords;
    if (data.length === 5) {
      data.shift();
    }
    data.push(value);
    this.setState({
      recentWords: { data },
    });
    this.searchRecent.setState(this.setState.recentWords);
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
