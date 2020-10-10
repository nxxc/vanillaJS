import imageTemplate from '../templates/imageTemplate.js';
export default class RandomSlide {
  constructor($target, initialState, onClick) {
    this.state = {
      ...initialState,
      isLoading: false,
    };
    this.onClick = onClick;

    this.banner = document.createElement('section');
    this.banner.className = 'random__banner';
    $target.appendChild(this.banner);

    this.banner.addEventListener('click', (e) => {
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
      this.banner.innerHTML = 'loading.....';
      return;
    }
    if (!this.state.isError) {
      const data = this.state.data.slice(0, 5);
      this.banner.innerHTML = data
        .map((cat, idx) => imageTemplate(cat, idx, 'random__banner--item'))
        .join('');
    } else {
      console.log(this.state);
      this.banner.innerHTML = 'Error! 다시 시도해 주세요';
    }
  }
}
