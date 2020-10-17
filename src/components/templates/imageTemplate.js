import { classNames } from '../../share/html.js';

const ImageTemplate = (cat, idx, className) => `
<article class="${className}" data-id ="${idx}">
  <img src="" alt="${cat.name}" data-id="${cat.id}" title="${cat.name}" class="${classNames.articleImage}" data-src="${cat.url}"/> 
</article>`;
export default ImageTemplate;
