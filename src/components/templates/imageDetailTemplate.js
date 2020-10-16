import LoadingTemplate from './LoadingTemplate.js';

const ImageDetailTemplate = ({ data, isLoading, isError }) => {
  const { name, url, temperament, origin } = data;
  const Loading = ` <div class="popup__content-wrapper"> ${LoadingTemplate} </div> `;

  const ErrorTemplate = ` <div class="popup__content-wrapper">
                             <p>Error! 다시 시도해 주세요</p> 
                          </div>`;

  const Complete = ` <div class="popup__content-wrapper"> 
                        <div class="popup__title"> 
                          <span>${name}</span> 
                          <div class="popup__close">x</div> 
                        </div> 
                        <img src="${url}" alt="${name}" title="${name}"/> 
                        <div class="popup__description">
                            <div>성격: ${temperament}</div>
                            <div>태생: ${origin}</div>
                        </div> 
                      </div>`;
  return isLoading ? Loading : isError ? ErrorTemplate : Complete;
};

export default ImageDetailTemplate;
