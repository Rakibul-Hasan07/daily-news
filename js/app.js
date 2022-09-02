const loadCaregory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (data) => {
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');
    data.forEach(newsData => {
        // console.log(newsData);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick="CategoryNewsId('${newsData.category_id}')">${newsData.category_name}</div>
        `
        categoryContainer.appendChild(categoryDiv);
    })
}

const CategoryNewsId = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNews(data.data))
}
const displayNews = (newsData) => {
    const displayNews = document.getElementById('display-news');
    displayNews.textContent = '';
    newsData.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
    <div class="m-8">
        <div class="card card-side bg-base-100 shadow-xl">
                <figure><img src="${news.image_url}" class="w-80 h-80 rounded-xl ml-10" alt="Movie"></figure>
            <div class="card-body pl-10">
                <h2 class="card-title font-bold text-xl pt-10">${news.title}</h2>
                <p class=" text-xl">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>
                <div class="card-actions justify-end">
                <div class="w-10">
                <img class="rounded-full" src="${news.author.img}" />
                <p>${news.author.name}</p>
                 </div>
                <button class="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    </div>

        `;
        displayNews.appendChild(newsDiv);
    })
}
loadCaregory();