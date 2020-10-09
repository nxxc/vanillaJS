export default class SearchRecent {
  constructor($target, initialData) {
    this.data = initialData;
    this.recentWords = document.createElement('div');

    $target.appendChild(this.recentWords);

    this.render();
  }
  setState = (nextData) => {
    console.log(this.data);
    this.data = nextData;
    this.render();
  };

  render = () => {
    this.recentWords.innerHTML = this.data
      .reverse()
      .map((word) => `<word>${word}</word>`)
      .join('');
  };
}
