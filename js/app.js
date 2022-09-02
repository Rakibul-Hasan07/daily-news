const loadCaregory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (data) => {
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');
    data.forEach(newsData => {
        console.log(newsData);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerText = newsData.category_name;
        categoryContainer.appendChild(categoryDiv);
    })
    
}
loadCaregory();