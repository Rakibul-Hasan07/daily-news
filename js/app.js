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
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
    <div class="m-8">
        <div class="card card-side bg-base-100 shadow-xl">
                <figure><img src="${news.thumbnail_url}" class="w-80 h-80 rounded-xl ml-10" alt="Movie"></figure>
            <div class="card-body pl-10">
                <h2 class="card-title font-bold text-xl pt-10">${news.title}</h2>
                <p class=" text-xl">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>
                <div class="card-actions flex justify-between">
                <div class="">
                <div class="w-20 flex">
                <img class="rounded-full" src="${news.author.img}"/>
                <p class="px-10 text-2xl font-bold">${news.author.name ? news.author.name : 'No Author'}</p>
                 </div>
                </div>
                 <div class="flex align-center">
                 <i class="fa-regular fa-eye fa-2xl"></i>
                 <h3 class="px-6 font-bold text-2xl ">${news.total_view ? news.total_view + 'K' : '00'}</h3>
                 </div>
                 <div>
                 <i class="fa-regular fa-star fa-2xl"></i>
                 <i class="fa-regular fa-star fa-2xl"></i>
                 <i class="fa-regular fa-star fa-2xl"></i>
                 <i class="fa-regular fa-star fa-2xl"></i>
                 <i class="fa-regular fa-star fa-2xl"></i>
                 </div>
                <div>
                 <label for="my-modal-3" class="btn modal-button btn-primary" onclick="modalData('${news._id}')">Show Details</label>
                </div>
                </div>
            </div>
        </div>
    </div>

        `;
        displayNews.appendChild(newsDiv);
        // <a href="#my-modal-2" class="btn">open modal</a>
    })
}

const modalData = (idNews) => {
    const url = `https://openapi.programming-hero.com/api/news/${idNews}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayModal(data.data[0]))
}

const displayModal = (modalData) => {
    console.log(modalData);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    <p class="py-4">${modalData.details.length > 300 ? modalData.details.slice(0, 200) + '...' : modalData.details}</p>
    <img src="${modalData.image_url}"/>
    `;
    modalContainer.appendChild(modalDiv);
}
loadCaregory();