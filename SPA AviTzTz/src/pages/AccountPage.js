
import toast from "../services/toast.js";
import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";

let currentDetailsDisplay; 

// Div Displays//
const changeDetailsDisplay = document.getElementById('change-details-display');
const accountDetailsDisplay = document.getElementById('account-details-display');

//Detail paragraphs//
const nameAndLastnameP = document.querySelector('.name-lastname-p-acoount');
const stateP = document.querySelector('.state-p-acoount');
const countryP = document.querySelector('.country-p-acoount');
const cityP = document.querySelector('.city-p-acoount');
const streetP = document.querySelector('.street-p-acoount');
const houseNumberP = document.querySelector('.house-number-p-acoount');
const zipCodeP = document.querySelector('.zip-p-acoount');
const phoneNumberP = document.querySelector('.phone-p-acoount');
const emailP = document.querySelector('.email-p-acoount');

//Inputs//
const nameDetailInput = document.querySelector('.name-input-account');
const lastNameDetailInput = document.querySelector('.last-name-input-account');
const stateDetailInput = document.querySelector('.state-input-account');
const countryDetailInput = document.querySelector('.country-input-account');
const cityDetailInput = document.querySelector('.city-input-account');
const streetDetailInput = document.querySelector('.street-input-account');
const houseNumberDetailInput = document.querySelector('.house-number-input-account');
const zipCodeDetailInput = document.querySelector('.zip-input-account');
const phoneDetailInput = document.querySelector('.phone-input-account');
const emailDetailInput = document.querySelector('.email-input-account');
const newPasswordDetailInput = document.querySelector('.new-password-input-account');
const oldPasswordDetailInput = document.querySelector('.old-password-input-account');

//Alerts//
const accountNameAlert = document.querySelector('.account-name-alert');
const accountLastNameAlert = document.querySelector('.account-last-name-alert');
const accountEmailAlert = document.querySelector('.account-email-alert');
const accountNewPasswordAlert = document.querySelector('.account-new-password-alert');
const accountOldPasswordAlert = document.querySelector('.account-old-password-alert');

//Buttons//
const editBtn = document.getElementById('edit-button-account');
const updateBtn = document.getElementById('update-button-account');
const cancelBtn = document.getElementById('cancel-button-account');

let nameDetailOk = false;
let lastNameDetailOk = false;
let emailDetailOk = false;
let newPasswordDetailOk = false;
let oldPasswordDetailOk = false;


window.addEventListener("load", () => {

    let users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (users && token) {
      users = JSON.parse(users);
      token = JSON.parse(token);
      let user = users.find((item) => item.id === token.id);
      if (user) {
        nameAndLastnameP.innerHTML = `${user.name} ${user.lastName}`;
        stateP.innerHTML = `State: ${user.state}`;
        countryP.innerHTML = `Country: ${user.country}`;
        cityP.innerHTML = `City: ${user.city}`;
        streetP.innerHTML = `Street: ${user.street}`;
        houseNumberP.innerHTML = `House: ${user.houseNumber}`;
        zipCodeP.innerHTML = `Zip: ${user.zipCode}`;
        phoneNumberP.innerHTML = `Phone: ${user.phoneNumber}`;
        emailP.innerHTML = `Email: ${user.email}`;

        nameDetailInput.value = user.name;
        lastNameDetailInput.value = user.lastName;
        countryDetailInput.value = user.country;
        cityDetailInput.value = user.city;
        streetDetailInput.value = user.street;
        houseNumberDetailInput.value = user.houseNumber;
        zipCodeDetailInput.value = user.zipCode;
        phoneDetailInput.value = user.phoneNumber;
        emailDetailInput.value = user.email;
      }
    }
    if (nameDetailInput.value !== "") {
        checkNameInput(nameDetailInput);
    }
    if (lastNameDetailInput.value !== "") {
        checkNameInput(lastNameDetailInput);
    }
    if (emailDetailInput.value !== "") {
        checkEmailInput();
    }
    if (newPasswordDetailInput.value !== "") {
        checkPasswordInput();
    }else{
        newPasswordDetailOk = true;
    }
    if (oldPasswordDetailInput.value !== "") {
        checkPasswordInput();
    }
    

    currentDetailsDisplay = accountDetailsDisplay;
    showCurrentDetailsDisplay(currentDetailsDisplay);
    intializerBtnsDisplay();
  });

const intializerBtnsDisplay = () =>{

    editBtn.addEventListener('click', () =>{
        oldPasswordDetailInput.value = '';
        newPasswordDetailInput.value = '';
        showCurrentDetailsDisplay(changeDetailsDisplay);
    })
    updateBtn.addEventListener('click', () =>{
        //if someone changed the html from dev tools
        if (!(nameDetailOk && lastNameDetailOk && emailDetailOk && newPasswordDetailOk && oldPasswordDetailOk)) {
            return; 
        }
        let users = JSON.parse(localStorage.getItem('users'));
        let token = JSON.parse(localStorage.getItem('token'));
        if(token && users){
            let userEmail = users.find((item) => item.email === emailDetailInput.value)
            let user = users.find((item) => item.id === token.id)
            if(userEmail && userEmail.id !== user.id){
                toast("Email Already Exist",false);
                return;
            }
            if(user.password !== oldPasswordDetailInput.value){
                toast("Original Password Incorrect",false);
                return;
            }
            
            if(user){
                user.name = token.name = nameDetailInput.value;
                user.lastName = token.lastName = lastNameDetailInput.value;
                user.state = token.state = stateDetailInput.value;
                user.country = token.country = countryDetailInput.value;
                user.city = token.city = cityDetailInput.value;
                user.street = token.street = streetDetailInput.value;
                user.houseNumber = token.houseNumber = houseNumberDetailInput.value;
                user.zipCode = token.zipCode = zipCodeDetailInput.value;
                user.phoneNumber = token.phoneNumber = phoneDetailInput.value;
                user.email = token.email = emailDetailInput.value;
                if(newPasswordDetailInput.value === ""){
                    user.password = oldPasswordDetailInput.value;
                }else{
                    user.password = token.password = newPasswordDetailInput.value;
                }
                

                nameAndLastnameP.innerHTML = `${user.name} ${user.lastName}`;
                stateP.innerHTML = `State: ${user.state}`;
                countryP.innerHTML = `Country: ${user.country}`;
                cityP.innerHTML = `City: ${user.city}`;
                streetP.innerHTML = `Street: ${user.street}`;
                houseNumberP.innerHTML = `House: ${user.houseNumber}`;
                zipCodeP.innerHTML = `Zip: ${user.zipCode}`;
                phoneNumberP.innerHTML = `Phone: ${user.phoneNumber}`;
                emailP.innerHTML = `Email: ${user.email}`;
                localStorage.setItem('users',JSON.stringify(users))
                localStorage.setItem('token',JSON.stringify(token))
                toast("Changes Been Saved");
            }
            showCurrentDetailsDisplay(accountDetailsDisplay)
        }
    })
    cancelBtn.addEventListener('click', () =>{
        showCurrentDetailsDisplay(accountDetailsDisplay);
    })
}

nameDetailInput.addEventListener('input', () =>{
    checkNameInput(nameDetailInput);
});
lastNameDetailInput.addEventListener('input', () =>{
    checkNameInput(lastNameDetailInput);
});
emailDetailInput.addEventListener('input', () =>{
    checkEmailInput();
});
oldPasswordDetailInput.addEventListener('input', () =>{
    checkPasswordInput(oldPasswordDetailInput);
});
newPasswordDetailInput.addEventListener('input', () =>{
    checkPasswordInput(newPasswordDetailInput);
});

function showCurrentDetailsDisplay(toDisplay){
currentDetailsDisplay.classList.remove('d-grid');
currentDetailsDisplay.classList.add('d-none');

toDisplay.classList.remove('d-none');
toDisplay.classList.add('d-grid');
currentDetailsDisplay = toDisplay;
}

const checkNameInput = (inputNameCatergoryType) =>{
    
    let errorMsg = validateName(inputNameCatergoryType.value);
    if(!errorMsg.length){
        switch (inputNameCatergoryType){
            case nameDetailInput :
                accountNameAlert.classList.remove("d-block");
                accountNameAlert.classList.add("d-none");
                nameDetailOk = true;
                break;
            case lastNameDetailInput :
                accountLastNameAlert.classList.remove("d-block");
                accountLastNameAlert.classList.add("d-none");
                lastNameDetailOk = true;
                break;
        }
    }else{
        switch (inputNameCatergoryType){
            case nameDetailInput :
                accountNameAlert.classList.remove("d-none");
                accountNameAlert.classList.add("d-block");
                accountNameAlert.innerHTML = errorMsg.join("<br>");
                if(!inputNameCatergoryType.value){
                    accountNameAlert.classList.remove("d-block");
                    accountNameAlert.classList.add("d-none");
                }
                nameDetailOk = false;
                break;
            case lastNameDetailInput :
                accountLastNameAlert.classList.remove("d-none");
                accountLastNameAlert.classList.add("d-block");
                accountLastNameAlert.innerHTML = errorMsg.join("<br>");
                if(!inputNameCatergoryType.value){
                    accountLastNameAlert.classList.remove("d-block");
                    accountLastNameAlert.classList.add("d-none");
                }
                lastNameDetailOk = false;
                break;
        }
    }
    checkIfCanEnableButton();
}

const checkEmailInput = () =>{
    const errorMsg = validateEmail(emailDetailInput.value); 
    if(!errorMsg.length){
        accountEmailAlert.classList.remove("d-block");
        accountEmailAlert.classList.add("d-none");
        emailDetailOk = true;
    }else{
        accountEmailAlert.classList.remove("d-none");
        accountEmailAlert.classList.add("d-block");
        accountEmailAlert.innerHTML = errorMsg.join("<br>");
        if(!emailDetailInput.value){
            accountEmailAlert.classList.remove("d-block");
            accountEmailAlert.classList.add("d-none");
        }
        emailDetailOk = false;
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
            case newPasswordDetailInput :
                accountNewPasswordAlert.classList.remove("d-block");
                accountNewPasswordAlert.classList.add("d-none");
                newPasswordDetailOk = true;
                break;
            case oldPasswordDetailInput :
                accountOldPasswordAlert.classList.remove("d-block");
                accountOldPasswordAlert.classList.add("d-none");
                oldPasswordDetailOk = true;
                break;
        }
    }else{
        switch (inputSecurityCatergoryType){
            case newPasswordDetailInput :
                accountNewPasswordAlert.classList.remove("d-none");
                accountNewPasswordAlert.classList.add("d-block");
                accountNewPasswordAlert.innerHTML = errorMsg.join("<br>");
                if(!inputSecurityCatergoryType.value){
                    accountNewPasswordAlert.classList.remove("d-block");
                    accountNewPasswordAlert.classList.add("d-none");
                }
                newPasswordDetailOk = false;
                break;
            case oldPasswordDetailInput :
                accountOldPasswordAlert.classList.remove("d-none");
                accountOldPasswordAlert.classList.add("d-block");
                accountOldPasswordAlert.innerHTML = errorMsg.join("<br>");
                if(!inputSecurityCatergoryType.value){
                    accountOldPasswordAlert.classList.remove("d-block");
                    accountOldPasswordAlert.classList.add("d-none");
                }
                oldPasswordDetailOk = false;
                break;
        }
    }
    checkIfCanEnableButton();
}

let checkIfCanEnableButton = () =>{
    updateBtn.disabled = !(nameDetailOk && lastNameDetailOk && emailDetailOk && newPasswordDetailOk && oldPasswordDetailOk);
}