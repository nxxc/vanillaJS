import { CustomBtn } from '../factory/componentFactory.js';

export default class SearchRandomBtn extends CustomBtn {
  constructor(props) {
    super(props);
    this.htmlTag.innerHTML = '랜덤!';
  }
}
