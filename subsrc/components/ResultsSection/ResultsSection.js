import imageTemplate from '../templates/imageTemplate.js';
import { ImageSection } from '../factory/componentFactory.js';
import store from '../../utils/store.js';
import LoadingTemplate from '../templates/LoadingTemplate.js';

const lazyLoadingObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});

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
            .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
            .join('');
        }
      } else {
        this.htmlTag.innerHTML = `
      Error 발생!
      status:${this.state.status}
      message:${this.state.message}
      `;
      }

      this.imageList = document.querySelectorAll('.results__item .image');
      this.imageList.forEach((el) => {
        lazyLoadingObserver.observe(el);
      });
    }
  }
}
