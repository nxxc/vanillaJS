import imageDetailTemplate from '../templates/imageDetailTemplate.js';
import loadingImageDetailTemplate from '../templates/loadingImageDetailTemplate.js';

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
    console.log(this.state);
    this.render();
  }

  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    if (this.state.isLoading) {
      this.imagePopup.style.display = 'block';
      this.imagePopup.innerHTML = loadingImageDetailTemplate();
    } else {
      // if (this.state.visible) {
      //   this.imagePopup.style.display = 'block';
      // }
      if (this.state.isError) {
        this.imagePopup.style.display = 'none';
        // alert('다시 시도해 주세요');
      } else {
        this.imagePopup.innerHTML = imageDetailTemplate(this.state.data);
      }
    }
  }
}
