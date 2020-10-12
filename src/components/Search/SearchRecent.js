import { StateComponent } from '../factory/componentFactory.js';

export default class SearchRecent extends StateComponent {
  constructor(props) {
    super(props);
  }
  render() {
    this.htmlTag.innerHTML = `최근검색어:${this.state.data
      .map((word) => `<span>${word}</span>`)
      .reverse()
      .join('')}
      `;
  }
}
