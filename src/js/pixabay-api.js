import axios from 'axios';

export function getPicturesByQuery({
  query = '',
  page = 1,
  per_page = 15,
} = {}) {
  const apiKey = '44869216-4addd85d29d39c45ae242764b'; // Ваш API ключ
  const FullURL = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return axios
    .get(FullURL, { params: { page, per_page } })
    .then(({ data }) => data);
}



// import { formInput, showLoader } from '../main';

// export function getPicturesByQuery() {
//   const query = formInput.value;
//   console.log(query);
//   const API_KEY = '44869216-4addd85d29d39c45ae242764b';
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(res => {
    
//     console.log(res);

   
//     if (!res.ok) {
//       throw new Error(res.status); 
//     }

   
//     return res.json();
//   });
