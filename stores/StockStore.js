import {  observable, action, computed } from "mobx" 
import api from "../services/APIService";
import CookieService from "../services/CookieService";
import { Beedy } from "../services/Beedy";


class StockStore { 
  
    @observable error = false;
    @observable close = false;
    @observable filter = 'ALL';
    @observable message = '';
    @observable loading = false;
    @observable saved = false; 
    @observable sending = false; 
    @observable stocks = [];
    @observable stock = []; 

    @action  setFilter = (data) => {
     	this.filter = data;
     }
     @action  toggleClose = () => {
      this.close = false;
    }
    
     @action refreshForm = () => {
      this.saved = false; 
     } 
   
 @action saveStock = (data) => {  
    try {
      this.sending = true;
      api.post('stock', data).then(res => {
        this.sending = false;
        if(res.data.status === 500) {
          CookieService.logout();
        }
       else  if(res.data.status === 200) {
        this.close = true;
        // this.fetchStock();
        Beedy('success', res.data.message);
       }
       
      })
    .catch(err => {
     console.log('save_stock', err.code);
     console.log('save_stock', err.message);
     console.log('save_stock', err.stack);
    });
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

 @action productStock = (id) => {  
    try {
   this.loading = true;
   api.get('stock/product/' + id).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        CookieService.logout();
      }
     else if(res.data.status === 200) {
         this.stocks = res.data.data; 
      }
        
    })
    .catch(err => {
     console.log('my_stock', err.code);
     console.log('my_stock', err.message);
     console.log('my_stock', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }

 @action  removeStock = (id) => { 
    api.delete('stock/' + id).then( res => {
      if(res.status === 200) {
        this.fetchStock();
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('remove_stock', err.code);
     console.log('remove_stock', err.message);
     console.log('remove_stock', err.stack);
    });
  }
 @action getStockById = (id) => {
  try { 
    api.get('stock/' + id).then( res => {
      if(res.data.status === 200) { 
        this.stock = res.data.data[0];
      }
    })
    .catch(err => {
     console.log('stock_by_id', err.code);
     console.log('stock_by_id', err.message);
     console.log('stock_by_id', err.stack);
    });
  } catch(e) {
	console.error(e);
  }
  }
  

  @computed get filteredStock() {
    switch (this.filter) {
      case 'ALL':
        return this.stocks;
      case 'Active':
        return this.stocks.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.stocks.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.stocks.filter(s => s.section === 'Deleted');

      default:
        return this.stocks;
    }
  }
  @computed get allProductStocks() {
    return   Object.keys(this.stocks || {}).map(key => ({...this.stocks[key], uid: key}));
  }
  @computed get info() {
  	return {
      total: this.stocks.length,
      status: this.stocks.filter(cat => cat.status).length
    }
   
  }

}  
  
export default StockStore;
