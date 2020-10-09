const imageDetailTemplate = ({ name, url, temperament, origin }) => `
<div class="popup__content-wrapper">
<div class="popup__title">
  <span>${name}</span>
  <div class="popup__close">x</div>
</div>
<img src="${url}" alt="${name}"/>        
<div class="popup__description">
  <div>성격: ${temperament}</div>
  <div>태생: ${origin}</div>
</div>
</div>`;

export default class ImageInfo {
  constructor($target) {
    console.log('im img');
    this.state = {
      visible: false,
      data: [],
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
