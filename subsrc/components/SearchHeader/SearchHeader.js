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
      onClick: () => {
        console.log('toggleDarkMode');
      },
    });

    this.input = new SearchInput({
      target: this.htmlTag,
      tag: 'input',
      className: 'search__input',
    });

    this.randomBtn = new SearchRandomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'search__random',
    });
  }
}
