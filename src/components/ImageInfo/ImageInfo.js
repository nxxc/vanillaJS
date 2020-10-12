import imageDetailTemplate from '../templates/imageDetailTemplate.js';

import { StateComponent } from '../factory/componentFactory.js';

export default class ImageInfo extends StateComponent {
  constructor(target, tag, className, initialState) {
    super(...arguments);
  }
  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }
  toggleVisible = (e) => {
    const { className } = e.target;
    const targetClass = ['popup', 'popup__close'];
    if (targetClass.includes(className)) {
      this.htmlTag.style.display = 'none';
    }
  };

  render() {
    if (this.state.isLoading) {
      this.htmlTag.style.display = 'block';
      this.htmlTag.innerHTML = imageDetailTemplate(this.state);
    } else {
      if (this.state.isError) {
        this.htmlTag.style.display = 'none';
      } else {
        this.htmlTag.innerHTML = imageDetailTemplate(this.state);
      }
    }
    this.htmlTag = document.querySelector('.popup');
    this.htmlTag.addEventListener('click', this.toggleVisible);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.toggleVisible;
      }
    });
  }
}
