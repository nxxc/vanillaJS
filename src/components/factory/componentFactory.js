export class StatelessComponent {
  constructor(props) {
    this.htmlTag = document.createElement(props.tag);
    this.htmlTag.className = props.className;
    props.target.appendChild(this.htmlTag);
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

export default class ImageSection extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      isLoading: false,
    };
    this.onClick = props.onClick;

    this.htmlTag.addEventListener('click', this.handleClick);
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
  constructor(props) {
    super(props);
    this.htmlTag.addEventListener('click', props.onClick);
  }
}
