let galleryDiv;
let propertiesArr;
//this function will transfer data from homepage to this page
const initialPropertiesGallery = (propertiesArrFromHomePage) => {

    galleryDiv = document.querySelector('.insert-properties-to-gallery');
    updatePropertiesGallery(propertiesArrFromHomePage);
}
/*
    this function will get data from homepage and create new Gallery.
    if the Gallery already exists it will remove the old one and
    create new one
*/
const updatePropertiesGallery = (propertiesArrFromHomePage) => {
    propertiesArr = propertiesArrFromHomePage;
    createGallery();
};

const createItem = (name,image,credit,price) =>{
    return`
    <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card gallery-card bg-dark text-white">
            <img src="${image}" class="card-img-top" alt="${name}">
            <div class="card-body bg-dark">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Credit: ${credit}</p>
            </div>
            <ul class="list-group list-group-flush d-flex bg-dark">
                <li class="list-group-item bg-dark text-white pb-3">Price: ${price}</li>
                <button class="btn cart-button btn-success" type="button"><i class="bi bi-cart-plus cart"></i></button>
            </ul>
        </div>
    </div>
    `
}

const createGallery = () =>{
    let innerString = "";
    for(let property of propertiesArr){
        innerString += createItem(property.name,property.imgUrl,property.credit,property.price);
    }
    galleryDiv.innerHTML = innerString;
}

export {initialPropertiesGallery,updatePropertiesGallery};

