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
    this.htmlTag.innerHTML = this.state.data
      .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
      .join('');
  }
}
