import ImageSection from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';
export default class RandomSlide extends ImageSection {
  constructor(target, tag, className, initialState, onClick) {
    super(...arguments);
  }
  render() {
    if (this.state.isLoading) {
      this.htmlTag.innerHTML = 'loading.....';
    } else {
      if (!this.state.isError) {
        const data = this.state.data.slice(0, 5);
        this.htmlTag.innerHTML = data
          .map((cat, idx) => imageTemplate(cat, idx, 'random__banner--item'))
          .join('');
      } else {
        console.log(this.state);
        this.htmlTag.innerHTML = 'Error! 다시 시도해 주세요';
      }
    }
  }
}
