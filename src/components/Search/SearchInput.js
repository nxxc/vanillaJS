import { StatelessComponent } from '../factory/componentFactory.js';
export default class SearchInput extends StatelessComponent {
  constructor(target, className, onSearch) {
    super(target, 'input', className);
    this.onSearch = onSearch;
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
      this.onSearch(value);
      e.target.value = '';
    }
  };
  static clearInput = (e) => {
    e.target.value = '';
  };
}
