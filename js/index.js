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
    const main = document.querySelector('#main');

    // Find and remove any existing paragraphs.
    const paragraphs = document.querySelectorAll('p');
    if (paragraphs.length > 0) {
        paragraphs.forEach(function (paragraph) {
            paragraph.remove();
        });
    }

    const paragraph = document.createElement('p');
    paragraph.innerHTML = quote;
    main.appendChild(paragraph);
}

function buildCategoryList(categoryList) {
    // Filter out the 'explicit', 'celebrity', and 'animal' categories
    const filteredList = categoryList.filter(function (category) {
        if (category !== 'explicit' && category !== 'celebrity' && category !== 'animal') {
            return category;
        }
    });

    const form = document.querySelector('#changeQuote');
    const categorySelect = document.createElement('select');
    filteredList.map(function (category) {
        const categoryOption = document.createElement('option');
        categoryOption.value = category;
        categoryOption.text = category;
        categorySelect.appendChild(categoryOption);
    });
    form.appendChild(categorySelect);

    categorySelect.addEventListener('change', function (event) {
        getQuote(event.target.value);
    })
}

getCategories();
getQuote('career');