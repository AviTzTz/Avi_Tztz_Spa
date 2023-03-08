import propertyDataArr from "./propertyData.json" assert {type : 'json'};
import usersDataArr from "./usersData.json" assert {type : 'json'};
import Property from "../models/Property.js";
import User from "../models/User.js";

let propertyID = 1;
let userID = 1;
let propertiesArr = [];
let usersArr = [];

let createPropertiesData = () => {

    for(let property of propertyDataArr){
        property = new Property(propertyID++,property.name,property.price,property.credit,property.imgUrl);
        propertiesArr = [...propertiesArr,property];
    }
    return propertiesArr;
}

let createUsersData = () =>{

    for(let user of usersDataArr){
        let isAdmin = user.isAdmin;
        let userState = user.state;
        let userCountry = user.country;
        let userCity = user.city;
        let userStreet = user.street;
        let userHouseNumber = user.houseNumber;
        let userZipCode = user.zipCode;
        let userPhone = user.phoneNumber;
        user = new User(userID++,user.name,user.lastName,user.email,user.password);
        user.isItAdmin = isAdmin;
        user.details(
            userState,
            userCountry,
            userCity,
            userStreet,
            userHouseNumber,
            userZipCode,
            userPhone);
        usersArr = [...usersArr,user]
    }
    return usersArr;
}

//Sets the first data properties //
let setInitialPropertyData = () =>{
    let properties = localStorage.getItem("props");
    if (properties){
        return;
    }
    localStorage.setItem("props",JSON.stringify(createPropertiesData()));
}

//Sets the first data users //
let setInitialUsersData = () =>{
    let users = localStorage.getItem("users");
    if (users){
        return;
    }
    localStorage.setItem("users",JSON.stringify(createUsersData()))
}

setInitialPropertyData();
setInitialUsersData();