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



// export function showImages(arr) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         `<li class="gallery-item">
//         <a class="gallery-link"
//         href="${largeImageURL}"> 
//         <img class="gallery-image"
//         src="${webformatURL}" 
//         alt="${tags}  
//         width="360" 
//         height="200""/>
//         </a>
//         <ul class = "gallery">
//           <li>
//             <h3>likes</h3>
//             <p>${likes}</p>
//           </li>
//           <li>
//             <h3>views</h3>
//             <p>${views}</p>
//           </li>
//           <li>
//             <h3>comments</h3>
//             <p>${comments}</p>
//           </li>
//           <li>
//             <h3>downloads</h3>
//             <p>${downloads}</p>
//           </li>
//         </ul>
      
//       </li>`;
//       }
//     )
//     .join('');
  
// }