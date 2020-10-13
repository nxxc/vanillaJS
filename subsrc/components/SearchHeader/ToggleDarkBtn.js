import { CustomBtn } from '../factory/componentFactory.js';

export default class ToggleDarkBtn extends CustomBtn {
  constructor(props) {
    super(props);

    this.htmlTag.innerHTML = 'Dark Mode';
  }
}
