import axios from 'axios';

export function getPicturesByQuery({
  query = '',
  page = 1,
  per_page = 15,
} = {}) {
  const FullURL = `https://pixabay.com/api/?key=44869216-4addd85d29d39c45ae242764b=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return axios
    .get(FullURL, { params: { query, page, per_page } })
    .then(({ data }) => data);
}