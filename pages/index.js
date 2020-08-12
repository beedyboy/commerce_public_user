import React  from 'react'; 
import Head from 'next/head';   
import MainLayout from '../templates/Main/components/Layout/MainLayout'; 
import LandingPage from '../components/Home/LandingPage';

function Home() {  
return (
    <> 
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head> 
    <MainLayout> 
        <LandingPage/>
</MainLayout>
    </> 
)
}


export default Home;
