const loadCaregory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (data) => {
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = '';
    data.forEach(newsData => {
        // console.log(newsData);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick="CategoryNewsId('${newsData.category_id}')">${newsData.category_name}</div>
        `;
        categoryContainer.appendChild(categoryDiv);

    })

}
const spinner = document.getElementById('show-spinner');
const CategoryNewsId = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNews(data.data))
    spinner.classList.remove('hidden')
}
const displayNews = (newsData) => {
    const displayNews = document.getElementById('display-news');
    displayNews.textContent = '';
    const notFound = document.getElementById('no-found')
    // notFound.textContent = '';
    const found = document.getElementById('found');
    found.textContent = '';
    if (newsData.length === 0) {
        notFound.classList.remove('hidden')
        found.classList.add('hidden')
    }
    else{
        notFound.classList.add('hidden')
        found.classList.remove('hidden')
        console.log(newsData.length);
       
        const p = document.createElement('p')
        // p.classList.add('font-bold text-2xl p-6 text-center')
        p.innerText = `${newsData.length} News Are Found`;
        found.appendChild(p);
    }
    newsData.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
    <div class="m-8">
        <div class="card card-side bg-base-100 shadow-xl">
        <img src="${news.thumbnail_url}" class="w-80 h-80 rounded-xl m-10" alt="Movie">
            <div class="card-body pl-10 w-3/4">
                <h2 class="card-title font-bold text-xl pt-10">${news.title}</h2>
                <p class=" text-xl pt-4">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>
                <div class="card-actions flex justify-between items-center">
                <div class="w-20 flex items-center">
                <img class="rounded-full" src="${news.author.img}"/>
                <h3 class="px-10 text-2xl font-bold">${news.author.name ? news.author.name : 'No Data Found'}</h3>
                 </div>
                 <div class="flex items-center">
                 <i class="fa-regular fa-eye fa-2xl"></i>
                 <h3 class="px-6 font-bold text-2xl ">${news.total_view ? news.total_view + 'K' : 'No Data Found'}</h3>
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
    })
    spinner.classList.add('hidden')
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