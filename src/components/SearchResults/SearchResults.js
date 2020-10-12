import { ImageSection } from '../factory/componentFactory.js';
import imageTemplate from '../templates/imageTemplate.js';
export default class SearchResults extends ImageSection {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.state.isLoading) {
      this.htmlTag.innerHTML = 'loading.....';
    } else {
      if (!this.state.isError) {
        if (!this.state.data.length) {
          this.htmlTag.innerHTML = '검색결과가 없습니다';
        } else {
          this.htmlTag.innerHTML = this.state.data
            .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
            .join('');
        }
      } else {
        this.htmlTag.innerHTML = 'Error! 다시 시도해 주세요';
      }
    }
  }
}
