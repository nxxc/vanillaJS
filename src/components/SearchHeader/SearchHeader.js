import fetchAPI from '../../utils/api.js';
import { StatelessComponent } from '../factory/componentFactory.js';
import SearchInput from './SearchInput.js';
import SearchRandomBtn from './SearchRandomBtn.js';
import ToggleDarkBtn from './ToggleDarkBtn.js';
import { htmlTag, classNames } from '../../share/html.js';

export default class SearchHeader extends StatelessComponent {
  constructor(props) {
    super(props);

    this.toggleBtn = new ToggleDarkBtn({
      target: this.htmlTag,
      tag: htmlTag.button,
      className: classNames.SearchHeader.toggleBtn,
      onClick: this.toggleDarkMode,
    });

    this.input = new SearchInput({
      target: this.htmlTag,
      tag: htmlTag.input,
      className: classNames.SearchHeader.input,
      onSearch: this.searchData,
      setRecentWords: this.props.setRecentWords,
    });

    this.randomBtn = new SearchRandomBtn({
      target: this.htmlTag,
      tag: htmlTag.button,
      className: classNames.SearchHeader.randomBtn,
      onClick: this.searchRandomCats,
    });
  }

  toggleDarkMode = () => {
    document.querySelector('body').classList.toggle('dark');
  };

  searchData = async (keyword) => {
    this.props.setCurrentData({
      isLoading: true,
    });
    const res = await fetchAPI.getCats(keyword);
    this.props.setCurrentData({
      isLoading: false,
      ...res,
    });
  };

  searchRandomCats = async () => {
    this.props.setRandomCats({
      isLoading: true,
    });
    const res = await fetchAPI.getRandomCats();
    this.props.setRandomCats({
      isLoading: false,
      ...res,
    });
    this.setRightToZero();
  };

  setRightToZero = () => {
    const itemClass = this.cssPropertySelector(
      `.${classNames.RandomSection.imageArticle}`
    );
    itemClass.style.right = '0px';
  };
}
