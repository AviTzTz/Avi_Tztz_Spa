
const checkIfAdmin = () =>{
    const token = JSON.parse(localStorage.getItem('token'));
    if(!token){
        return false;
    }
    return token.isAdmin;
}

export default checkIfAdmin;