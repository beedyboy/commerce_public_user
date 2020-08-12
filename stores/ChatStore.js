import {  observable, action, computed } from "mobx" 
import api from "../services/APIService";
 

class ChatStore {
  constructor() {  
    console.log(this.message) 
  }
  
   @observable  error = false; 
   @observable  response = false;
   @observable  message = 'yes message';
   @observable  messages= [];
   @observable  loading = false;
   @observable  sent = false; 
    @observable chats = [];
    @observable chatBoxes = [];
    @observable chatUsers = [];
     
     @action setChatBoxes = (boxes) => {
      this.chatBoxes = boxes;
     }
  
 @action getMessages = (data) => {  
    try {
   this.loading = true;
    api.get('chat/getMessages').then( res => {  
      
       this.messages = res.data.data; 
        
    })
    .catch(err => {
     console.log('getMessages', err.code);
     console.log('getMessages', err.message);
     console.log('getMessages', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }


} 
 
export default ChatStore
