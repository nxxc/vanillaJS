import imageTemplate from '../templates/imageTemplate.js';

import { ImageSection, StateComponent } from '../factory/componentFactory.js';
import store from '../../utils/store.js';

export default class ResultsSection extends ImageSection {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getCurrentData().data,
    };

    this.render();
  }
  render() {
    console.log(this.state);
    if (this.state.isLoading) {
      this.htmlTag.innerHTML = 'Loading...';
      return;
    }
    if (!this.state.isError) {
      if (!this.state.data.length) {
        this.htmlTag.innerHTML = '검색결과가 없습니다';
      } else {
        this.htmlTag.innerHTML = this.state.data
          .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
          .join('');
      }
    } else {
      this.htmlTag.innerHTML = `
      Error 발생!
      status:${this.state.status}
      message:${this.state.message}
      `;
    }
  }
}
