const imageTemplate = (
  cat,
  idx
) => `<article class="results__item" data-id =${idx}>
<img src=${cat.url} alt=${cat.name}  data-id=${cat.id} title=${cat.name}/>
</article>`;

export default class SearchResults {
  constructor($target, initialData, onClick) {
    this.data = initialData;
    this.onClick = onClick;

    this.results = document.createElement('section');
    this.results.className = 'results';
    $target.appendChild(this.results);

    this.results.addEventListener('click', (e) => {
      if (e.target.nodeName !== 'IMG') return;
      this.onClick(e.target.dataset.id);
      console.log(e.target.dataset.id);
    });
    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    console.log(this.data);
    this.render();
  }

  // handleClick(e){
  //   if(e.target.name)
  // }
  render() {
    this.results.innerHTML = this.data
      .map((cat, idx) => imageTemplate(cat, idx))
      .join('');
  }
}
