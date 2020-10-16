const ImageTemplate = (
  cat,
  idx,
  className
) => `<article class="${className}" data-id ="${idx}">
  <img src="${className === 'random__banner--item' ? cat.url : ''}" 
  alt="${cat.name}" data-id="${cat.id}" title="${
  cat.name
}" class="image" data-src="${cat.url}"/>
  </article>`;

export default ImageTemplate;
