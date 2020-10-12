const imageDetailTemplate = ({ data, isLoading }) => {
  const { name, url, temperament, origin } = data;
  return isLoading
    ? `
  <div class="popup__content-wrapper">
  <div class="popup__title">
    <span>Loading...</span>
    <div class="popup__close">x</div>
  </div>      
  <div class="popup__description">
    <div>성격: loading...</div>
    <div>태생: loading...</div>
  </div>
  </div>`
    : `
  <div class="popup__content-wrapper">
  <div class="popup__title">
    <span>${name}</span>
    <div class="popup__close">x</div>
  </div>
  <img src="${url}" alt="${name}"/>        
  <div class="popup__description">
    <div>성격: ${temperament}</div>
    <div>태생: ${origin}</div>
  </div>
  </div>`;
};
export default imageDetailTemplate;
