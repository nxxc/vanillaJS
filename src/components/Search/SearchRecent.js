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
      .sort((a, b) => b[1] - a[1])
      .map(([word, time]) => `<word>${word}</word>`)
      .join('');
  };
}
