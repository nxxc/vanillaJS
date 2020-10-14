import imageTemplate from '../templates/imageTemplate.js';

import { ImageSection, StateComponent } from '../factory/componentFactory.js';

export default class ResultsSection extends ImageSection {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.data,
    };

    this.render();
  }
  render() {
    this.htmlTag.innerHTML = this.state.data
      .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
      .join('');
  }
}
