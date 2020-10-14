import { StateComponent } from '../factory/componentFactory.js';
import imageDetailTemplate from '../templates/imageDetailTemplate.js';

export default class ImageInfo extends StateComponent {
  constructor(props) {
    super(props);
    this.htmlTag.addEventListener('click', this.closePopup);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closePopup;
      }
    });
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
    if (!this.state.visible) return;
    if (this.state.isLoading) {
      this.htmlTag.style.display = 'block';
      this.htmlTag.innerHTML = imageDetailTemplate(this.state);
    } else {
      if (this.state.isError) {
        this.htmlTag.style.display = 'none';
      } else if (!this.state.isError) {
        this.htmlTag.innerHTML = imageDetailTemplate(this.state);
      }
    }
  }
}
