export default class SearchInput {
  constructor($target, onSearch) {
    this.onSearch = onSearch;

    this.searchInput = document.createElement('input');
    this.searchInput.setAttribute('class', 'search');
    this.searchInput.placeholder = '고양이를 검색하세요...';

    this.searchInput.addEventListener('keypress', this.handleInput);
    this.searchInput.addEventListener('focusin', (e) => {
      e.target.value = '';
    });

    $target.appendChild(this.searchInput);
  }

  handleInput = (e) => {
    const {
      key,
      target: { value },
    } = e;
    if (key === 'Enter' && value !== '') {
      this.onSearch(value);
      e.target.value = '';
    }
  };

  render() {}
}
