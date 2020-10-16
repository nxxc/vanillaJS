import store from '../../utils/store.js';
import {
  CustomBtn,
  ImageSection,
  StateComponent,
} from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';
import LoadingTemplate from '../templates/LoadingTemplate.js';

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
      onClick: this.onPrevBtnClick,
    });
    this.prevBtn.htmlTag.innerHTML = 'prev';

    this.nextBtn = new CustomBtn({
      target: this.htmlTag,
      tag: 'button',
      className: 'random__btn--next',
      onClick: this.onNextBtnClick,
    });
    this.nextBtn.htmlTag.innerHTML = 'next';

    this.width = this.randomSlide.htmlTag.getBoundingClientRect().width;
    this.styleSheet = document.styleSheets[0];
    this.itemClass = this.styleSheet.cssRules[29];

    this.render();
  }

  onPrevBtnClick = () => {
    let currentRight = parseFloat(
      this.itemClass.style.right.slice(0, this.itemClass.style.right.length - 2)
    );
    if (currentRight === 0) currentRight = this.width * 10;
    this.itemClass.style.right = `${currentRight - this.width}px`;
  };

  onNextBtnClick = () => {
    let currentRight = parseFloat(
      this.itemClass.style.right.slice(0, this.itemClass.style.right.length - 2)
    );
    if (currentRight === this.width * 9) currentRight = -this.width;
    this.itemClass.style.right = `${currentRight + this.width}px`;
  };

  render() {
    if (this.state.isLoading) {
      this.randomSlide.htmlTag.innerHTML = LoadingTemplate;
      this.randomSlide.htmlTag.classList.add('loading');
    } else {
      this.randomSlide.htmlTag.classList.remove('loading');
      if (!this.state.isError) {
        if (!this.state.data.length) {
          this.randomSlide.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          // const data = this.state.data.slice(0, 5);
          this.randomSlide.htmlTag.innerHTML = this.state.data
            .map((cat, idx) => imageTemplate(cat, idx, 'random__banner--item'))
            .join('');
        }
      } else {
        this.randomSlide.htmlTag.innerHTML = `
        Error 발생!
        status:${this.state.status}
        message:${this.state.message}
        `;
      }
    }
  }
}
