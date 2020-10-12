import { ImageSection, CustomBtn } from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';
export default class RandomSlide extends ImageSection {
  constructor(props) {
    super(props);
    console.log(this.htmlTag);
    this.prevBtn = new CustomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'prev',
      onClick: () => {
        console.log('prev');
      },
    });
    this.nextBtn = new CustomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'next',
      onClick: () => {
        console.log('next');
      },
    });
    this.prevBtn.htmlTag.innerHTML = 'prev';
    this.nextBtn.htmlTag.innerHTML = 'next';
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
