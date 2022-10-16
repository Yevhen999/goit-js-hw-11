export function createMarkup(images) {
  return images
    .map(({ largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" width="450" height="250" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}
