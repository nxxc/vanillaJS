import { StateComponent } from '../factory/componentFactory.js';

export default class SearchInput extends StateComponent {
  constructor(props) {
    super(props);

    this.htmlTag.setAttribute('autofocus', true);
    this.htmlTag.placeholder = '고양이를 검색하세요...';
  }
}
