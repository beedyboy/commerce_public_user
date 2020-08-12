import api from "../services/APIService"; 
const { observable, action, computed } = require("mobx");

class LocationStore { 
    @observable locations = [];
    @observable cities = [];
    
    @action fetchLocation = () => {  
       try {
		 api.get('location/cities').then( res => {  
              this.locations = res.data; 
        })
    .catch(err => {
     console.log('fetch_location', err.code);
     console.log('fetch_location', err.message);
     console.log('fetch_location', err.stack);
    });
	   } catch(e) {
		console.error(e);
	   }
      }
    
      @action searchCites = (data) => {  
       try {
		 api.get('location/search', data).then( res => {  
             if(res.data.status === 200) {
                this.location = res.data; 
             } 
        })
    .catch(err => {
     console.log('search_cities', err.code);
     console.log('search_cities', err.message);
     console.log('search_cities', err.stack);
    });
	   } catch(e) {
		console.error(e);
	   }
      }
    @computed get location() {
        return  Object.keys(this.locations || {}).map(key => ({...this.locations[key], uid: key}));
 
    }
}

export default LocationStore;