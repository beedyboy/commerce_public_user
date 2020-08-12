import React, { useState, useEffect, Fragment } from 'react';  
import Aos from "aos"; 
import Footer from '../Footer'; 
import TopBar from '../TopBar';
// import { useHistory } from 'react-router-dom';

 const MainLayout = props => {
  // const history = useHistory();
  // console.log('maoin', history);
    const [isOpen, setIsOpen] = useState(false); 
    const [scroll, setScroll] = useState('');  
    const [doForm, setDoForm] = useState({
        login: 'none',
        register: 'none'
    });  
 
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
      Aos.init({ duration: 2000});
  }, []);
  
  useEffect(() => {
      if(typeof window !== "undefined") {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
      }
     
  }, []);

  const handleScroll = e => {
      const current = window.scrollY;  
    if (  current === 0 && current < 10 ) {
        setScroll('');
      }
      else  if ( current < 150 && current > 100 ) {
            setScroll('scrolled ');
          }
     else if ( current > 350 ) {
        setScroll('scrolled awake');
      } else {
        setScroll("");
      }
      
  }
  const handleForm = (old, item) => { 
    setDoForm(prevState => ({
         ...prevState,
         [old]: 'none',
         [item]: prevState[item] === 'none' ? 'block' : 'none' 
        })); 
  }
  
    return (
         <Fragment>
             <TopBar scroll={scroll} handleForm={handleForm} doForm={doForm} isOpen={isOpen} toggle={toggle} />

              
          {props.children} 

             <Footer />
         </Fragment>
    )
}
export default MainLayout;