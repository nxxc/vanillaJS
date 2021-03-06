import store from '../../utils/store.js';
import {
  CustomBtn,
  ImageSection,
  StateComponent,
} from '../factory/componentFactory.js';
import ImageTemplate from '../templates/ImageTemplate.js';
import LoadingTemplate from '../templates/LoadingTemplate.js';
import lazyLoadingObserver from '../../utils/lazyLoading.js';
import { classNames, htmlTag } from '../../share/html.js';
export default class RandomSection extends ImageSection {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getRandomData().data,
    };

    this.randomSlide = new StateComponent({
      target: this.htmlTag,
      tag: htmlTag.section,
      className: classNames.RandomSection.randomSlide,
    });

    this.prevBtn = new CustomBtn({
      target: this.htmlTag,
      tag: htmlTag.button,
      className: classNames.RandomSection.prevBtn,
      onClick: this.onPrevBtnClick,
    });
    this.prevBtn.htmlTag.innerHTML = 'prev';

    this.nextBtn = new CustomBtn({
      target: this.htmlTag,
      tag: htmlTag.button,
      className: classNames.RandomSection.nextBtn,
      onClick: this.onNextBtnClick,
    });
    this.nextBtn.htmlTag.innerHTML = 'next';

    this.render();
  }

  onPrevBtnClick = () => {
    const itemClass = this.cssPropertySelector(
      `.${classNames.RandomSection.imageArticle}`
    );
    const width = this.randomSlide.htmlTag.getBoundingClientRect().width;
    let currentRight = parseFloat(
      itemClass.style.right.slice(0, itemClass.style.right.length - 2)
    );
    if (currentRight === 0) currentRight = width * 10;
    itemClass.style.right = `${currentRight - width}px`;
  };

  onNextBtnClick = () => {
    const itemClass = this.cssPropertySelector(
      `.${classNames.RandomSection.imageArticle}`
    );
    const width = this.randomSlide.htmlTag.getBoundingClientRect().width;
    let currentRight = parseFloat(
      itemClass.style.right.slice(0, itemClass.style.right.length - 2)
    );
    console.log(currentRight);
    if (currentRight === width * 9) currentRight = -width;
    itemClass.style.right = `${currentRight + width}px`;
  };

  render() {
    if (this.state.isLoading) {
      this.randomSlide.htmlTag.innerHTML = LoadingTemplate;
      this.randomSlide.htmlTag.classList.add(classNames.loading);
    } else {
      this.randomSlide.htmlTag.classList.remove(classNames.loading);
      if (!this.state.isError) {
        if (!this.state.data.length) {
          this.randomSlide.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          // const data = this.state.data.slice(0, 5);
          this.randomSlide.htmlTag.innerHTML = this.state.data
            .map((cat, idx) =>
              ImageTemplate(cat, idx, classNames.RandomSection.imageArticle)
            )
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
    const imageList = document.querySelectorAll(
      `.${classNames.RandomSection.imageArticle} .${classNames.articleImage}`
    );
    imageList.forEach((el) => {
      lazyLoadingObserver.observe(el);
    });
  }
}
