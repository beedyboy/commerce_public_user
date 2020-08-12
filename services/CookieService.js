import Cookie from 'universal-cookie'; 
const cookie = new Cookie();   
const CookieService = {
    save:(key, value, options) => {
        cookie.set(key, value, options);
    },
    get:(key) => {
        return cookie.get(key);
    }, 
    remove:(key) => {
        cookie.remove(key, {path: "/"});
    },
    logout: () => {
        cookie.remove('access_token', {path: "/"});  
        window.location.href = '/'; 
    }
} 
export default CookieService;