
import toast from "../services/toast.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";

// Inputs //
let emailInputLogin = document.getElementById('email-input-login');
let passwordInputLogin = document.getElementById('password-input-login');

//Div Alerts//
let emailAlertLogin = document.querySelector(".login-email-alert");
let passwordAlertLogin = document.querySelector(".login-password-alert");

//Buttons//
let submitButtonLogin = document.getElementById('submit-button-login');

emailInputLogin.addEventListener('input',() =>{
    checkEmailInput();
})
passwordInputLogin.addEventListener('input',() =>{
    checkPasswordInput();
})

const checkEmailInput = () =>{
    const errorMsg = validateEmail(emailInputLogin.value); 
    if(!errorMsg.length){
        emailAlertLogin.classList.remove("d-block");
        emailAlertLogin.classList.add("d-none");
    }else{
        emailAlertLogin.classList.remove("d-none");
        emailAlertLogin.classList.add("d-block");
        emailAlertLogin.innerHTML = errorMsg.join("<br>");
        if(!emailInputLogin.value){
            emailAlertLogin.classList.remove("d-block");
            emailAlertLogin.classList.add("d-none");
        }
    }
}


const checkPasswordInput = () => {
    let errorMsg = validatePassword(passwordInputLogin.value);
    if(!errorMsg.length){
        passwordAlertLogin.classList.remove("d-block");
        passwordAlertLogin.classList.add("d-none");
    }else{
        passwordAlertLogin.classList.remove("d-none");       
        passwordAlertLogin.classList.add("d-block");
        passwordAlertLogin.innerHTML = errorMsg.join("<br>");
        if(!passwordInputLogin.value){
            passwordAlertLogin.classList.remove("d-block");
            passwordAlertLogin.classList.add("d-none");
        }
    }
}

submitButtonLogin.addEventListener('click',() =>{
    if (validateEmail(emailInputLogin.value).length) {
        return;
    }
    if (validatePassword(passwordInputLogin.value).length) {
        return;
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(!users){
        return;
    }
    let user = users.find(
        (legitUser) => 
        legitUser.email === emailInputLogin.value &&
        legitUser.password === passwordInputLogin.value
    )
    if(!user){
        toast("Email Or Password Incorrect",false);
        return;
    }
    localStorage.setItem('token',
    JSON.stringify(user))
    location.reload()
})