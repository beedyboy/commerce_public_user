import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; 
import './../public/assets/css/style.css';
import './../public/assets/css/profile.css';
import './../public/assets/css/chat.css';
import './../public/assets/css/flip.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-fancybox/lib/fancybox.css'
import 'font-awesome/css/font-awesome.min.css';
import 'aos/dist/aos.css'; 
import { getStores, StoreProvider } from '../stores/stores';  
import Responder  from '../services/Beedy';
import ChatWindow  from '../services/Chatter';
// import { Responder } from '../services/Beedy';
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from '../theme'; 
// import { Provider } from 'mobx-react'  


export default function MyApp(props) {
  const { Component, pageProps } = props; 
  const store = getStores();

  //make stores available to all pages 


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Ecommerce</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3rf9nGVSK2Zz8lQndk-rGrHhDpE-kp14&libraries=places"></script>
    
      </Head>
      {/* <button onClick={() =>Beedy('warning', 'is it working')} >Click </button> */}
      <Responder />
      <StoreProvider value={store}> 
        <ChatWindow {...pageProps} />
        <Component {...pageProps} />
      </StoreProvider>
      {/* <ThemeProvider theme={theme}>
       
        <CssBaseline />
        <StoreProvider value={store}> 
             <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider> */}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

//  <Provider store={store}>