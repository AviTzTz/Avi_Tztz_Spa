
let listDiv;
let propertiesArr;
let isAdmin,deleteProperty;
let deleteBtn,editBtn;
//this function will transfer data from homepage to this page
const initialPropertiesList = (propertiesArrFromHomePage,isAdminParam,deletePropertyFromHomePage) => {
    isAdmin = isAdminParam;
    deleteProperty = deletePropertyFromHomePage;
    listDiv = document.getElementById('properties-list');
    updatePropertiesList(propertiesArrFromHomePage);
}
/*
    this function will get data from homepage and create new List.
    if the List already exists it will remove the old one and
    create new one
*/
const updatePropertiesList = (propertiesArrFromHomePage) => {
    propertiesArr = propertiesArrFromHomePage;
    createLists();
};

const createItem = (name,image,credit,price,id) =>{
    const adminBtns = `
    <button id ="editBtnPropertyList-${id}" class="btn cart-button btn-outline-warning" type="button"><i
            class="bi bi-pencil-square cart"></i>
    </button>
    <button id = "deleteBtnPropertyList-${id}" class="btn cart-button btn-outline-danger" type="button"><i
            class="bi bi-trash3 cart"></i>
    </button>`
    return`
    <div class="card bg-dark text-white">
        <div class="row">
            <div class="list-img col-sm-12 col-md-6 col-lg-3">
                <img src="${image}" class="img-fluid rounded-start"
                    alt="${name}">
            </div>
            <div class="col-sm-12 col-md-6 col-lg-7 card-body-list">
                <h5 class="card-title card-title-list">${name}</h5>
                <p class="card-text">
                    ${image}
                </p>
                <p class="card-text">Credit: ${credit}</p>
                <p class="card-text">Price: ${price}</p>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-2 list-buttons">
                <div class="cart-edit-delete-btns">
                    <button class="btn cart-button btn-outline-success" type="button"><i
                            class="bi bi-cart-plus cart">
                        </i>
                    </button>
                    ${isAdmin ? adminBtns : ""};
                </div>
            </div>
        </div>
    </div>`
}

const getIdFromClick = (ev) => {
    let idFromId = ev.target.id.split("-"); // split the id to array
    if (!ev.target.id) {
      /*
          if press on icon then there is no id
          then we need to take the id of the parent which is btn
        */
      idFromId = ev.target.parentElement.id.split("-");
    }
    return idFromId[1];
  };

const handleDeleteBtnClick = (ev) => {
    deleteProperty(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
    //get all old btns
    let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
    //remove old events
    for (let btn of btnsBefore) {
      btn.removeEventListener("click", handleFunction);
    }
    console.log(btnsBefore);
};

const createLists = () =>{
    let idx = 1;
    let innerString = "";
    clearEventListeners("deleteBtnPropertyList", handleDeleteBtnClick);

    for(let property of propertiesArr){
        innerString += createItem(property.name,property.imgUrl,property.credit,property.price,idx++);
    }
    listDiv.innerHTML = innerString;
    createBtnEventListener("deleteBtnPropertyList", handleDeleteBtnClick);
    
}

const createBtnEventListener = (idKeyword, handleFunction) => {
    let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
    //add events to new btns
    for (let btn of btns) {
        btn.addEventListener("click", handleFunction);
    }
};

export {initialPropertiesList,updatePropertiesList};