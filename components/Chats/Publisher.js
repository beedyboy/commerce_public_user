import React from 'react';
import styles from './Publisher.module.css';
 
const Publisher = ({ message, setMessage, sendMessage }) =>  (
     <form classNameName={styles.form}>
        <div className={` ${styles.publisher} ${styles.borderLight} ${styles.bt1} `}>
          <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
          
          <input className={` ${styles.publisherInput} ${styles.input} `}
             type="text" placeholder="Write something"
             value={message} onChange={(event) => setMessage(event.target.value)} 
             onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
           />
          <span className={`${styles.publisherButton} ${styles.fileGroup} `}>
           <i className="fa fa-paperclip file-browser"></i> <input type="file" className={styles.input}>
          </span>
          <a className={styles.publisherButton} href="#" data-abc="true"><i className="fa fa-smile"></i></a>
          <span className={`${styles.publisherButton} ${styles.textInfo} `}  data-abc="true"
           onClick={(event) => sendMessage(event)}>
           <i className="fa fa-paper-plane"></i>
          </span>
   </div>
     </form>
)

export default Publisher;


 
                