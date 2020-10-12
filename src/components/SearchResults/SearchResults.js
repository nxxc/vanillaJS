import ImageSection from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';
export default class SearchResults extends ImageSection {
  constructor(target, tag, className, initialState, onClick) {
    super(...arguments);
  }
  render() {
    if (this.state.isLoading) {
      this.htmlTag.innerHTML = 'loading.....';
    } else {
      if (!this.state.isError) {
        if (!this.state.data.length) {
          console.log('검색결과 없음');
          this.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          this.htmlTag.innerHTML = this.state.data
            .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
            .join('');
        }
      } else {
        console.log(this.state);
        this.htmlTag.innerHTML = 'Error! 다시 시도해 주세요';
      }
    }
  }
}
