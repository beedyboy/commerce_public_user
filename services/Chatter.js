import React, { useState, Fragment, useEffect } from 'react';
import ee from 'event-emitter'; 
import { observer } from 'mobx-react'   
import io from 'socket.io-client';
import styles from './Chatter.module.css';
import { useMobxStores } from "../stores/stores";
import MessageBox from "../components/Chats/MessageBox"
// import ENDPOINT from './APIService'
const emitter = new ee(); 

export const Chatter = (user) => {  
    emitter.emit('chatNow', user);
}
 let socket;
const ChatWindow = props => { 
     const { chatStore } = useMobxStores(); 
     const { message, chatBoxes, chats, setChatBoxes, getMessages } = chatStore;
     
    const ENDPOINT = 'localhost:8000';
     //const { chatBoxes, setChatBoxes } = chatStore;
     //const [chatBoxes, setChatBoxes] = useState([]);
 //console.log(chatStore); 
  useEffect(() => {
   socket = io(ENDPOINT);
         
       emitter.on('chatNow', ( user) => {
            console.log('user now', user);
            // console.log('store msg',message);
            chatWith(user)
        }); 

        return () => {
            //socket.emit('disconnect');

            socket.off();
        }
    }, []);
     //console.log('chats',chats);


const chatWith = (user) => {
  console.log('user',user);
 socket.emit("user_connected", { user }, () => {
  console.log('connected')
 });
	createChatBox(user);
}
const createChatBox = (user) => {
	const cid = "chatbox_"+user;
 getMessages(user);
	if(chatBoxes.indexOf(cid) === -1) {
		//does not exist
	 let boxes = chatBoxes;
	 chatBoxes.push(cid);
	 setChatBoxes(boxes);
	 console.log(boxes);
	} else {
  //show box and focus
	 
	}
}
 
const toggleChat = (e, v) => {
 e.persist()
 const children = e.target.parentNode.parentNode.children; 
 console.log(children[1].style);
 
 if (children[1].style.display === "none") { 
  children[1].style.display = "block";
 } else { 
 children[1].style.display = "none";
 }
}

const closeChat = (e, v) => {
 e.persist() 
 var newBox = chatBoxes;
 const index = newBox.indexOf(v);
 if (index > -1) {
	newBox.splice(index, 1);
 } 
	 setChatBoxes(newBox);
}
const showChat = () => {
 var size = chatBoxes.length;
 return chatBoxes && chatBoxes.slice(0,5).map((v, i) => { 
 let width = 15;
 if (size > 1) {
  width = (i) * (225+7) + 20; 
 } else {
  width  = 20;
 }
  return (
   <div className={styles.chatPopup} style={{right: width+'px'}} key={i}>
     
     <div className={styles.infoBar} id={v}>
      <div className={styles.leftInnerContainer} onClick={(e) => toggleChat(e,v )}>{v}</div>
       <div className={styles.rightInnerContainer}>
         <a> <i className="fa fa-times" onClick={(e) => closeChat(e,v )}></i> </a>
        </div>
     </div>
      
    <div className={styles.chatBoxContent}>
    <MessageBox messages={messages} />
       {v}
    </div>
   </div>
 
  );
    
  })
}
	
  var size = chatBoxes.length;
  console.log('size', size, props)
 return (
		<Fragment>
   
  {/*{showChat()} */}
  {chatBoxes && chatBoxes.slice(0,5).map((v, i) => { 
   let width = 15;
  {size > 1 ?  width = (i) * (225+7) + 20 : width  = 20  }
  return (
   <div className={styles.chatPopup} style={{right: width+'px'}} key={i}>
     
     <div className={styles.infoBar} id={v}>
      <div className={styles.leftInnerContainer} onClick={(e) => toggleChat(e,v )}>{v}</div>
       <div className={styles.rightInnerContainer}>
         <a> <i className="fa fa-times" onClick={(e) => closeChat(e,v )}></i> </a>
        </div>
     </div>
      
    <div className={styles.chatBoxContent}>
       {v}
    </div>
   </div>
 
  );
    
  })
  }

		</Fragment>
	);
};

export default observer(ChatWindow);