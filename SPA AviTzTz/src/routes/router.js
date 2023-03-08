import PAGES from "../models/pageModel.js";

// PAGES //
const HOMEPAGE = document.getElementById(PAGES.HOME);
const ABOUTPAGE = document.getElementById(PAGES.ABOUT);
const SIGNUPPAGE = document.getElementById(PAGES.SIGNUP);
const LOGINPAGE = document.getElementById(PAGES.LOGIN);
const ACCOUNTPAGE = document.getElementById(PAGES.ACCOUNT);
// const PAGE404TPAGE = document.getElementById(PAGES.PAGE404);

// LINKS //
const navHomeLink = document.getElementById("nav-home-link");
const navAboutLink = document.getElementById("nav-about-link");
const navSignUpLink = document.getElementById("nav-signup-link");
const navLoginLink = document.getElementById("nav-login-link");
const navAccountLink = document.getElementById("nav-account-link");


// hide and show pages //
function handlePageChange(pageToDisplay) {

    HOMEPAGE.classList.remove("d-block");
    ABOUTPAGE.classList.remove("d-block");
    SIGNUPPAGE.classList.remove("d-flex");
    LOGINPAGE.classList.remove("d-flex");
    ACCOUNTPAGE.classList.remove("d-block");
    // PAGE404TPAGE.classList.remove("d-block");
    HOMEPAGE.classList.add("d-none");
    ABOUTPAGE.classList.add("d-none");
    SIGNUPPAGE.classList.add("d-none");
    LOGINPAGE.classList.add("d-none");
    ACCOUNTPAGE.classList.add("d-none");
    // PAGE404TPAGE.classList.add("d-none");

    switch (pageToDisplay) {
        case PAGES.HOME:
            HOMEPAGE.classList.remove("d-none");
            HOMEPAGE.classList.add("d-block");
            break;
        case PAGES.ABOUT:
            ABOUTPAGE.classList.remove("d-none");
            ABOUTPAGE.classList.add("d-block");
            break;
        case PAGES.SIGNUP:
            SIGNUPPAGE.classList.remove("d-none");
            SIGNUPPAGE.classList.add("d-flex");
            break;
        case PAGES.LOGIN:
            LOGINPAGE.classList.remove("d-none");
            LOGINPAGE.classList.add("d-flex");
            break;
        case PAGES.ACCOUNT:
            ACCOUNTPAGE.classList.remove("d-none");
            ACCOUNTPAGE.classList.add("d-block");
            break;     
    }
}

navHomeLink.addEventListener('click', () =>{
    handlePageChange(PAGES.HOME);
});
navAboutLink.addEventListener('click', () => {
    handlePageChange(PAGES.ABOUT);
});
navSignUpLink.addEventListener('click', () => {
    handlePageChange(PAGES.SIGNUP);
});
navLoginLink.addEventListener('click', () => {
    handlePageChange(PAGES.LOGIN)
});
navAccountLink.addEventListener('click', () => {
    handlePageChange(PAGES.ACCOUNT)
});


export default handlePageChange;