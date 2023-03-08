class User{
  id;
  name;
  lastName;
  email;
  password;
  isAdmin;
  state;
  country;
  city;
  street;
  houseNumber;
  zipCode;
  phoneNumber;
  constructor(id,name,lastName,email,password) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.state;
    this.country;
    this.city;
    this.street;
    this.houseNumber;
    this.zipCode;
    this.phoneNumber;
  }
  details(stateDetail,countryDetail,cityDetail,streetDetail,houseNumber,zipDetail,phoneDetail){
    this.state = stateDetail;
    this.country = countryDetail;
    this.city = cityDetail;
    this.street = streetDetail;
    this.houseNumber = houseNumber;
    this.zipCode = zipDetail;
    this.phoneNumber = phoneDetail;
  }

  set isItAdmin(check){
    if(check === true){
      return this.isAdmin = true;
    }else{
      return this.isAdmin = false;
    }
  }
}
export default User;
