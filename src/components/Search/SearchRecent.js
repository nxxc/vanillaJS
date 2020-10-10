export default class SearchRecent {
  constructor($target, initialData) {
    this.data = initialData;
    this.recentWords = document.createElement('p');
    this.recentWords.className = 'search__recent';

    $target.appendChild(this.recentWords);

    this.render();
  }
  setState = (nextData) => {
    console.log(this.data);
    this.data = nextData;
    this.render();
  };

  render = () => {
    this.recentWords.innerHTML = `최근검색어:${this.data
      .sort((a, b) => b[1] - a[1])
      .map(([word, time]) => `<span>${word}</span>`)
      .join('')}
      `;
  };
}
