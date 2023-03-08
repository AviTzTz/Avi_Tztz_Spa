
const getNextUserID = () =>{
    let nextUserID = 1;
    let userID =JSON.parse(localStorage.getItem('users'));
    if(!userID){
        nextUserID = 1;
    }else{
        userID.map(e => {
            if (nextUserID == e.id){
                nextUserID++;
            }
        });
    }   
    return nextUserID;
}

export default getNextUserID;