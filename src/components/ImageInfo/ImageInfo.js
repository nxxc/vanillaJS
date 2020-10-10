import imageDetailTemplate from '../templates/imageDetailTemplate.js';

export default class ImageInfo {
  constructor($target) {
    this.state = {
      visible: false,
      data: [],
      isLoading: false,
    };

    this.imagePopup = document.createElement('div');
    this.imagePopup.setAttribute('class', 'popup');
    $target.appendChild(this.imagePopup);
  }

  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.render();
  }

  render() {
    if (this.state.visible) {
      this.imagePopup.style.display = 'block';
    }
    this.imagePopup.innerHTML = imageDetailTemplate(this.state.data);
  }
}
