export class StatelessComponent {
  constructor(props) {
    this.props = props;
    this.target = props.target;
    this.htmlTag = document.createElement(props.tag);
    this.htmlTag.className = props.className;
    this.target.appendChild(this.htmlTag);
  }
}

export class StateComponent extends StatelessComponent {
  constructor(props) {
    super(props);
    this.state = props.initialState;
    this.render();
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

export class ImageSection extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      isLoading: false,
    };
    this.onClick = props.onClick;

    this.htmlTag.addEventListener('click', this.handleClick);
  }
  handleClick = (e) => {
    if (e.target.nodeName !== 'IMG') return;
    this.onClick && this.onClick(e.target.dataset.id);
  };
}

export class CustomBtn extends StatelessComponent {
  constructor(props) {
    super(props);
    this.htmlTag.addEventListener('click', props.onClick);
  }
}
