import store from '../../utils/store.js';
import {
  CustomBtn,
  ImageSection,
  StateComponent,
} from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';

export default class RandomSection extends ImageSection {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getRandomData().data,
    };
    this.randomSlide = new StateComponent({
      target: this.htmlTag,
      tag: 'section',
      className: 'random__banner',
    });
    this.prevBtn = new CustomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'random__btn--prev',
      onClick: () => {
        console.log('prev');
      },
    });
    this.prevBtn.htmlTag.innerHTML = 'prev';
    this.nextBtn = new CustomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'random__btn--next',
      onClick: () => {
        console.log('next');
      },
    });
    this.nextBtn.htmlTag.innerHTML = 'next';

    this.render();
  }

  render() {
    const data = this.state.data.slice(0, 5);
    this.randomSlide.htmlTag.innerHTML = data
      .map((cat, idx) => imageTemplate(cat, idx, 'random__banner--item'))
      .join('');
  }
}
