import React from "react";
import  './style.css';
 
const mql = window.matchMedia(`(min-width: 800px)`);
 
const SellerSidebar = props => {
  console.log(props)  
  //   super(props);
  //   this.state = {
  //     sidebarDocked: mql.matches,
  //     sidebarOpen: false
  //   };
 
  //   this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  //   this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  // }
 
  // componentWillMount() {
  //   mql.addListener(this.mediaQueryChanged);
  // }
 
  // componentWillUnmount() {
  //   this.state.mql.removeListener(this.mediaQueryChanged);
  // }
 
  // onSetSidebarOpen(open) {
  //   this.setState({ sidebarOpen: open });
  // }
 
  // mediaQueryChanged() {
  //   this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  // }
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'sidebar open'
  }
    return (
      
      <nav className={drawerClasses}>
        <ul>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/">Users</a>
          </li>
        </ul>
      </nav>
    )
  }
 
 
export default SellerSidebar;