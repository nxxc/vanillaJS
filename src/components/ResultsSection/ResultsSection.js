import ImageTemplate from '../templates/imageTemplate.js';
import { ImageSection } from '../factory/componentFactory.js';
import store from '../../utils/store.js';
import LoadingTemplate from '../templates/LoadingTemplate.js';
import lazyLoadingObserver from '../../utils/lazyLoading.js';

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
      this.htmlTag.classList.add('loading');
    } else {
      this.htmlTag.classList.remove('loading');
      if (!this.state.isError) {
        if (!this.state.data.length) {
          this.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          this.htmlTag.innerHTML = this.state.data
            .map((cat, idx) => ImageTemplate(cat, idx, 'results__item'))
            .join('');
        }
      } else {
        this.htmlTag.innerHTML = `
      Error 발생!
      status:${this.state.status}
      message:${this.state.message}
      `;
      }

      const imageList = document.querySelectorAll('.results__item .image');
      imageList.forEach((el) => {
        lazyLoadingObserver.observe(el);
      });
    }
  }
}
