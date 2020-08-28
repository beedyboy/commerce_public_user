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
  @observable bid = []; 
  @observable bidAuction = []; 
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
          Beedy('success', res.data.message); 
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

   @action  sellerBidsById = () => {
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

  @action  buyerBidsById = () => {
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

  @action getBidById = (id) => {
    try {
    this.loading = true;
     api.get('ordering/bid/' + id).then( res => {   
        this.loading = false; 
          if (res.data.status === 200) {
            this.bid = res.data.data;
          }
     })
     .catch(err => {
      console.log('getBidById', err.code);
      console.log('getBidById', err.message);
      console.log('getBidById', err.stack);
     });
    } catch(e) {
   console.error(e);
    }
   }
  @action getBidAuction = (id) => {
    try {
      this.loading = true;
     api.get('ordering/bids'+ id + '/auction').then( res => {  
           this.loading = false; 
           if (res.data.status === 200) { 
             this.bidAuction = res.data.data;
           }
     })
     .catch(err => {
      console.log('getBidAuction', err.code);
      console.log('getBidAuction', err.message);
      console.log('getBidAuction', err.stack);
     });
    } catch(e) {
   console.error(e);
    }
   }
 
 @action buyerCreateAuction = (data) => { 
    try {
      this.sending = true;
      api.post('ordering/buyer/auction', data).then(res => {
        this.sending = false;
        if(res.data.status === 500) {
          Beedy('error', res.data.msg);
          Storage.logout();
        }
       else  if(res.data.status === 200) {
        this.saved = true;
        Beedy('success', res.data.message); 
       } 
      })
  .catch(err => {
   console.log('buyerCreateAuction', err.code);
   console.log('buyerCreateAuction', err.message);
   console.log('buyerCreateAuction', err.stack);
  });
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }
  }
  
 @action sellerCreateAuction = (data) => { 
  try {
    this.sending = true;
    api.post('ordering/seller/auction', data).then(res => {
      this.sending = false;
      if(res.data.status === 500) {
        Beedy('error', res.data.msg);
        Storage.logout();
      }
     else  if(res.data.status === 200) {
      this.saved = true;
      Beedy('success', res.data.message); 
     } 
    })
.catch(err => {
 console.log('sellerCreateAuction', err.code);
 console.log('sellerCreateAuction', err.message);
 console.log('sellerCreateAuction', err.stack);
});
  } catch(err) {
    if(err.response.status === 500) {
      console.log("There was a problem with the server");
    } else {
      console.log(err.response.data.msg)
    }
  }
}

@action buyerToggleBuyer = (data) => { 
  try {
    this.sending = true;
    api.post('ordering/buyer/toggle/buyer', data).then(res => {
      this.sending = false;
      if(res.data.status === 500) {
        Beedy('error', res.data.msg);
        Storage.logout();
      }
     else  if(res.data.status === 200) {
      this.saved = true;
      Beedy('success', res.data.message); 
     } 
    })
.catch(err => {
 console.log('buyerToggleBuyer', err.code);
 console.log('buyerToggleBuyer', err.message);
 console.log('buyerToggleBuyer', err.stack);
});
  } catch(err) {
    if(err.response.status === 500) {
      console.log("There was a problem with the server");
    } else {
      console.log(err.response.data.msg)
    }
  }
}

@action sellerToggleSeller = (data) => { 
  try {
    this.sending = true;
    api.post('ordering/seller/toggle/seller', data).then(res => {
      this.sending = false;
      if(res.data.status === 500) {
        Beedy('error', res.data.msg);
        Storage.logout();
      }
     else  if(res.data.status === 200) {
      this.saved = true;
      Beedy('success', res.data.message); 
     } 
    })
.catch(err => {
 console.log('sellerToggleSeller', err.code);
 console.log('sellerToggleSeller', err.message);
 console.log('sellerToggleSeller', err.stack);
});
  } catch(err) {
    if(err.response.status === 500) {
      console.log("There was a problem with the server");
    } else {
      console.log(err.response.data.msg)
    }
  }
}
  @computed get auction() {
    return Object.keys(this.bidAuction || {}).map(key => ({...this.bidAuction}));
  }
   

}

export default OrderStore;
