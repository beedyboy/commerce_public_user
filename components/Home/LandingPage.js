import React, { Fragment, useState, useEffect, useRef } from 'react';
import shortId from 'short-id';
import { 
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button 
} from 'reactstrap';  
import Link from 'next/link'; 
import { useMobxStores } from '../../stores/stores';
import { observer } from 'mobx-react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import useOnclickOutside from "react-cool-onclickoutside";
import ListCard  from '../Product/Card/ListCard';
 const LandingPage = () => {  
    const { categoryStore, productStore } = useMobxStores();  
    const { categories } = categoryStore;  
    const homeProducts = productStore.homeProducts;  
    const [search, setSearch] = useState('');
    const [formState, setFormState] = useState({
        latitude: '',
        longitude: '',
        price: '',
        quantity: '',
        delivery: '',
        packed: '',
        cat_id:''
    });
  const { ready, value, suggestions: { status, data},
  setValue, clearSuggestions
 } = usePlacesAutocomplete({requestOptions: {
    // define search engnie scope
  },
  debounce: 300
});
   const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
    let count = homeProducts.length;
    const wrapper = useRef(null); 

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleClickOutside = event => {
        const { current: wrap } = wrapper;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    }
    //const changeLocation = event => {
    //    event.persist();
    //    const q = event.target.value;
    //    setSearch(q);
    //    console.log(q.length)
    //    q.length > 1 ? filterLocation() : null;
    //}
    //const filterLocation = () => { 
    //    let p =  location.filter(( { name }) => name.indexOf(search.toLowerCase()) > 1 ) 
    //    setOptions(p); 
    //}

    const handleChange = () => {

    }
    const handleSearch = () => {

    } 
  
const changeLocation = (e) => {
setValue(e.target.value);
}
const handleSelect = ({ description }) => () => {
  setValue(description, false);
  clearSuggestions();
  // get latitude and longitude
  getGeocode({ address: description})
  .then((results) => getLatLng(results[0]))
  .then(({ lat, lng} ) => {
    console.log("Coordinates: ", {lat, lng });
     setFormState(formState => ({
          ...formState,
          latitude: lat,
          longitude: lng
        }));
  }); 
}
const renderSuggestions = () => 
 data.map((suggestion) => {
   const { id,structured_formatting: { main_text, secondary_text} } = suggestion; 
   return (
     <li key={shortId.generate()} onClick={handleSelect(suggestion)}>
       <strong>{main_text}</strong> <small>{secondary_text}</small>
     </li>
   );
 });
    
    return (
         <Fragment>
                        
            <section  className="site-hero overlay" style={{backgroundImage: `url(/assets/images/banner.jpg)`}} data-stellar-background-ratio="0.5" id="section-home">
            
            <div className="container">
            <div className="row site-hero-inner justify-content-center align-items-center">
            <div className="col-md-10 text-center" data-aos="fade-up">
            <h1 className="heading">Smile</h1>
            <h3 className="text-white font-weight-bold" data-aos-delay="200">what more could you ask for after every transaction</h3>
            </div>
            </div>
            </div>
            <a className="mouse smoothscroll" href="#next">
            <div className="mouse-icon">
            <span className="mouse-wheel"></span>
            </div>
            </a>
            </section> 
            <section className="section bg-light pb-0">
            <Container>
            <Row className="check-availabilty" id="next">
            <div className="block-32" data-aos="fade-up" data-aos-offset="-200">
            <Form>
                <Row>
                    
                    <Col md="3" lg="3" className="mb-lg-0">
                        <Label for="location" className="font-weight-bold text-black">Location</Label>
                        <div  className="field-icon-wrap">
                            <div className="icon"><span className="icon-calendar"></span></div>
                             <div ref={ref}>
                             <Input
                               value={value}
                               onChange={changeLocation}
                               disabled={!ready}
                               placeholder="Location"
                               />
                               {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                             </div> 
                            </div> 
                    </Col> 
                    <Col md="3" lg="3" className="mb-lg-0">
                        <Label for="checkout_date" className="font-weight-bold text-black">Category</Label>
                        <div className="field-icon-wrap">
                            <div className="icon"><span className="icon-calendar"></span></div>
                            <Input
                                type="select" 
                                value={formState.cat_id || ''}
                                name="cat_id"
                                id="cat_id" 
                                onChange={handleChange}>
                                 <option value="" key="ct">select</option>
                                {categories && categories.map(cat => (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                ))}
                     </Input>
                            </div>
                    </Col>
                    <Col md="2" lg="2" className="mb-lg-0">
                        <Label for="checkout_date" className="font-weight-bold text-black">Qty</Label>
                        <div className="field-icon-wrap">
                            <div className="icon"><span className="icon-calendar"></span></div>
                            <Input type="text"  value={formState.quantity || ''} onChange={handleChange} name="quantity" className="form-control" />
                            </div>
                    </Col>
                    <Col md="2" lg="2" className="mb-lg-0">
                        <Label for="checkout_date" className="font-weight-bold text-black">Price</Label>
                        <div className="field-icon-wrap">
                            <div className="icon"><span className="icon-calendar"></span></div>
                            <Input type="text"  value={formState.price || ''} onChange={handleChange} name="price" className="form-control" />
                            </div>
                    </Col>
                    <Col md="3" lg="2" className=" align-self-end"> 
                        <Button color="primary"
                        onClick={handleSearch}
                         className="text-white">
                        Search
                        </Button> 
                    </Col>
                </Row>
            </Form>
            </div>

            </Row>
            </Container>
            </section>
 
            <section className="py-2 bg-light" id="section-about">
            <Container>
            <Row className="align-items-center">
                <Col md="12" lg={{ size: 7, order: 2}} className="position-relative mb-5 ml-auto" data-aos="fade-up">
                <img src="/assets/images/hero_4.jpg" alt="hey there" className="img-fluid rounded" />
                </Col>
                <Col md="12" lg={{size: 4, order: 1}} data-aos="fade-up">
                <h2 className="heading mb-4">Hey there!</h2>
                <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    <p><a href="https://vimeo.com/channels/staffpicks/93951774" data-fancybox className="btn btn-primary text-white py-2 mr-3 text-uppercase letter-spacing-1">Watch the video</a></p>
                </Col>
            </Row>
            </Container>
            </section>
            <section className="py-2 bg-light" id="section-about">
            <Container className="container section" id="section-team">
            <Row  className="justify-content-center text-center mb-2">
            <Col md="7" className="mb-1">
                <h2 className="heading" data-aos="fade-up">Featured Products</h2>
            </Col> 
            </Row>
            <Row>
                {count > 0 ?
                <>
                    {homeProducts && homeProducts.map((product) =>
                    <ListCard product={product} key={product.id} /> 
                    )}
                </>
                    : 
                   ( 
                   <Col md="12">
                        <h1>
                        Product is empty at the moment
                    </h1>
                   </Col>
                  )
                  }

                </Row> 
            </Container> 
            </section>
    {/* get started  */}
            <section className="py-2 bg-light" id="section-about">
                <Container>
                    <Row>
                        <Col md="6">   
                    <figure className="img-wrap">
                    <img src="/assets/images/buyer.jpg" alt="Free website template"  className="img-fluid rounded mb-3"/>
                    </figure>
                    <div className="p-3 text-center room-info">
                        Are you interested in getting amazing stuffs!!!
                        <p>
                        Click the below buttton now
                        </p> 
                    <Button color="info"  className="text-uppercase letter-spacing-1">Be a Buyer</Button>
                        
                    </div> 
                    </Col>

                        <Col md="6">
                        <figure className="img-wrap">
                    <img src="/assets/images/signing-shipping-forms-for-large-box.jpg" alt="Free website template" className="img-fluid mb-3"/>
                    </figure>
                    <div className="p-3 text-center room-info">
                       Do you know you are just a click away from being a seller?
                        <p>
                        Oh :) what are you waiting for?  
                        </p> 
                    <Button color="info"  className="text-uppercase letter-spacing-1">Get started</Button>
                        
                    </div>  
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className="section" id="section-rooms">
            <Container>
            <Row className="justify-content-center text-center mb-1">
            <Col md="12"> 
                <h2 className="heading" data-aos="fade-up">Trending Products</h2>
                {/* <p data-aos="fade-up" data-aos-delay="100">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p> */}
            </Col>
            </Row>
             <Row>
                {count > 0 ?
                <>
                    {homeProducts && homeProducts.map((product) =>
                    <ListCard product={product} key={product.id} /> 
                    )}
                </>
                    : 
                   ( 
                   <Col md="12" data-aos="fade-up">
                        <h1>
                        Product is empty at the moment
                    </h1>
                   </Col>
                  )
                  }

                </Row>
         </Container>  
            </section>

            <section className="section bg-image overlay" style={{backgroundImage: `url(/assets/images/hero_4.jpg)`}}> 
            <Container>
            <Row className="align-items-center">
                <Col md="6" lg="12" className="text-center mb-4 mb-md-0 text-md-left" data-aos="fade-up">
                <h2 className="text-white font-weight-bold">Don't enjoy all the luxuries alone</h2>
                </Col>
                <Col md="6" lg="12" className="text-center text-md-right" data-aos="fade-up" data-aos-delay="200">
               <Link href="#">
               <a className="btn btn-outline-white-primary py-3 text-white px-5" data-toggle="modal" data-target="#reservation-form">Tell a friend Now</a>
               </Link>
                </Col>
            </Row>
            </Container> 
            </section>

         </Fragment>
    )
}

export default observer(LandingPage);