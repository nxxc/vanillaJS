import store from '../../utils/store.js';
import { StateComponent } from '../factory/componentFactory.js';

export default class RecentWords extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getRecentWords().data,
    };
    this.render();
  }
  render() {
    if (!this.state.data) {
      this, (this.htmlTag.innerHTML = `최근검색어`);
      return;
    }
    this.htmlTag.innerHTML = `최근검색어:${this.state.data
      .map((word) => `<span>${word}</span>`)
      .reverse()
      .join('')}
      `;
  }
}
