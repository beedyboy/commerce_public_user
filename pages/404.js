import React from 'react';

export default function NotFound(){
    return (
        <div className="container-fluid text-center">
    <div className="row">
        <div className="col-md-6 pull-right">
             {/* <img src="https://i.imgur.com/1dJs49H.png" width="400" className="mt-2" /> */}
              </div>
        <div className="col-md-6">
            <div className="pull-left">
                <h1 className="not-found">404</h1>
                <h3>Page you are looking for is not found!</h3>
                <div className="text-center mt-4 mb-5">
                 <button className="btn btn-success send px-3"><i className="fa fa-long-arrow-left mr-1"></i> Home page</button>
                  <button className="btn btn-success send ml-2 px-3"><i className="fa fa-phone mr-1"></i> Contact us</button> </div>
            </div>
        </div>
    </div>
</div>
    )
} 

 
{/* 
body {
    display: grid;
    place-items: center;
    font-family: 'Manrope', sans-serif;
    background: #FF5252;
    color: #fff
}

.not-found {
    font-size: 220px;
    font-weight: 700
} 
 
.send {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border-radius: 1px;
    box-shadow: 2px 3px #dc3545
}

.send:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border-radius: 1px;
    box-shadow: 2px 3px #dc3545
} */}