import {  observable, action, computed } from "mobx"

import api from "../services/APIService"; 

class ServiceStore {
  
  
   @observable  type = 'success'; 
   @observable  message = '';
   @observable  open = false; 
 

   @action  fireMe = (open, type, message) => {
       this.open = open;
       this.type = type;
       this.message = message;
     }
 
   

}  

 
export default ServiceStore;