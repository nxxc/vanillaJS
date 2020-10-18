import ImageTemplate from '../templates/imageTemplate.js';
import {
  ImageSection,
  StatelessComponent,
} from '../factory/componentFactory.js';
import store from '../../utils/store.js';
import LoadingTemplate from '../templates/LoadingTemplate.js';
import lazyLoadingObserver from '../../utils/lazyLoading.js';
import { classNames } from '../../share/html.js';

export default class ResultsSection extends ImageSection {
  constructor(props) {
    super(props);
    this.state = {
      data: store.getCurrentData().data,
    };

    this.render();
  }
  render() {
    if (this.state.isLoading) {
      this.htmlTag.innerHTML = LoadingTemplate;
      this.htmlTag.classList.add(classNames.loading);
    } else {
      this.htmlTag.classList.remove(classNames.loading);
      if (!this.state.isError) {
        if (!this.state.data.length) {
          this.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          this.htmlTag.innerHTML = this.state.data
            .map((cat, idx) =>
              ImageTemplate(cat, idx, classNames.ResultSection.imageArticle)
            )
            .join('');
        }
      } else {
        this.htmlTag.innerHTML = `
      Error 발생!
      status:${this.state.status}
      message:${this.state.message}
      `;
      }
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            this.htmlTag.innerHTML += divs;
          }
        });
      });
      const trigger = new StatelessComponent({
        target: this.htmlTag.parentNode,
        tag: 'div',
        className: 'trigger',
      });
      io.observe(trigger.htmlTag);

      const imageList = document.querySelectorAll(
        `.${classNames.ResultSection.imageArticle} .${classNames.articleImage}`
      );
      imageList.forEach((el) => {
        lazyLoadingObserver.observe(el);
      });
    }
  }
}
