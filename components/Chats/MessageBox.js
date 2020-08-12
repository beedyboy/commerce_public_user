import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

//import './Messages.css';

const MessageBox = ({ messages }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message data={message} /></div>)}
  </ScrollToBottom>
);

export default MessageBox;