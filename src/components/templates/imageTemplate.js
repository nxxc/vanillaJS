const imageTemplate = (
  cat,
  idx,
  className
) => `<article class=${className} data-id =${idx}>
  <img src=${cat.url} alt=${cat.name}  data-id=${cat.id} title=${cat.name} />
  </article>`;

export default imageTemplate;
