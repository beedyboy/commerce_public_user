import { observable, action, computed } from "mobx" ;
import 'mobx-react/batchingForReactDom';
import api from "../services/APIService";
import { Beedy } from "../services/Beedy";


class UserStore { 
 
    @observable error = null;
    @observable invited = false;
    @observable loading = false;
    @observable emailExist = false; 
    @observable buyer = [];
    @observable profiles = [];
    @observable seller =  [
      {'name': 'Dynamic Programming', 'description': "dynamic", 'duration': '10'} 
    ];

  
   
    
 @action getBuyerProfile = () => {
   try {
	  api.get('user/buyer/profile/').then( res => { 
      if(res.data.status === 200) {
        this.buyer = res.data.data[0];
      }
    })
    .catch(err => {
     console.log('getBuyerProfile', err.code);
     console.log('getBuyerProfile', err.message);
     console.log('getBuyerProfile', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
  
 @action updateBuyer = (data) => { 
   try {
	    api.post('user/update/buyer/', data).then( res => {  
      if(res.data.status === 200) {
       this.getBuyerProfile(); 
       Beedy('success', res.data.message);
       this.response = true;           
      }
    })
    .catch(err => {
     console.log('updateBuyer', err.code);
     console.log('updateBuyer', err.message);
     console.log('updateBuyer', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
      
 @action getSellerProfile = () => {
   try {
	    api.get('user/seller/profile/').then( res => { 
      if(res.data.status === 200) { 
        this.profiles = res.data.data; 
      }
    })
    .catch(err => {
     console.log('getSellerProfile', err.code);
     console.log('getSellerProfile', err.message);
     console.log('getSellerProfile', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
  
 @action updateSeller = (data) => { 
   try {
	   api.post('user/update/seller/', data).then( res => {  
      if(res.data.status === 200) {
       this.getSellerProfile(); 
       Beedy('success', res.data.message);
       this.response = true;           
      }
    })
    .catch(err => {
     console.log('updateSeller', err.code);
     console.log('updateSeller', err.message);
     console.log('updateSeller', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
 @action updateShop = (data) => { 
    try {
		 api.post('user/update/shop', data).then( res => {  
      if(res.data.status === 200) {
       this.getSellerProfile();
       Beedy('success', res.data.message); 
       this.response = true;           
      }
    })
    .catch(err => {
     console.log('updateShop', err.code);
     console.log('updateShop', err.message);
     console.log('updateShop', err.stack);
    });
	} catch(e) {
		console.error(e);
	}
  }
  
 @action updateSettings = (data) => { 
  try {
	  api.post('user/update/settings', data).then( res => {  
    if(res.data.status === 200) {
     this.getSellerProfile();
     Beedy('success', res.data.message); 
     this.response = true;           
    }
  })
    .catch(err => {
     console.log('updateSettings', err.code);
     console.log('updateSettings', err.message);
     console.log('updateSettings', err.stack);
    });
  } catch(e) {
	console.error(e);
  }
}

 @action inviteAFriend = (data) => { 
   try {
	    this.loading = true;
    api.post('user/invite', {email: data}).then( res => {  
      if(res.data.status === 200) { 
        this.loading = false;
        Beedy('success', res.data.message);
       this.invited = true;           
      }
    })
    .catch(err => {
     console.log('inviteAFriend', err.code);
     console.log('inviteAFriend', err.message);
     console.log('inviteAFriend', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
 @action setInvited = (data) => {
    this.invited = data;
  }
  @computed get plentylist() {
    return Object.keys(this.seller || {}).map(key =>  ({...this.seller[key], uid: key}));
 }
  @computed get sellerProfile() { 
    return Object.keys(this.profiles || {}).map(key => ({...this.profiles[key], uid: key}));
    
    }
  
} 
export default UserStore;