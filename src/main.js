import App from './components/App.js';

new App(document.querySelector('#App'));
window.addEventListener('onchange', (e) => {
  console.log(e);
});
