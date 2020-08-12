import { decorate, observable, action} from "mobx"  
import api from "../services/APIService"; 


class AuthStore {
  // constructor() {
  //    console.log(this.isAuth) 
  // }
  @observable id = null;
  @observable token = null;
  @observable preferred = null; 
  @observable isAuth = false;
  @observable registered = false;
  @observable error = null;
  @observable loading = false;
  @observable emailExist = false; 
  @observable profiles = [];

   
  
 @action confirmEmail = (data) => {
   try {
	    api.get('auth/' + data + '/exist').then( res => { 
      this.emailExist = res.data.exist;
    })
    .catch(err => {
     console.log('confirm_email', err.code);
     console.log('confirm_email', err.message);
     console.log('confirm_email', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
   
 @action extendToBuyer = () => {
    try {
		  this.loading = true;
    this.error = null; 
    api.post('auth/extend/buyer', {data: 'payload'}).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        //you can now login to buyer account 
      }
    })
    .catch(err => {
     console.log('ext_to_buyer', err.code);
     console.log('ext_to_buyer', err.message);
     console.log('ext_to_buyer', err.stack);
    });
	} catch(e) {
		console.error(e);
	}
  }
   
 @action extendToSeller = () => {
   try {
	    this.loading = true;
    this.error = null; 
    api.post('auth/extend/seller', {data: 'payload'}).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        //you can now login to buyer account 
      }
    })
    .catch(err => {
     console.log('ext_to_seller', err.code);
     console.log('ext_to_seller', err.message);
     console.log('ext_to_seller', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }
 @action createBuyer = (payload) => {
   try {
	    this.loading = true;
    this.error = null;
    this.registered = false; 
    api.post('auth/create/buyer', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false; 
        this.registered = true; 
      }
    })
    .catch(err => {
     console.log('create_buyer', err.code);
     console.log('create_buyer', err.message);
     console.log('create_buyer', err.stack);
    });
   } catch(e) {
	console.error(e);
   }
  }

 @action createSeller = (payload) => {
   try {
	     this.loading = true;
    this.error = null; 
    this.registered = true; 
    api.post('auth/create/seller', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false; 
        this.registered = false; 
      }
    })
   } catch(e) {
	console.error(e);
   }
  }
  

   
 @action login = (payload) => {
    try {
		  this.loading = true;
    this.error = null;
    api.post('auth/auth', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        this.id = res.data.user[0].id;
        this.token = res.data.user[0].buyer_token; 
        this.preferred = res.data.user[0].preferred; 
        this.isAuth = true;  
      }
    })
    .catch(err => {
     console.log('login', err.code);
     console.log('login', err.message);
     console.log('login', err.stack);
    });
	} catch(e) {
		console.error(e);
	}
  }
   
 @action loginSuccessful = () => {
    this.isAuth = false;
  }
    
   
   
} 

export default AuthStore

 