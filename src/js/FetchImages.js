import axios from 'axios';

export class FetchImages {
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;

  async getImages() {
    const url = `https://pixabay.com/api/?key=30605118-54820a4d2e3a7aef14eca812a&q=${
      this.#searchQuery
    }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
      this.#perPage
    }&page=${this.#page}`;
    const { data } = await axios.get(url);
    return data;
  }

  set searchQuery(newQuery) {
    this.#searchQuery = newQuery;
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / 40);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }

  resetPage() {
    this.#page = 1;
  }
}
