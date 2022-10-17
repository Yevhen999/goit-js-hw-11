import { refs } from './js/refs';
import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchImages } from './js/FetchImages';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const fetchImages = new FetchImages();
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionData: 'alt',
});
const handleSubmit = async event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    clearPage();
    return;
  }

  fetchImages.searchQuery = query;
  clearPage();

  try {
    const { hits, total, totalHits } = await fetchImages.getImages();

    const markup = createMarkup(hits);
    refs.galleryRef.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    fetchImages.calculateTotalPages(total);
    if (total === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`We found ${totalHits} images`);
    if (fetchImages.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(`${error.message}`);
  }
};

const onLoadMore = async () => {
  fetchImages.incrementPage();
  if (!fetchImages.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  try {
    const { hits } = await fetchImages.getImages();
    const markup = createMarkup(hits);
    refs.galleryRef.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(`${error.message}`);
  }
};

refs.searchBtnRef.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
  fetchImages.resetPage();
  refs.galleryRef.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
