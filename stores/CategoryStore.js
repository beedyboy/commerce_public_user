import { observable, action, computed } from "mobx"
import api from "../services/APIService";

class CategoryStore {
  constructor() {  
    this.fetchCategory();  
   
  }
  
  @observable error = false;
  @observable filter = 'Active';
  @observable message = '';
  @observable loading = false; 

  @observable categoryList = [] 
 
  @action  fetchCategory = () => {
    try {
		this.loading = true;
    api.get('category').then( res => {  
          this.categoryList = res.data;
      this.loading = false; 
    })
    .catch(err => {
     console.log('all_cat', err.code);
     console.log('all_cat', err.message);
     console.log('all_cat', err.stack);
    });
	} catch(e) {
		console.error(e);
	}
  }

  @computed get categories() {
   return  Object.keys(this.categoryList || {}).map(key => ({...this.categoryList[key], uid: key}));
 
    }

  @computed get tagCategories() {
    let data = [];
     return  Object.keys(this.categoryList || {})
     .map(key => (
                  {
                    value: this.categoryList[key].name,
                    label: this.categoryList[key].name}
                  )); 
  }
  

}  
 
export default CategoryStore;
