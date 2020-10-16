import fetchAPI from '../../utils/api.js';
import store from '../../utils/store.js';
import { StateComponent } from '../factory/componentFactory.js';

export default class RecentWords extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getRecentWords().data,
    };
    this.htmlTag.addEventListener('click', this.onSearch);
    this.render();
  }

  onSearch = async (e) => {
    if (e.target.className !== 'recent__word') return;
    const keyword = e.target.innerText;
    this.props.setCurrentData({
      isLoading: true,
    });
    const res = await fetchAPI.getCats(keyword);
    this.props.setCurrentData({
      isLoading: false,
      ...res,
    });
  };

  render() {
    if (!this.state.data) {
      this, (this.htmlTag.innerHTML = `최근검색어`);
      return;
    }
    this.htmlTag.innerHTML = `최근검색어:${this.state.data
      .map((word) => `<span class="recent__word">${word}</span>`)
      .reverse()
      .join('')}
      `;
  }
}
