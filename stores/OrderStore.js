import {  observable, action, computed } from "mobx"

import api from "../services/APIService";
import Storage from "../services/Storage";
import { Beedy } from "../services/Beedy";

class OrderStore { 
  
  
  
  @observable error = false;
  @observable filter = 'ALL';
  @observable message = '';
  @observable loading = false;
  @observable page = {}; 
  @observable saved = false; 
  @observable sending = false; 
  @observable sellerBids = []; 
  @observable buyerBids = []; 

    @action  setPage = (id) => {
     	this.filter[id] = false;
     }
     @action  removePage = (id) => {
       if(this.page[id]) {
         delete this.page[id]
       }
     console.log(this.page);
    }

     @action  setFilter = (data) => {
      this.filter = data;
    }

   
     @action bidNow = (data) => { 
      try {
        this.sending = true;
        api.post('ordering/bid', data).then(res => {
          this.sending = false;
          if(res.data.status === 500) {
            Beedy('error', res.data.msg);
            Storage.logout();
          }
         else  if(res.data.status === 200) {
          this.saved = true;
          Beedy('success', res.data.msg); 
         }
         
        })
    .catch(err => {
     console.log('bid_now', err.code);
     console.log('bid_now', err.message);
     console.log('bid_now', err.stack);
    });
      } catch(err) {
        if(err.response.status === 500) {
          console.log("There was a problem with the server");
        } else {
          console.log(err.response.data.msg)
        }
      }
    }

   @action  sellerBidsById = (id) => {
   try {
	 this.loading = true;
    api.get('ordering/seller/bids').then( res => {  
          this.sellerBids = res.data.data;
          this.loading = false; 
    })
    .catch(err => {
     console.log('sellerBidsById', err.code);
     console.log('sellerBidsById', err.message);
     console.log('sellerBidsById', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }

  @action  buyerBidsById = (id) => {
   try {
     this.loading = true;
    api.get('ordering/buyer/bids').then( res => {  
          this.buyerBids = res.data.data;
          this.loading = false; 
    })
    .catch(err => {
     console.log('buyerBidsById', err.code);
     console.log('buyerBidsById', err.message);
     console.log('buyerBidsById', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }

   
  @computed get filteredShop() {
    return '';
  }
   

}

export default OrderStore;
