import React from 'react'; 
//import './Message.css';
 import ReactEmoji from 'react-emoji';
const Message = ({ data: { buyer_id, seller_id, sender, message, id, created_at } }) =>   {
    let isSentByCurrentUser = false; 
    if(sender === "Buyer") {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
			 <div className="media media-chat"> 
				<div className="media-body">
					<p> {ReactEmoji.emojify(message)} </p>
					<p className="meta"><time datetime="2018">{created_at}</time></p>
				</div>
			</div>
           
        )
        : (
			 <div className="media media-chat media-chat-reverse">
				<div className="media-body">
					 <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
					<p className="meta"><time datetime="2018">{created_at}</time></p>
				</div>
			</div>
						
             
        )

    )
}

export default Message;