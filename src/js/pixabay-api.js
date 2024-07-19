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




