import store from '../../utils/store.js';
import { StateComponent } from '../factory/componentFactory.js';

export default class SearchInput extends StateComponent {
  constructor(props) {
    super(props);
    this.htmlTag.setAttribute('autofocus', true);
    this.htmlTag.placeholder = '고양이를 검색하세요...';
    this.htmlTag.addEventListener('keypress', this.handleInput);
    this.htmlTag.addEventListener('focusin', this.clearInput);
  }

  handleInput = (e) => {
    const {
      key,
      target: { value },
    } = e;
    if (key === 'Enter' && value !== '') {
      this.props.onSearch(value);
      this.handleRecent(value);
      e.target.value = '';
    }
  };
  handleRecent = (value) => {
    const { data } = store.getRecentWords();
    if (data.length === 5) {
      data.shift();
    }
    data.push(value);
    this.props.setRecentWords({ data });
  };
  clearInput = (e) => {
    e.target.value = '';
  };
}
