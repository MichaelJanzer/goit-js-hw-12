export function showImages({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
      </a>
      <ul class="info">
        <li class="info-item"> <b>Likes</b> ${likes} </li>
        <li class="info-item"> <b>Views</b> ${views} </li>
        <li class="info-item"> <b>Comments</b> ${comments} </li>
        <li class="info-item"> <b>Downloads</b> ${downloads} </li>
      </ul>
    </li>
  `;
}

export function imageTemplate(arr) {
  return arr.map(showImages).join('');
}



