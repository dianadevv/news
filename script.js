let data = null; 
const mainNewsContainer = document.querySelector('.articles__big-culumn');
const smollNewsContainer = document.querySelector('.articles__small-culumn');

const escapeString = ( str ) => {
    const simbols = {
        '>': '&gt;',
        '<': '&lt;',
        '&': '&amp;',
    }

    return str.replace(/[><&]/g, (tag) => {
        return simbols[tag] || tag;
    })
};

const createMainNewsItem = (item) => {
    return `
    <article class="main-article">
        <div class="main-article__image-container">
            <img src="${encodeURI(item.image)}" alt="@" class="main-article__image">
        </div>
        <div class="main-article__content">
            <span class="article-category main-article__category">${escapeString(data.categories.find(categoryItem => categoryItem.id === item.category_id).name)}</span>
            <h2 class="main-article__title">${escapeString(item.title)}</h2>
            <p class="main-article__text">${escapeString(item.description)}</p>
            <span class="main-article__source article-source">${escapeString(data.sources.find(sourceItem => sourceItem.id === item.source_id).name)}</span>
        </div>
    </article>
    `
}

const createSmollNewsItem = (item) => {
    return `
    <article class="smoll-article">
        <h2 class="smoll-article__title">${escapeString(item.title)}</h2>
        <p class="smoll-article__caption">
            <span class="smoll-article__date article-date">${escapeString(new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric'}))}</span>
            <span class="smoll-article__source article-source">${escapeString(data.sources.find(sourceItem => sourceItem.id === item.source_id).name)}</span>
        </p>
    </article>
    `
}

const renderNews = (categoryId) => {
    fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
        .then(response => response.json())
        .then( (responseData) => {
            data = responseData;

            const mainNews = data.items.slice(0,3);
            const smollNews = data.items.slice(3);

            mainNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createMainNewsItem(item);
                mainNewsContainer.appendChild(template.content); 
            });

            smollNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createSmollNewsItem(item)
                smollNewsContainer.appendChild(template.content);
            });
        })
}


