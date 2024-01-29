'use strict';
let arrOfMeals = [];
let counter = 0;
let count = 0;

displayMeals('', this);

function displayNone() {
    $('.mealDetails').addClass('d-none');
    $('.inputs').addClass('d-none');
    $('.category').addClass('d-none');
    $('.area').addClass('d-none');
    $('.ingredients').addClass('d-none');
    $('.contact').addClass('d-none');
    $('.homeMeals').addClass('d-none');
    $('.home').addClass('d-none');
}

async function displayMeals(searchFor, element) {
    let req;
    if (count == 0) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFor}`);
        count++;
    }

    if ($(element).hasClass('searchByletter')) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFor}`);
    }

    else if ($(element).hasClass('searchByName')) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFor}`);
    }
    else if ($(element).hasClass('categoryCard')) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchFor}`);
        displayLoadingPage();
    }
    else if ($(element).hasClass('areaCard')) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchFor}`);
        displayLoadingPage();
    }
    else if ($(element).hasClass('IngredientsCard')) {
        req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFor}`);
        displayLoadingPage();
    }

    if (req.status == 200) {

        const finalResult = await req.json();
        arrOfMeals = finalResult.meals;
        let allMeals = arrOfMeals.map((meal) => {
            return `<div id='${meal.idMeal}' class="mealCard col-lg-3 col-md-4 col-sm-6">
            <span class="d-none" ></span>
            <div class="inner overflow-hidden rounded position-relative p-0 mb-3">
                <img src="${meal.strMealThumb}" class="w-100 rounded" alt="burger">
                <h3
                    class="mealDes bg-white bg-opacity-50 fw-bold rounded d-flex align-items-center justify-content-center position-absolute start-0 w-100 h-100">
                    ${meal.strMeal}</h3>
            </div>
        </div>`
        })
        const displayAllMeals = allMeals.reduce(function (x, y) { return x + y });
        $('.homeMeals').html(displayAllMeals);



        $('.mealCard').on('click', async function () {
            const reqNew = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr('id')}`);
            if (reqNew.status == 200) {
                const finalResult = await reqNew.json();
                const mealDetails = finalResult.meals;
                const displayMealDetails = `
                <div class="col-md-5">
                    <div class="inner">
                        <img src="${mealDetails[0].strMealThumb}" class="w-100 rounded" alt="meal">
                        <h4 class="text-capitalize py-2 text-white">${mealDetails[0].strMeal}</h4>
                    </div>
                </div> 
                <div class="col-md-7">
                    <div class="inner">
                        <h2 class="text-capitalize text-white">Instructions</h2>
                        <p class="text-white fs-6">${mealDetails[0].strInstructions}</p>
                        <ul class="list-unstyled text-white">
                            <li class="h3 my-2 text-capitalize mb-3"><span class="fw-bolder">area:</span> ${mealDetails[0].strArea}</li>
                            <li class="h3 my-2 text-capitalize mb-3"><span class="fw-bolder">category:</span> ${mealDetails[0].strCategory}</li>
                            <li class=""><span class="fw-bolder h3 my-2 text-capitalize mb-3">recipes:</span>
                                <div class="recipes my-4 text-dark">                
                                    ${mealDetails[0].strIngredient1 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure1} ${mealDetails[0].strIngredient1}</span>` : ''}
                                    ${mealDetails[0].strIngredient2 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure2} ${mealDetails[0].strIngredient2}</span>` : ''}
                                    ${mealDetails[0].strIngredient3 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure3} ${mealDetails[0].strIngredient3}</span>` : ''}
                                    ${mealDetails[0].strIngredient4 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure4} ${mealDetails[0].strIngredient4}</span>` : ''}
                                    ${mealDetails[0].strIngredient5 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure5} ${mealDetails[0].strIngredient5}</span>` : ''}
                                    ${mealDetails[0].strIngredient6 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure6} ${mealDetails[0].strIngredient6}</span>` : ''}
                                    ${mealDetails[0].strIngredient7 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure7} ${mealDetails[0].strIngredient7}</span>` : ''}
                                    ${mealDetails[0].strIngredient8 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure8} ${mealDetails[0].strIngredient8}</span>` : ''}
                                    ${mealDetails[0].strIngredient9 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure9} ${mealDetails[0].strIngredient9}</span>` : ''}
                                    ${mealDetails[0].strIngredient10 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure10} ${mealDetails[0].strIngredient10}</span>` : ''}
                                    ${mealDetails[0].strIngredient11 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure11} ${mealDetails[0].strIngredient11}</span>` : ''}
                                    ${mealDetails[0].strIngredient12 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure12} ${mealDetails[0].strIngredient12}</span>` : ''}
                                    ${mealDetails[0].strIngredient13 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure13} ${mealDetails[0].strIngredient13}</span>` : ''}
                                    ${mealDetails[0].strIngredient14 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure14} ${mealDetails[0].strIngredient14}</span>` : ''}
                                    ${mealDetails[0].strIngredient15 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure15} ${mealDetails[0].strIngredient15}</span>` : ''}
                                    ${mealDetails[0].strIngredient16 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure16} ${mealDetails[0].strIngredient16}</span>` : ''}
                                    ${mealDetails[0].strIngredient17 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure17} ${mealDetails[0].strIngredient17}</span>` : ''}
                                    ${mealDetails[0].strIngredient18 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure18} ${mealDetails[0].strIngredient18}</span>` : ''}
                                    ${mealDetails[0].strIngredient19 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure19} ${mealDetails[0].strIngredient19}</span>` : ''}
                                    ${mealDetails[0].strIngredient20 != '' ? `<span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strMeasure20} ${mealDetails[0].strIngredient20}</span>` : ''}
                                </div>
                            </li>
                            <li><span class="fw-bolder h3 my-2 text-capitalize">tags:</span>
                                <div class="tags my-4 text-dark">
                                    <span class="bg-light-subtle p-2 m-1 d-inline-block rounded">${mealDetails[0].strTags}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="btns">
                            ${mealDetails[0].strSource != null ? `<a href="${mealDetails[0].strSource}" target="_blank" class="btn btn-success me-2 text-capitalize fw-bold">source</a>` : ''};
                            ${mealDetails[0].strYoutube != null ? `<a href="${mealDetails[0].strYoutube}" target="_blank" class="btn btn-danger me-2 text-capitalize fw-bold">YouTube</a>` : ''};
                        </div>
                    </div>
                `
                $('.mealDetails .row').html(displayMealDetails);
            }

            $('.mealDetails').removeClass('d-none');
            $('.home').addClass('d-none');
            $('.search').addClass('d-none');
            $('.category').addClass('d-none');
            $('.ingredients').addClass('d-none');
            $('.area').addClass('d-none');
            $('.contact').addClass('d-none');
            closeSideBar();

        })

        removeLoadingPage();
    }
}

async function displayCategories() {
    displayLoadingPage();
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if (req.status == 200) {
        const finalResult = await req.json();
        const arrOfCategories = finalResult.categories;
        let allCatregory = arrOfCategories.map((cat) => {
            return `
            <div idMeal="${cat.strCategory}" class="categoryCard col-md-3">
                <div class="inner overflow-hidden rounded position-relative p-0 mb-3">
                    <img src="${cat.strCategoryThumb}" class="w-100 rounded" alt="burger">
                    <div
                        class="mealDes overflow-hidden bg-white bg-opacity-50 fw-bold rounded d-flex flex-column align-items-center justify-content-center position-absolute start-0 w-100 h-100">
                        <h4 class="fw-bold">${cat.strCategory}</h4>
                        <p class="fs-6 fw-normal px-3 text-center">${cat.strCategoryDescription}</p>
                    </div>
                </div>
            </div>
            `
        })
        $('.category .row').html(allCatregory);

        $('.categoryCard').on('click', function () {
            displayNone();
            $('.home').removeClass('d-none');
            $('.homeMeals').removeClass('d-none');
            displayMeals($(this).attr('idMeal'), this);
            closeSideBar();
        })
        removeLoadingPage();
    }
}

async function displayAreas() {
    displayLoadingPage();
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if (req.status == 200) {
        const response = await req.json();
        const arrOfAreas = response.meals;
        const allAreas = arrOfAreas.map((area) => {
            return `
            <div idArea='${area.strArea}' class="areaCard  col-lg-3 col-md-4 col-sm-6">
                    <div
                        class="text-white inner d-flex flex-column justify-content-center align-items-center rounded position-relative p-3 mb-3">
                        <i class="iconArea fa-solid fa-bell-concierge text-center"></i>
                        <h4 class="fw-bold">${area.strArea}</h4>
                    </div>
                </div>

            `
        })
        const arrOfDisplayAreas = allAreas.reduce(function (x, y) { return x + y });
        $('.area .row').html(arrOfDisplayAreas);

        $('.areaCard').on('click', function () {
            displayMeals($(this).attr('idArea'), this);
            displayNone();
            $('.home').removeClass('d-none');
            $('.homeMeals').removeClass('d-none');
        })
        removeLoadingPage();
    }

}

async function displayIngredients() {
    displayLoadingPage();
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    if (req.status == 200) {
        const response = await req.json();
        const arrOfIngredients = response.meals;
        const allIngredients = arrOfIngredients.map((ingredient) => {
            return `
            <div idIngredient='${ingredient.strIngredient}' class="col-sm-6 IngredientsCard overflow-hidden col-lg-3 col-md-4">
            <div
                class="inner position-relative overflow-hidden rounded text-center d-flex flex-column justify-content-center align-items-center rounded position-relative mb-3">
                <img class="w-100" src="https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png" alt="meal">
                <div class="content bg-white rounded bg-opacity-50 position-absolute start-0 text-center p-3">
                <h4 class="fw-bold">${ingredient.strIngredient}</h4>
                <p class="overflow-hidden">${ingredient.strDescription != null ? ingredient.strDescription : ''}</p>
                </div>
            </div>
        </div>
    `
        })
        $('.ingredients .row').html(allIngredients);
        $('.IngredientsCard').on('click', function () {
            displayMeals($(this).attr('idIngredient'), this);
            displayNone();
            $('.home').removeClass('d-none');
            $('.homeMeals').removeClass('d-none');
        })
        removeLoadingPage();
    }
}

$('.logo').on('click', function () {
    displayNone();
    $('.homeMeals').removeClass('d-none');
    $('.home').removeClass('d-none');
    closeSideBar();

})

$('.searchList').on('click', function () {
    displayNone();
    $('.home').removeClass('d-none');
    $('.inputs').removeClass('d-none');
    closeSideBar();
})

$('.categoryList').on('click', function () {
    displayNone();
    displayCategories();
    $('.category').removeClass('d-none');
    closeSideBar();
})

$('.areaList').on('click', function () {
    displayAreas();
    displayNone();
    $('.area').removeClass('d-none');
    closeSideBar();
})

$('.IngredientsList').on('click', function () {
    displayIngredients();
    displayNone();
    $('.ingredients').removeClass('d-none');
    closeSideBar();
})

$('.contactList').on('click', function () {
    displayNone();
    $('.contact').removeClass('d-none');
    closeSideBar();
})

$('.home .inputs input').on('keyup', function () {
    $('.homeMeals').removeClass('d-none');
    displayMeals($(this).val(), this);
})


//^ START SIDE BAR
function closeSideBar() {
    $('header').animate({ left: $('.leftSideBar').innerWidth() * -1 });
    $('.fa-xmark').addClass('d-none');
    $('.fa-bars').removeClass('d-none');
}

$('header').animate({ left: $('.leftSideBar').innerWidth() * - 1 });

$('.fa-xmark').on('click', closeSideBar);

$('.fa-bars').on('click', function () {
    $('header').animate({ left: 0 });
    $('header .leftSideBar li').slideDown(1000);
    $(this).addClass('d-none');
    $('.fa-xmark').removeClass('d-none');
})
//^ END SIDE BAR


//* START CONTACT SECTION
const regexName = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhone = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const regexAge = /^(?:[4-9]|[1-8][0-9]|90)$/;
const regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@_$!%*?&])[A-Za-z\d@_$!%*?&]{8,}$/;

$('.contact input').on('keyup', function () {
    if ($(this).hasClass('fName')) {
        if (regexName.test($(this).val())) $('.nameError').addClass('d-none');
        else $('.nameError').removeClass('d-none');
    }

    else if ($(this).hasClass('mail')) {
        if (regexMail.test($(this).val())) $('.mailError').addClass('d-none');
        else $('.mailError').removeClass('d-none');
    }

    else if ($(this).hasClass('phone')) {
        if (regexPhone.test($(this).val())) $('.phoneError').addClass('d-none');
        else $('.phoneError').removeClass('d-none');
    }

    else if ($(this).hasClass('age')) {
        if (regexAge.test($(this).val())) $('.ageError').addClass('d-none');
        else $('.ageError').removeClass('d-none');
    }

    else if ($(this).hasClass('pass')) {
        if (regexPass.test($(this).val())) {
            $('.passError').addClass('d-none');
            if ($('.rePass').val() != '') {
                if ($('.rePass').val() == $('.pass').val()) $('.rePassError').addClass('d-none');
                else $('.rePassError').removeClass('d-none');
            }
        }
        else $('.passError').removeClass('d-none');
    }

    else if ($(this).hasClass('rePass')) {
        if ($(this).val() == $('.pass').val()) $('.rePassError').addClass('d-none');
        else $('.rePassError').removeClass('d-none');
    }

})
//* END CONTACT SECTION


//^ START LOADING PAGE
function displayLoadingPage() {
    $('.loading').fadeIn(0, function () {
        $('.spinner').fadeIn(0);
    })
}

let firstLogIn = true;
function removeLoadingPage() {
    $('.spinner').fadeOut(1000, function () {
        $('.loading').fadeOut(500);
        if (firstLogIn) {
            $('.home').removeClass('d-none');
        }
        firstLogIn = false;
    })
}
//^ END LOADING PAGE