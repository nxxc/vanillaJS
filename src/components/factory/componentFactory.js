export class StatelessComponent {
  constructor(target, tag, className) {
    this.htmlTag = document.createElement(tag);
    this.htmlTag.className = className;

    target.appendChild(this.htmlTag);
  }
}

export class StateComponent extends StatelessComponent {
  constructor(target, tag, className, initialState) {
    super(target, tag, className);
    this.state = initialState;
  }
  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.render();
  }
  render() {}
}

export default class ImageSection extends StateComponent {
  constructor(target, tag, className, initialState, onClick) {
    super(target, tag, className, initialState);
    this.state = {
      ...this.state,
      isLoading: false,
    };
    this.onClick = onClick;

    this.htmlTag.addEventListener('click', this.handleClick);

    this.render();
  }
  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  handleClick = (e) => {
    if (e.target.nodeName !== 'IMG') return;
    this.onClick && this.onClick(e.target.dataset.id);
  };
}

export class CustomBtn extends StatelessComponent {
  constructor(target, className, onClick) {
    super(target, 'button', className);
    this.htmlTag.addEventListener('click', onClick);
  }
}
