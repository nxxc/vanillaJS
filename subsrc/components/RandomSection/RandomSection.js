import { CustomBtn, StateComponent } from '../factory/componentFactory.js';

export default class RandomSection extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {};

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
  }
}
