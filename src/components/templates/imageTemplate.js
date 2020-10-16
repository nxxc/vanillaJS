const ImageTemplate = (
  cat,
  idx,
  className
) => `<article class="${className}" data-id ="${idx}">
  <img src="" alt="${cat.name}" data-id="${cat.id}" title="${cat.name}"
   class="image" data-src="${cat.url}"/> </article>`;
export default ImageTemplate;
