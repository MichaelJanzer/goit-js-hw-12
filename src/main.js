import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getPicturesByQuery  } from './js/pixabay-api.js';
import { imageTemplate } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const imageGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
imageGallery.parentNode.insertBefore(loadMoreBtn, imageGallery.nextSibling);
loadMoreBtn.style.display = 'none';
const loaderContainer = document.createElement('div');
loaderContainer.appendChild(loader);
loadMoreBtn.parentNode.insertBefore(loaderContainer, loadMoreBtn.nextSibling);

let imageName = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('input', (event) => {
  imageName = event.target.value.trim();
});

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  imageGallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  showLoader();

  if (!imageName) {
    showInfoMessage('Please enter a search query!', 'blue');
    hideLoader();
    return;
  }

  try {
    const data = await getPicturesByQuery (imageName, currentPage);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      showInfoMessage('Sorry, there are no images matching your search query. Please try again!', 'red');
      return;
    }

    renderImages(data.hits);
    lightbox.refresh();
    checkLoadMoreVisibility();
  } catch (error) {
    showInfoMessage('An error occurred while fetching images. Please try again later.', 'orange');
    console.error(error);
  } finally {
    hideLoader();
  }

  event.target.reset();
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getPicturesByQuery (imageName, currentPage);
    renderImages(data.hits);
    lightbox.refresh();
    scrollPage();
    checkLoadMoreVisibility();
  } catch (error) {
    showInfoMessage('An error occurred while fetching images. Please try again later.', 'orange');
    console.error(error);
  } finally {
    hideLoader();
  }
}

function renderImages(images) {
  const markup = imageTemplate(images);
  imageGallery.insertAdjacentHTML('beforeend', markup);
}

function checkLoadMoreVisibility() {
  if (currentPage * 15 >= totalHits) {
    loadMoreBtn.style.display = 'none';
    showInfoMessage("We're sorry, but you've reached the end of search results.", 'blue');
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function scrollPage() {
  const { height } = document.querySelector('.gallery-item').getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showInfoMessage(message, bgColor) {
  iziToast.info({
    position: 'topRight',
    timeout: 1800,
    maxWidth: 300,
    icon: 'none',
    message: message,
    backgroundColor: bgColor,
  });
}


let lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });


// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { getPicturesByQuery } from './js/pixabay-api';
// import { showImages } from './js/render-functions';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const searchForm = document.querySelector('.form');
// const gallery = document.querySelector('.gallery');
// const preloader = document.querySelector('.loader-wrap');
// const loadMoreBtn = document.querySelector('.load-more-btn');

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// const params = {
//   query: '',
//   page: 1,
//   per_page: 15,
//   max_page: 0,
// };

// searchForm.addEventListener('submit', handlerSubmit);

// async function handlerSubmit(event) {
//   event.preventDefault();
//   gallery.innerHTML = '';
//   params.page = 1;
//   params.query = searchForm.elements.input.value.trim();
//   loadMoreBtn.style.display = 'none';
//   loadMoreBtn.removeEventListener('click', handlerLoadMore);

//   if (!params.query) {
//     iziToast.warning({
//       title: 'Caution',
//       titleColor: 'white',
//       titleSize: '16px',
//       message: 'Please, fill out the field!',
//       messageColor: 'white',
//       messageSize: '16px',
//       position: 'topRight',
//       backgroundColor: 'rgba(255, 160, 0, 0.6)',
//       close: false,
//       closeOnClick: true,
//     });
//     searchForm.reset();
//     return;
//   }

//   preloader.style.display = 'flex';
//   try {
//     const picture = await getPicturesByQuery(params);
    
//     if (picture.hits.length === 0) {
//       iziToast.error({
//         title: 'Error',
//         titleColor: 'white',
//         titleSize: '16px',
//         message: 'Sorry, there are no images matching your search query. Please try again!',
//         messageColor: 'white',
//         messageSize: '16px',
//         position: 'bottomRight',
//         backgroundColor: 'rgba(239, 64, 64, 0.6)',
//         close: false,
//         closeOnClick: true,
//       });
//     } else {
//       params.max_page = Math.ceil(picture.totalHits / params.per_page);
      
//       if (params.max_page > 1) {
//         loadMoreBtn.style.display = 'block';
//         loadMoreBtn.addEventListener('click', handlerLoadMore);
//       } else {
//         loadMoreBtn.style.display = 'none';
//         iziToast.warning({
//           title: 'Caution',
//           titleColor: 'white',
//           titleSize: '16px',
//           message: 'We are sorry, but you have reached the end of search results.',
//           messageColor: 'white',
//           messageSize: '16px',
//           position: 'bottomCenter',
//           backgroundColor: 'rgba(70, 130, 180, 0.8)',
//           close: false,
//           closeOnClick: true,
//           timeout: 6000,
//         });
//       }
      
//       gallery.innerHTML = showImages(picture.hits);
//       lightbox.refresh();
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       titleColor: 'white',
//       titleSize: '16px',
//       message: `Ups... Something went wrong. Error: ${error}`,
//       messageColor: 'white',
//       messageSize: '16px',
//       position: 'bottomRight',
//       backgroundColor: 'rgba(239, 64, 64, 0.6)',
//       close: false,
//       closeOnClick: true,
//     });
//   } finally {
//     searchForm.reset();
//     preloader.style.display = 'none';
//   }
// }

// async function handlerLoadMore() {
//   params.page += 1;
//   preloader.style.display = 'flex';
//   loadMoreBtn.style.display = 'none';
  
//   try {
//     const picture = await getPicturesByQuery(params);
//     gallery.insertAdjacentHTML('beforeend', showImages(picture.hits));
//     lightbox.refresh();

//     window.scrollBy({
//       top: gallery.lastElementChild.clientHeight * 2,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       titleColor: 'white',
//       titleSize: '16px',
//       message: `Ups... Something went wrong. Error: ${error}`,
//       messageColor: 'white',
//       messageSize: '16px',
//       position: 'bottomRight',
//       backgroundColor: 'rgba(239, 64, 64, 0.6)',
//       close: false,
//       closeOnClick: true,
//     });
//   } finally {
//     preloader.style.display = 'none';
    
//     if (params.page === params.max_page) {
//       loadMoreBtn.style.display = 'none';
//       loadMoreBtn.removeEventListener('click', handlerLoadMore);
      
//       iziToast.warning({
//         title: 'Caution',
//         titleColor: 'white',
//         titleSize: '16px',
//         message: 'We are sorry, but you have reached the end of search results.',
//         messageColor: 'white',
//         messageSize: '16px',
//         position: 'bottomCenter',
//         backgroundColor: 'rgba(70, 130, 180, 0.8)',
//         close: false,
//         closeOnClick: true,
//         timeout: 6000,
//       });
//     } else {
//       loadMoreBtn.style.display = 'block';
//     }
//   }
// }
