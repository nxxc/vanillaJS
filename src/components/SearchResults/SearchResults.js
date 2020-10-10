import imageTemplate from '../templates/imageTemplate.js';
export default class SearchResults {
  constructor($target, initialState, onClick) {
    this.state = {
      ...initialState,
      isLoading: false,
    };
    this.onClick = onClick;

    this.results = document.createElement('section');
    this.results.className = 'results';
    $target.appendChild(this.results);

    this.results.addEventListener('click', (e) => {
      if (e.target.nodeName !== 'IMG') return;
      this.onClick(e.target.dataset.id);
      console.log(e.target.dataset.id);
    });
    this.render();
  }
  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.render();
  }

  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    if (this.state.isLoading) {
      this.results.innerHTML = 'loading.....';
      return;
    }
    if (!this.state.isError) {
      if (!this.state.data.length) {
        console.log('검색결과 없음');
        this.results.innerHTML = '검색결과가 없습니다';
      } else {
        this.results.innerHTML = this.state.data
          .map((cat, idx) => imageTemplate(cat, idx, 'results__item'))
          .join('');
      }
    } else {
      console.log(this.state);
      this.results.innerHTML = 'Error! 다시 시도해 주세요';
    }
  }
}
