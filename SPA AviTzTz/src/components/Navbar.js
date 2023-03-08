import checkIfAdmin from "../utils/checkIfAdmin.js";
import checkIfConnected from "../utils/checkIfConnected.js";

// Divs connection container//
let userBeforeConnection = document.querySelector(".user-before-connection");
let userAfterConnection = document.querySelector(".user-after-connection");
let navLogOut = document.querySelector(".nav-logout-link")

let addPictureLink = document.getElementById("nav-add-picture-link");

const initializeNavbar = ()=>{
    
    navLogOut.addEventListener('click',() =>{
        localStorage.removeItem('token');
        location.reload();
    })
    if(checkIfConnected()){
        userBeforeConnection.classList.add('d-none');
        userAfterConnection.classList.remove('d-none');
        userAfterConnection.classList.add('d-flex');
    }
    if(checkIfAdmin()){
        addPictureLink.classList.remove('d-none')
    }
}

export default initializeNavbar;