export const semanticTag = Object.freeze({
  header: 'header',
  section: 'section',
  div: 'div',
  p: 'p',
  button: 'button',
  input: 'input',
  span: 'span',
  article: 'article',
  img: 'img',
});

export const classNames = Object.freeze({
  SearchHeader: {
    root: 'search',
    toggleBtn: 'toggle-btn',
    input: 'search__input',
    randomBtn: 'search__random',
  },
  RecentWords: {
    root: 'recent',
    word: 'recent__word',
  },
  RandomSection: {
    root: 'random',
    randomSlide: 'random__banner',
    prevBtn: 'random__btn--prev',
    nextBtn: 'random__btn--next',
    imageArticle: 'random__banner--item',
  },
  ResultSection: { root: 'results', imageArticle: 'results__item' },
  Popup: {
    root: 'popup',
    wrapper: 'popup__content-wrapper',
    title: 'popup__title',
    closeBtn: 'popup__close',
    description: 'popup__description',
  },
  loading: 'loading',
  fadeIn: 'fade-in',
  fadeOut: 'fade-out',
  articleImage: 'image',
});
