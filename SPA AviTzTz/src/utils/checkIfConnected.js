const checkIfConnected = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return false;
    }
    return !!token; //convert to boolean
  };
  
export default checkIfConnected;