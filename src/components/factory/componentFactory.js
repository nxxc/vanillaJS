export class StatelessComponent {
  constructor(props) {
    this.props = props;
    this.target = props.target;
    this.htmlTag = document.createElement(props.tag);
    this.htmlTag.className = props.className;
    this.target.appendChild(this.htmlTag);
  }
  classSelector = (className) => {
    const styleSheet = document.styleSheets[0];
    const cssRulesArr = Array.from(styleSheet.cssRules);
    for (const rule of cssRulesArr) {
      if (rule.selectorText === className) {
        return rule;
      }
    }
  };
}

export class StateComponent extends StatelessComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
