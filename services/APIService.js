import Axios from "axios";
import Storage from "./Storage";

Axios.defaults.withCredentials = true; 
let urls = {
    development: 'http://localhost:8000/',
    production: 'https://bclient-server.herokuapp.com/'
}
 
const  api = Axios.create({
    baseURL: urls.development +'api/',
    responseType: 'json',
    // timeout: 10000,
    withCredentials: true,
    headers: {
       common: {
        Authorization: `Bearer ${Storage.get('token')}`
      },
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  });

  export const serverUrl = urls.development;
  export const ENDPOINT = urls.development;

  export default  api;
