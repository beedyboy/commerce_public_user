import Axios from "axios";
import Storage from "./Storage";

Axios.defaults.withCredentials = true; 
let urls = {
    development: 'http://localhost:8000/',
    production: 'http://cloud.devprima.com/'
}
 
const  api = Axios.create({
    baseURL: urls[process.env.NODE_ENV] +'api/',
    responseType: 'json',
    timeout: 10000,
    withCredentials: true,
    headers: {
       common: {
        Authorization: `bearer ${Storage.get('token')}`
      },
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  });

  export const serverUrl = urls[process.env.NODE_ENV];
  export const ENDPOINT = urls[process.env.NODE_ENV];

  export default  api;
