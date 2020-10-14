import { StateComponent } from '../factory/componentFactory.js';
import imageDetailTemplate from '../templates/imageDetailTemplate.js';

export default class ImageInfo extends StateComponent {
  constructor(props) {
    super(props);
  }
  closePopup = (e) => {
    const { className } = e.target;
    const targetClass = ['popup', 'popup__close'];
    if (targetClass.includes(className)) {
      this.htmlTag.style.display = 'none';
    }
    this.state.visible = !this.state.visible;
  };
  render() {
    console.log(this.state);
    if (this.state.visible) {
      this.htmlTag.style.display = 'block';
      this.htmlTag.innerHTML = imageDetailTemplate({
        data: this.state.data,
        isLoading: false,
      });
    }

    this.htmlTag = document.querySelector('.popup');
    this.htmlTag.addEventListener('click', this.closePopup);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closePopup;
      }
    });
  }
}
