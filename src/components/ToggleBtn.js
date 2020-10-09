export default class ToggleBtn {
  constructor($target) {
    console.log('this is ToggleBtn');
    this.btn = document.createElement('button');
    this.btn.classList.add('toggle-btn');
    this.btn.innerHTML = 'toggle!';
    this.btn.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('dark');
    });
    $target.appendChild(this.btn);
  }
}
