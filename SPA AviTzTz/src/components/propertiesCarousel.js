
let carouselDiv;
let showIndex;
let propertiesArr;
//this function will transfer data from homepage to this page
const initialPropertiesCarousel = (propertiesArrFromHomePage) => {
    carouselDiv = document.querySelector('.img-container');
    updatePropertiesCarousel(propertiesArrFromHomePage);
}

/*
    this function will get data from homepage and create new carousel.
    if the carousel already exists it will remove the old one and
    create new one
*/
const updatePropertiesCarousel = (propertiesArrFromHomePage) => {
    propertiesArr = propertiesArrFromHomePage;
    showIndex = 0;
    if(!propertiesArr){
        return;
    }else{
        initializeBtns();
        createCarousel();
    }
    
};

const initializeBtns = () =>{

    const nextBtn = document.getElementById('next-carusel-btn');
    const backBtn = document.getElementById('back-carusel-btn');

    backBtn.addEventListener("click" , () =>{
        let prevIndex = showIndex - 1;

        if(prevIndex < 0){
            prevIndex = propertiesArr.length - 1;
        }
        let imgToHide = document.querySelector(`.img-container > figure:nth-child(${showIndex + 1}`);
        imgToHide.classList.add("opacity-0")
        
        let imgToShow = document.querySelector(`.img-container > figure:nth-child(${prevIndex + 1}`);
        imgToShow.classList.remove("opacity-0")

        showIndex = prevIndex;
    })
    nextBtn.addEventListener("click" , () =>{
        let nextIndex = showIndex + 1;
        
        if(nextIndex >= propertiesArr.length){
            nextIndex = 0;
        }
        let imgToHide = document.querySelector(`.img-container > figure:nth-child(${showIndex + 1}`);
        imgToHide.classList.add("opacity-0")
        
        let imgToShow = document.querySelector(`.img-container > figure:nth-child(${nextIndex + 1}`);
        imgToShow.classList.remove("opacity-0")

        showIndex = nextIndex;
    })
}

const createlItem = (name,image,credit) =>{
    return`
    <figure class="figure opacity-0">
        <img src="${image}" class="figure-img img-fluid rounded" alt="${name}">
        <figcaption class="figure-caption">Created by ${credit}</figcaption>
    </figure>`
}

const createCarousel = () =>{
    let innerString = "";
    for(let property of propertiesArr){
        innerString += createlItem(property.name,property.imgUrl,property.credit);
    }
    carouselDiv.innerHTML = innerString;
    document.querySelector(".img-container > figure:nth-child(1)")
    .classList.remove("opacity-0");
}

export {initialPropertiesCarousel,updatePropertiesCarousel};