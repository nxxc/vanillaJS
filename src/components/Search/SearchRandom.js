export default class SearchRandom {
  constructor($target, onClick) {
    this.onClick = onClick;
    this.randomBtn = document.createElement('button');
    this.randomBtn.setAttribute('class', 'search__random');
    this.randomBtn.innerHTML = '랜덤';
    this.randomBtn.addEventListener('click', this.onClick);

    $target.appendChild(this.randomBtn);
  }
}
