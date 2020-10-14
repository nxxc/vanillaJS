import fetchAPI from '../../utils/api.js';
import { StateComponent } from '../factory/componentFactory.js';
import SearchInput from './SearchInput.js';
import SearchRandomBtn from './SearchRandomBtn.js';
import ToggleDarkBtn from './ToggleDarkBtn.js';

export default class SearchHeader extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleBtn = new ToggleDarkBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'toggle-btn',
      onClick: this.toggleDarkMode,
    });

    this.input = new SearchInput({
      target: this.htmlTag,
      tag: 'input',
      className: 'search__input',
      onSearch: this.searchData,
    });

    this.randomBtn = new SearchRandomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'search__random',
      onClick: this.searchRandomCats,
    });
  }

  toggleDarkMode = () => {
    document.querySelector('body').classList.toggle('dark');
  };

  searchData = async (keyword) => {
    const res = await fetchAPI.getCats(keyword);
    this.props.setCurrentData(res);
  };

  searchRandomCats = async () => {
    const res = await fetchAPI.getRandomCats();
    this.props.setRandomCats(res);
  };
}
