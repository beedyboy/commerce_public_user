import React, { Fragment } from "react"; 
import Link from "next/link"; 
 
const BuyerSidebar = props => {
   
    return (
      <Fragment>
        
              <div className="profile_info">
                <div className="profile_img">
                  <img src="/assets/images/person_2.jpg" alt="profile_pic" />
                </div>
                <div className="profile_data">
                  <div className="name">Akinniyi Bolade</div>
                  <div className="role">Buyer</div>
                  <div className="btn">Update Profile</div>
                </div>
              </div>
            <ul className="sidebar_menu">
             
              <li>
              <Link href="/buyer/dashboard"> 
              <a> <div className="icon"><i className="fa fa-dashboard"></i></div>
                  <div className="title">Dashboard</div> 
                </a> 
                </Link>
              </li>

              {/* <li>
              <Link href="/buyer/my-products"> 
              <a> <div className="icon"><i className="fa fa-product-hunt"></i></div>
                  <div className="title">Products</div> 
                </a> 
                </Link>
              </li>  */}
              <li>
              <Link href="/buyer/buyer-bids"> 
              <a> <div className="icon"><i className="fa fa-gavel"></i></div>
                  <div className="title">Bids</div> 
                </a> 
                </Link>
              </li>
              <li>
              <Link href="/buyer/my-orders"> 
              <a> <div className="icon"><i className="fa fa-first-order"></i></div>
                  <div className="title">Order</div> 
                </a> 
                </Link>
              </li>

              <li>
              <Link href="/shop/staff"> 
              <a> <div className="icon"><i className="fa fa-users"></i></div>
                  <div className="title">Staff</div> 
                </a> 
                </Link>
              </li>


            </ul>
           
      </Fragment>
      
    )
  }
 
 
export default BuyerSidebar;
 