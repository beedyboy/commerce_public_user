import { decorate, observable, action, computed, reaction } from "mobx"

import api from "../services/APIService";

class MemberStore {
  constructor() {  
    this.fetchMember();  
    reaction(() => this.members, _ => console.log(this.members.length))
  }
  
     error = false;
     filter = 'ALL';
     message = '';
     loading = false;
     sent = false;

     members = [] 

     setFilter = (data) => {
     	this.filter = data;
     }

    fetchMember = () => { 
    this.loading = true;
    api.get('member').then( res => {  
          this.members = res.data;
      this.loading = false;
        
    }); 
  }

   removeMember = (id) => { 
    api.delete('member/' + id).then( res => {
      if(res.status === 200) {
        this.fetchMember();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredMember() {
    switch (this.filter) {
      case 'ALL':
        return this.members;
      case 'Active':
        return this.members.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.members.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.members.filter(s => s.section === 'Deleted');

      default:
        return this.members;
    }
  }
  get info() {
  	return {
      total: this.members.length,
      status: this.members.filter(cat => cat.status).length,
      // notstatus: this.members.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(MemberStore, { 
  message: observable,
  error: observable,
  filter: observable,
  filteredMember: computed,
  info: computed,
  sent: observable,
  loading: observable,
  members: observable, 
  fetchMember: action,
  removeMember: action,
  setFilter: action
})

 
export default createContext(new MemberStore())
