import React, { useState, Fragment, useEffect, useRef } from "react";  
import Head from 'next/head';  
import shortId from 'short-id';
import { Row, Container, Col, Form, Card, CardHeader, CardBody, FormGroup, Input, Label, CardFooter, FormText, CustomInput, Button } from "reactstrap";
import Select from 'react-select';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import useOnclickOutside from "react-cool-onclickoutside";
import dataHero from "data-hero";   
import { useMobxStores } from "../../stores/stores";
import styles from './add-product.module.css';   
import { SellerLayout } from "../../templates";
const schema = {
    name:  {
        isEmpty: false,
        min: 1,
        message: 'A valid product name is required'
      },
      cat_id:  {
        min: 1,
        message: 'Category is required'
      } 
  }; 
const AddProduct = () => {
  const { categoryStore, productStore } = useMobxStores(); 
  const { saveProduct, sending, saved, refreshForm } = productStore; 
  const { categories, tagCategories } = categoryStore;  
  const editorRef= useRef();
  const mainInput = useRef('');
  const firstInput = useRef('');
  
  const {  CKEditor, ClassicEditor } = editorRef.current || {};

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [description, setDescription] = useState('');
  const [mainCat, setMainCat] = useState(null);
  const [tags, setTags] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const [uploadImage, setUploadImage] = useState({
    images: {
      'main': {preview: '', file: 'choose file'},
      'first': {preview: '', file: ''},
      'middle': {preview: '', file: ''},
      'last': {preview: '', file: ''}
    }
  });

    const [formState, setFormState] = useState({
        isValid: false, 
        values: {
          id: '', name: '',  cat_id: '', available: '', latitude: '', longitude: ''},
        touched: {},
        errors: {}
      });
    useEffect(() => {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react'),
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
      }
      setEditorLoaded(true)
    }, [])
      useEffect(() => {
        const errors = dataHero.validate(schema, formState.values);  
        setFormState(formState => ({
          ...formState,
          isValid: errors.name.error || errors.available.error ?  false: true,
          errors: errors || {}
        }));
      }, [formState.values]);
       
       useEffect(() => {
          if (saved === true) {
            handleReset();      
		  }
        return () => {
          refreshForm();
        }
       }, [saved])
      const handlePreUpload = (e, name) => {
        e.preventDefault();  
        if(name === 'main') {
          mainInput.current.click();
         } else if(name === 'first') {
         firstInput.current.click();
         }
      }
    const handleTag = e => { 
        setTags(Array.isArray(e) ? e.map(x => x.value) : []); 
        // console.log(tags);
    }
      
const handleChange = event => {
    event.persist(); 
    const field = event.target.name;
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    // console.log(field,  ': ',  event.target.type === 'checkbox'
    ? event.target.checked
    : event.target.value)
    switch (field) {
        case 'cat_id':
            getCatName(event.target.value);
            break; 
        default:
            break;
    }
  }

  const getCatName = (id) => { 
   let data = categories.filter(s => s.id == id);  
   setMainCat(data[0].name);
  }

  const onEditorStateChange = (e, editor) => {
    const data = editor.getData(); 
      setDescription(data); 
  }
const readURI = (e) => {
    if (e.target.files) { 
        /* Get files in array form */
        const files = Array.from(e.target.files); 
        /* Map each file to a promise that resolves to an array of image URI's */ 
        Promise.all(files.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => { 
            /* Once all promises are resolved, update state with image URI array */
            setImageArray( images )

        }, error => {        
            console.error(error);
        });
    }
}
  const buildImgTag = () => {

    return <div className="photo-container">
    { 
     imageArray.map(imageURI => 
      (<img className="photo-uploaded" src={imageURI} alt="Photo uploaded"/>)) 
    }
    </div>
}
  const handleUpload = e => {
    e.persist(); 
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => { 
      setUploadImage( state =>  ({
        ...state,
        images: {
          ...state.images,
          [e.target.name]: {
            preview: reader.result,
            file: image
          }
        }
      }) );
    }
   reader.readAsDataURL(image);
  }
  
 
  const createProduct = e => {
    e.preventDefault();
    const fd = new FormData();  
    fd.append('main_image', uploadImage.images.main.file);
    fd.append('first_image', uploadImage.images.first.file);
    fd.append('description', description);
    fd.append('tags', JSON.stringify(tags));
    fd.append('mainCat', mainCat); 
    fd.append('name', formState.values.name);
    fd.append('cat_id', formState.values.cat_id); 
    fd.append('location', formState.values.location); 
    saveProduct(fd); 
  }
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

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
      values: {
        ...formState.values,
            latitude: lat,
          longitude: lng
        }
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
const handleSelect = ({ description }) => () => {
  setValue(description, false);
  clearSuggestions();
  // get latitude and longitude
  getGeocode({ address: description})
  .then((results) => getLatLng(results[0]))
  .then(({ lat, lng} ) => {
    console.log("Coordinates: ", {lat, lng });
  });
  // AIzaSyA3rf9nGVSK2Zz8lQndk-rGrHhDpE-kp14
}
const renderSuggestions = () => 
 data.map((suggestion) => {
   const { id,structured_formatting: { main_text, secondary_text} } = suggestion;

   return (
     <li key={id} onClick={handleSelect(suggestion)}>
       <strong>{main_text}</strong> <small>{secondary_text}</small>
     </li>
   );
 });
    
const handleReset = () => {
         setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
         id: '',
          name: '',  cat_id: '', available: '', location: '',  price: '',
          packed: '', first_delivery: false, second_delivery: false, third_delivery: false, within_distance: '', within_charge:'', beyond_distance: '', beyond_charge:''
       
      } 
    }));
     
      setUploadImage(state => ({
        ...state,
         images: {
      'main': {preview: '', file: 'choose file'},
      'first': {preview: '', file: ''},
      'middle': {preview: '', file: ''},
      'last': {preview: '', file: ''}
    }
      }));
      setDescription('');
      setTags('');
      setMainCat(null);
  }
    return (
    <Fragment>
      <Head>
           <title>Add Product</title> 
      </Head>
      <SellerLayout>
      <Container>
           <CardHeader>
                <h4>New Product</h4> 
                </CardHeader>
        <Form onSubmit={createProduct}>
      <Row>
      <Col md="6" lg="6" sm="12">
        <Card>
          <CardBody>
            <Row>
              <Col md="12" sm="12">
              <FormGroup  className={
                    hasError('name') ? 'has-danger' : null} >
                  <Label>Product Name</Label>
                  <Input
                      type="text" 
                      value={formState.values.name || ''}
                      name="name"
                      id="catName"
                      onChange={handleChange}
                      placeholder="Product Name"
                      />
                <FormText>
                  <p className="text-danger">{  hasError('name') ? formState.errors.name && formState.errors.name.message : null } </p>
               </FormText>
              </FormGroup>
              </Col>
              </Row>
               

            <Row>
              <Col md="12">
              <FormGroup  className={
                    hasError('cat_id') ? 'has-danger' : null} >
                    <Label for="cat_id">Category</Label>
                    <Input
                    type="select" 
                    value={formState.values.cat_id || ''}
                    name="cat_id"
                    id="cat_id" 
                    onChange={handleChange}>
                        <option value="" key="ct">select</option>
                        {categories && categories.map(cat => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                        ))}
                     </Input>
          </FormGroup> 
          <FormGroup>
              <Label>Feature other categories</Label>
              <Select
                 placeholder="Select Option"
                 name="tags"
                 value={tagCategories.filter(obj => tags.includes(obj.value))}
                 isMulti="true"
                 onChange={handleTag}
                 options={tagCategories} 
               />
               {tags && <div style={{marginTop: 20, lineHeight: '25px'}}>
                <FormText>
                 <b>Selected value: </b> {JSON.stringify(tags, null, 2)}
                 </FormText>
                 </div>}
          </FormGroup>
              </Col>

            </Row>
           </CardBody>
        </Card>

        {/* second Card */}
        <Card>
          <CardHeader> 
          <h4>Delivery and location</h4>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="12" sm="12">
              <FormGroup>
                    <Label for="location">Location</Label>
                    <div ref={ref}>
                      <Input
                        value={value}
                        onChange={changeLocation}
                        disabled={!ready}
                        placeholder="Where is your product?"
                        />
                        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                    </div>
                  {/*  <Input
                    type="select" 
                    value={formState.values.location || ''}
                    name="location"
                    id="location" 
                    onChange={handleChange}>
                        <option value="">select</option>
                        {location && location.map(loc => (
                        <option value={loc.id} key={loc.id}>{loc.name}</option>
                        ))}
                     </Input>
                     */}
          </FormGroup> 
              </Col> 
            </Row> 
          </CardBody>
        </Card>
      </Col>

      {/* second column */}
      <Col md="6" lg="6" sm="12">
        <Card>
          <CardBody>
          <Row>      
            <Col md="12" sm="12">
            <div className={styles.beedy}>
                <div className={styles.imagePreview}>
                   {buildImgTag()}
                </div>
                </div> 
            <input
            type="file"
              accept="image/*"
              name="main"
              id="main"
              onChange={(e)=> handleUpload(e)}
              className={styles.beedyInput}
              ref={mainInput}
            />
            <Label for="main"> 
              <Button type="button" color="secondary"
                    size="small" 
                    aria-label="add"
                    onClick={(e) => handlePreUpload(e, 'main')}
                    variant="extended">
                    <span> Choose Main File  <i className="fa fa-camera"></i></span>
               
              </Button>
            </Label>                
            </Col>              
         </Row>
          {editorLoaded ? (
                                <Row>
           <Col md="12">
             <FormGroup>
               <Label>Description</Label>
               <CKEditor
                editor={ClassicEditor}
                data={description} 
                onChange={onEditorStateChange}  />
             </FormGroup>
           </Col>
         </Row>
         ) : (
          <div>Editor loading </div>
         )
      } 
         <Row>
           <Col md="12">
           <FormGroup check>
                    <Label check> 
                    <Input value={formState.values.packed} type="radio" id="packed" onChange={handlePackedChange} name="packed" />{' '}
                    PACKED
                     </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check> 
                    <Input value={formState.values.packed} type="radio" id="unpacked" onChange={handlePackedChange} name="packed" />{' '}
                    UNPACKED
                     </Label> 
                </FormGroup> 
                 
           </Col>
         </Row>
          </CardBody>
        </Card>
      </Col>
      </Row>
 
    <CardFooter>
    <Button color="primary" disabled={!formState.isValid || sending } 
        type="submit">
            Save changes
    </Button>
    {/* <Button color="primary" disabled={!formState.isValid || sending} 
        type="submit" 
        onClick={mode === 'Add'? addCategory : updateCategory}>
            Save changes
    </Button> */}
    </CardFooter>
          
        </Form>
        {/* <label htmlFor="contained-button-file">
                 
                 <Fab color="secondary"
                       size="small"
                       component="span"
                       aria-label="add"
                       variant="extended">
                  {filename} <AddPhotoAlternateIcon />
                 </Fab>
               </label> */}
        </Container>
      </SellerLayout>
      
    </Fragment>
     
    )
}

export default AddProduct
