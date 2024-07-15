import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44869216-4addd85d29d39c45ae242764b';

export async function getPicturesByQuery(imageName, page = 1) {
  const params = {
    key: API_KEY,
    q: imageName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
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
