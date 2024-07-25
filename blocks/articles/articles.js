import ffetch from '../../scripts/ffetch.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const articles = await ffetch('/magazine/query-index.json').all();
  articles.forEach((article) => {
      const articleBlock = document.createElement('div');
      articleBlock.innerHTML = `
    <div class="card">
        <div class="card-thumb">
            ${createOptimizedPicture(article.image, article.title, false, [{ width: '800' }]).innerHTML}
        </div>
        <div class="card-caption">
            <h3>${article.title}</h3>
            <p class="card-description">${article.description}</p>
            <p class="button-container">
                <a href="${article.path}" aria-label="Read More" class="button primary">Read More</a>
            </p>
        </div>
    </div>`;
      block.appendChild(articleBlock);
  });
}
