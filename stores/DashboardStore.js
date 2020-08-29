import {  observable, action, computed } from "mobx"

import api from "../services/APIService"; 

class DashboardStore {
  
  
   @observable  type = 'success'; 
   @observable  message = '';
   @observable  open = false; 
   @observable  buyerStat = []; 
   @observable  sellerStat = []; 
 

   @action  fireMe = (open, type, message) => {
       this.open = open;
       this.type = type;
       this.message = message;
     }
 
     @action  sellerDashboard = () => {
      try {  
        this.loading = true;
       api.get('dashboard/seller').then( res => { 
             this.loading = false; 
          if(res.data.status === 200) { 
          this.sellerStat = res.data.data;
          }
          console.log( res.data/data)
       })
       .catch(err => {
        console.log('sellerDashboard', err.code);
        console.log('sellerDashboard', err.message);
        console.log('sellerDashboard', err.stack);
       });
      } catch(e) {
     console.error(e);
      }
     }
 
     @action  buyerDashboard = () => {
      try {  
        this.loading = true;
       api.get('dashboard/buyer').then( res => { 
             this.loading = false; 
          if(res.data.status === 200) { 
          this.buyerStat = res.data.data;
          }
          console.log( res.data/data)
       })
       .catch(err => {
        console.log('buyerDashboard', err.code);
        console.log('buyerDashboard', err.message);
        console.log('buyerDashboard', err.stack);
       });
      } catch(e) {
     console.error(e);
      }
     }
   
   

}  

 
export default DashboardStore;