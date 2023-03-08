import {initialPropertiesCarousel,updatePropertiesCarousel} from "../components/propertiesCarousel.js";
import {initialPropertiesGallery,updatePropertiesGallery} from "../components/propertiesGallery.js";
import {initialPropertiesList,updatePropertiesList} from "../components/propertiesList.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";

let homeDisplayCarouselBtn,homeDisplayGalleryBtn,homeDisplayListBtn;
let homeDivCarousel,homeDivGallery,homeDivList;

let homePageSearchBar;
let currentDisplay;

let propertiesArr,originalPropertiesArr;

let isAdmin = checkIfAdmin();


window.addEventListener("load", () =>{
    propertiesArr = localStorage.getItem('props');
    if (!propertiesArr) {
        return;
      }
    propertiesArr = JSON.parse(propertiesArr);
    originalPropertiesArr = [...propertiesArr];
    initialPropertiesCarousel(propertiesArr);
    initialPropertiesGallery(propertiesArr);
    initialPropertiesList(propertiesArr,isAdmin,deleteProperty)
    initializeElements();
    initializeBtns();
})

const initializeElements = () =>{
    //Home Displays Buttons//
    homeDisplayListBtn = document.getElementById("home-display-list");
    homeDisplayGalleryBtn = document.getElementById("home-display-gallery");
    homeDisplayCarouselBtn = document.getElementById("home-display-carousel");

    //Home Displays Divs//
    homeDivGallery = document.getElementById("properties-gallery");
    homeDivList = document.getElementById("properties-list");
    homeDivCarousel = document.getElementById("properties-carousel");
    homePageSearchBar = document.querySelector(".home-page-form-search");

    currentDisplay = homeDivList;
    showCurrentDisplay(currentDisplay);
}

const initializeBtns = () => {
    homeDisplayCarouselBtn.addEventListener('click', ()=> {
        showCurrentDisplay(homeDivCarousel);
    })
    homeDisplayGalleryBtn.addEventListener('click', ()=> {
        showCurrentDisplay(homeDivGallery);
    })
    homeDisplayListBtn.addEventListener('click', ()=> {
        showCurrentDisplay(homeDivList);
    })
    document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => {
      sortPropertys();
    });
    document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => {
      sortPropertys(false);
    });
    document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => {
        let regex = new RegExp("^" + ev.target.value, "i");
        propertiesArr = originalPropertiesArr.filter((item) => {
        let reg = regex.test(item.name);
        return reg;
        });
        updateDisplays();
    });
}

const updateDisplays = () =>{
    updatePropertiesCarousel(propertiesArr);
    updatePropertiesGallery(propertiesArr);
    updatePropertiesList(propertiesArr);
}

function showCurrentDisplay(toDisplay){

    currentDisplay.classList.remove('d-flex');
    currentDisplay.classList.add('d-none');

    toDisplay.classList.remove('d-none');
    toDisplay.classList.add('d-flex');
    currentDisplay = toDisplay;

    // Displayes Search Bar //
    switch (toDisplay){
        case homeDivCarousel:
            homePageSearchBar.classList.remove('d-flex');
            homePageSearchBar.classList.add('d-none');
            break;
        case homeDivGallery:
            homePageSearchBar.classList.remove('d-none');
            homePageSearchBar.classList.add('d-flex');
            break;
        case homeDivList:
            homePageSearchBar.classList.remove('d-none');
            homePageSearchBar.classList.add('d-flex');
            break;
    }
}

const sortPropertys = (asc = true) => {
    if (asc) {
      // from a to z
      propertiesArr.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // from z to a
      propertiesArr.sort((a, b) => b.name.localeCompare(a.name));
    }
    updateDisplays();
};

const deleteProperty = (id) => {
    id = +id; 
    originalPropertiesArr = originalPropertiesArr.filter(
      (item) => item.id !== id
    );
    saveToLocalStorage(originalPropertiesArr);
    propertiesArr = propertiesArr.filter((item) => item.id !== id); //delete property by index
    updateDisplays();
};

const editProperty = () => {
    saveToLocalStorage(originalPropertiesArr);
    updateDisplays(); // update html
};

const saveToLocalStorage = (arrToSave) => {
    localStorage.setItem("props", JSON.stringify(arrToSave));
};