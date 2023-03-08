
const getNextPropertyID = () =>{
    let nextPropertyID = 1;
    let propertyID =JSON.parse(localStorage.getItem('props'));
    if(!propertyID){
        nextPropertyID = 1;
    }
    propertyID.map(e => {
        if (nextPropertyID == e.id){
            nextPropertyID++;
        }
    });
    localStorage.setItem("nextPropertyID",nextPropertyID)
    return nextPropertyID;
}

export default getNextPropertyID;