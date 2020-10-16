import { StateComponent } from '../factory/componentFactory.js';
import imageDetailTemplate from '../templates/imageDetailTemplate.js';

export default class ImageInfo extends StateComponent {
  constructor(props) {
    super(props);
    this.htmlTag.addEventListener('click', this.closePopup);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.visible) {
        this.htmlTag.classList.remove('fade-in');
        this.htmlTag.classList.add('fade-out');
        this.htmlTag.addEventListener('animationend', this.turnOffDisplay, {
          once: true,
        });
        this.state.visible = false;
      }
    });
  }
  closePopup = (e) => {
    const { className } = e.target;
    const targetClass = ['popup fade-in', 'popup__close'];
    if (targetClass.includes(className)) {
      this.htmlTag.classList.remove('fade-in');
      this.htmlTag.classList.add('fade-out');
      this.htmlTag.addEventListener('animationend', this.turnOffDisplay, {
        once: true,
      });
      this.state.visible = false;
    }
  };
  turnOffDisplay = () => {
    this.htmlTag.style.display = 'none';
  };

  render() {
    if (!this.state.visible) return;
    if (this.state.isLoading) {
      this.htmlTag.classList.remove('fade-out');
      this.htmlTag.classList.add('fade-in');
      this.htmlTag.innerHTML = imageDetailTemplate(this.state);
      this.htmlTag.style.display = 'block';
    } else {
      this.htmlTag.innerHTML = imageDetailTemplate(this.state);
    }
  }
}
