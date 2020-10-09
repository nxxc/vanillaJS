const imageTemplate = (
  cat,
  idx
) => `<article class="random__banner--item" data-id =${idx}>
<img src=${cat.url} alt=${cat.name}  data-id=${cat.id} title=${cat.name}/>
</article>`;

export default class RandomSlide {
  constructor($target, initialData, onClick) {
    this.data = initialData;
    this.onClick = onClick;
    console.log('im Rs');

    this.banner = document.createElement('section');
    this.banner.className = 'random__banner';

    this.banner.addEventListener('click', (e) => {
      if (e.target.nodeName !== 'IMG') return;
      this.onClick(e.target.dataset.id);
      console.log(e.target.dataset.id);
    });

    $target.appendChild(this.banner);

    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    console.log(this.data);
    this.render();
  }

  render() {
    const data = this.data.slice(0, 5);
    this.banner.innerHTML = data
      .map((cat, idx) => imageTemplate(cat, idx))
      .join('');
  }
}
