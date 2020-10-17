import LoadingTemplate from './LoadingTemplate.js';
import { classNames } from '../../share/html.js';

const ImageDetailTemplate = ({ data, isLoading, isError }) => {
  const { name, url, temperament, origin } = data;
  const Loading = ` <div class="${classNames.Popup.wrapper}"> ${LoadingTemplate} </div> `;

  const ErrorTemplate = ` <div class="${classNames.Popup.wrapper}">
                             <p>Error! 다시 시도해 주세요</p> 
                          </div>`;

  const Complete = ` <div class="${classNames.Popup.wrapper}"> 
                        <div class="${classNames.Popup.title}"> 
                          <span>${name}</span> 
                          <div class="${classNames.Popup.closeBtn}">x</div> 
                        </div> 
                        <img src="${url}" alt="${name}" title="${name}"/> 
                        <div class="${classNames.Popup.description}">
                            <div>성격: ${temperament}</div>
                            <div>태생: ${origin}</div>
                        </div> 
                      </div>`;
  return isLoading ? Loading : isError ? ErrorTemplate : Complete;
};

export default ImageDetailTemplate;
