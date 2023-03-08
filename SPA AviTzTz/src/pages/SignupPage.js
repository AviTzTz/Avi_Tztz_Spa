import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import handleChangePage from "../routes/router.js"
import User from "../models/User.js";
import getNextUserID from "../utils/getNextUserId.js";
import PAGES from "../models/pageModel.js";
import toast from "../services/toast.js";

// Inputs //
let nameInputSignup = document.getElementById("name-input-signup");
let lastNameInputSignup = document.getElementById("last-name-input-signup");
let emailInputSignup = document.getElementById("email-input-signup");
let passwordInputSignup = document.getElementById("password-input-signup");
let rePasswordInputSignup = document.getElementById("re-password-input-signup");
let switchCheckButtonSignup = document.querySelector(".switch-check-signup");

// Div Alerts//
let nameAlert = document.querySelector('.signup-name-alert');
let lastNameAlert = document.querySelector('.signup-last-name-alert');
let emailAlert = document.querySelector('.signup-email-alert');
let passwordAlert = document.querySelector('.signup-password-alert');
let rePasswordAlert = document.querySelector('.signup-re-password-alert');

//Buttons
let submitButtonSignup = document.getElementById('signup-button-submit');

let isAdmin = false;
let nameOk = false;
let lastNameOk = false;
let emailOk = false;
let passwordOk = false;
let rePasswordOk = false;

window.addEventListener("load",() =>{
    if(nameInputSignup.value !== ""){
        checkNameInput(nameInputSignup);
    }
    if(lastNameInputSignup.value !== ""){
        checkNameInput(lastNameInputSignup);
    }
    if(emailInputSignup.value !== ""){
        checkEmailInput();
    }
    if(passwordInputSignup.value !== ""){
        checkPasswordInput(passwordInputSignup);
    }
    if(rePasswordInputSignup.value !== ""){
        checkPasswordInput(rePasswordInputSignup);
    }
})

nameInputSignup.addEventListener('input', () =>{
    checkNameInput(nameInputSignup);
})
lastNameInputSignup.addEventListener('input', () =>{
    checkNameInput(lastNameInputSignup);
})
emailInputSignup.addEventListener('input', () =>{
    checkEmailInput();
})
passwordInputSignup.addEventListener('input', () =>{
    checkPasswordInput(passwordInputSignup);
})
rePasswordInputSignup.addEventListener('input', () =>{
    checkPasswordInput(rePasswordInputSignup);
})

/*Function that gets one value type
 from the name category of the signup page
 and returns to the user if the input is right or wrong */
const checkNameInput = (inputNameCatergoryType) =>{
    
    let errorMsg = validateName(inputNameCatergoryType.value);
    if(!errorMsg.length){
        switch (inputNameCatergoryType){
            case nameInputSignup :
                nameAlert.classList.remove("d-block");
                nameAlert.classList.add("d-none");
                nameOk = true;
                break;
            case lastNameInputSignup :
                lastNameAlert.classList.remove("d-block");
                lastNameAlert.classList.add("d-none");
                lastNameOk = true;
                break;
        }
    }else{
        switch (inputNameCatergoryType){
            case nameInputSignup :
                nameAlert.classList.remove("d-none");
                nameAlert.classList.add("d-block");
                nameAlert.innerHTML = errorMsg.join("<br>");
                if(!inputNameCatergoryType.value){
                    nameAlert.classList.remove("d-block");
                    nameAlert.classList.add("d-none");
                }
                nameOk = false;
                break;
            case lastNameInputSignup :
                lastNameAlert.classList.remove("d-none");
                lastNameAlert.classList.add("d-block");
                lastNameAlert.innerHTML = errorMsg.join("<br>");
                if(!inputNameCatergoryType.value){
                    lastNameAlert.classList.remove("d-block");
                    lastNameAlert.classList.add("d-none");
                }
                lastNameOk = false;
                break;
        }
    }
    checkIfCanEnableButton();
}

const checkEmailInput = () =>{
    const errorMsg = validateEmail(emailInputSignup.value); 
    if(!errorMsg.length){
        emailAlert.classList.remove("d-block");
        emailAlert.classList.add("d-none");
        emailOk = true;
    }else{
        emailAlert.classList.remove("d-none");
        emailAlert.classList.add("d-block");
        emailAlert.innerHTML = errorMsg.join("<br>");
        if(!emailInputSignup.value){
            emailAlert.classList.remove("d-block");
            emailAlert.classList.add("d-none");
        }
        emailOk = false;
    }
    checkIfCanEnableButton();
}

/*Function that gets one value type
 from the security category of the signup page
 and returns to the user if the input is right or wrong */
const checkPasswordInput = (inputSecurityCatergoryType) => {
    let errorMsg = validatePassword(inputSecurityCatergoryType.value);
    if(!errorMsg.length){
        switch (inputSecurityCatergoryType){
            case passwordInputSignup :
                passwordAlert.classList.remove("d-block");
                passwordAlert.classList.add("d-none");
                passwordOk = true;
                break;
            case rePasswordInputSignup :
                rePasswordAlert.classList.remove("d-block");
                rePasswordAlert.classList.add("d-none");
                rePasswordOk = true;
                break;
        }
    }else{
        switch (inputSecurityCatergoryType){
            case passwordInputSignup :
                passwordAlert.classList.remove("d-none");
                passwordAlert.classList.add("d-block");
                passwordAlert.innerHTML = errorMsg.join("<br>");
                if(!inputSecurityCatergoryType.value){
                    passwordAlert.classList.remove("d-block");
                    passwordAlert.classList.add("d-none");
                }
                passwordOk = false;
                break;
            case rePasswordInputSignup :
                rePasswordAlert.classList.remove("d-none");
                rePasswordAlert.classList.add("d-block");
                rePasswordAlert.innerHTML = errorMsg.join("<br>");
                if(!inputSecurityCatergoryType.value){
                    rePasswordAlert.classList.remove("d-block");
                    rePasswordAlert.classList.add("d-none");
                }
                rePasswordOk = false;
                break;
        }
    }
    checkIfCanEnableButton();
}

let checkIfCanEnableButton = () =>{
    submitButtonSignup.disabled = !(nameOk && lastNameOk && emailOk && passwordOk && rePasswordOk);
}

//Event listener that checks if its admin or not//
switchCheckButtonSignup.addEventListener('change',(e) => {
    if(e.target.checked){
        isAdmin = true;
    }else{
        isAdmin = false;
    }
})


submitButtonSignup.addEventListener('click',() => {

    if(!(nameOk && lastNameOk && emailOk && passwordOk && rePasswordOk)){
        return;
    }
    if(passwordInputSignup.value !== rePasswordInputSignup.value){
        return;
    }
    let users = localStorage.getItem('users');
    let newUser = new User(
        getNextUserID(),
        nameInputSignup.value,
        lastNameInputSignup.value,
        emailInputSignup.value,
        passwordInputSignup.value,);
        newUser.isItAdmin = isAdmin;
        newUser.details(
            document.querySelector(".state-input-signup").value = "" ? "" : document.querySelector(".state-input-signup").value,
            document.querySelector(".country-input-signup").value = "" ? "" :document.querySelector(".country-input-signup").value,
            document.querySelector(".city-input-signup").value = "" ? "" :document.querySelector(".city-input-signup").value,
            document.querySelector(".street-input-signup").value = "" ? "" :document.querySelector(".street-input-signup").value,
            document.querySelector(".house-number-input-signup").value = "" ? "" :document.querySelector(".house-number-input-signup").value,
            document.querySelector(".zipcode-input-signup").value = "" ? "" :document.querySelector(".zipcode-input-signup").value,
            document.querySelector(".phone-number-input-signup").value = "" ? "" :document.querySelector(".phone-number-input-signup").value,
        )
    if(!users){
        users = [newUser]
        localStorage.setItem("users",JSON.stringify(users));
    }else{
        users = JSON.parse(users);
        for(let user of users){
            if(user.email === emailInputSignup.value){
                toast('Email Already Exist',false)
                return;
            }
        }
        users = [...users, newUser];
        localStorage.setItem("users",JSON.stringify(users))
    }
    handleChangePage(PAGES.LOGIN)
})