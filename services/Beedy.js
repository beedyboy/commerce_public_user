import React, { useState, Fragment, useEffect } from 'react';
import ee from 'event-emitter';


const emitter = new ee();
export const Beedy = (type, message) => {
    emitter.emit('notification', type, message)
}
const Responder = () => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('success');
    const [message, setMessage] = useState('');
     
    let icon = 'info';
    useEffect(() => {
        emitter.on('notification', (type, message) => {
            handleAlert(type, message);
        });
    }, []);
    if (type === 'success') {
        icon = 'thumbs-up';
    } else if (type === 'warning') {
        icon = 'warning';
    }
    const handleAlert = (type, message) => {
        setMessage(message);
        setType(type);
        setShow(true);
    }
    const closeAlert = () => {
        setMessage('');
        setType('info');
        setShow(false);
    }
    return (
        <Fragment>
             {show ? 
                <div className="beedy-alert-container">
                <div className={`beedy-alert ${type}`}>
                    <span>
                    <i className={`fa fa-${icon} icon`}></i>
                    </span> 
                    <span className="title">Message</span>
                    <h1> {message} </h1> 
                <button className="btn btn-secondary" onClick={closeAlert}>Close</button>
                </div>
               
            </div>
            :
            null
        }
        </Fragment>
       
    )
}

 

export default Responder;