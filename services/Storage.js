const Storage = {
    save:(key, value) => {
        typeof window !== 'undefined' ?    localStorage.setItem(key, value)
    : null 
},
    get:(key) => {
      return  typeof window !== 'undefined' ?     localStorage.getItem(key)
    : null 
},
    clear:() => {
        typeof window !== 'undefined' ?    localStorage.clear()
    : null 
},
    remove:(key) => {
        typeof window !== 'undefined' ?    localStorage.removeItem(key)
    : null 
},
    logout:(key) => {
        typeof window !== 'undefined' ?    localStorage.removeItem('token')
   : null 
 }
}
module.exports = Storage;
 
