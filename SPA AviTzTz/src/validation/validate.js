const validate = (validationType,regex,value,min,max) =>{
    let msgErrorArr = [];
    if (value.length < min){
        msgErrorArr = [...msgErrorArr,"is too Short"]
    }
    if(value.length > max){
        msgErrorArr = [...msgErrorArr,"is too Long"]
    }
    if(!regex.test(value)){
        switch (validationType){
            case "nameValidation" : {
                msgErrorArr = [...msgErrorArr,"must start with capital letter"]
                break;
            }
            case "emailValidation" : {
                msgErrorArr = [...msgErrorArr,"as invalid structure"]
                break;
            }
            case "passwordValidation" : {
                msgErrorArr = [...msgErrorArr,"must contain capital,small letters and punctuation mark"]
                break;
            }
        }
    }
    return msgErrorArr;
}

export default validate;