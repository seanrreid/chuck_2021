'use strict';

function getQuote(category) {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    get(url).then(function (response) {
        updateBody(response.value);
    });
}

function getCategories() {
    const url = 'https://api.chucknorris.io/jokes/categories';
    get(url).then(function (response) {
        buildCategoryList(response);
    })
}

function updateBody(quote) {
    const paragraph = document.querySelector('#chuckSays');
    paragraph.innerHTML = quote;
}

function buildCategoryList(categoryList) {
    // Filter out the 'explicit', 'political', and 'religion' categories
    const filteredList = categoryList.filter(function (category) {
        if (category !== 'explicit' && category !== 'political' && category !== 'religion') {
            return category;
        }
    });

    const selectGroup = document.querySelector('#selectGroup');
    const categorySelect = document.createElement('select');
    categorySelect.classList.add('form-select');
    filteredList.map(function (category) {
        const categoryOption = document.createElement('option');
        categoryOption.value = category;
        categoryOption.text = category;
        categorySelect.appendChild(categoryOption);
    });
    selectGroup.appendChild(categorySelect);

    categorySelect.addEventListener('change', function (event) {
        getQuote(event.target.value);
    })
}

getCategories();
getQuote('career');