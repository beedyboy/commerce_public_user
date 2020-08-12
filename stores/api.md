## `API GUIDE`
```
This is to guide the frontend developers on the available apis (links, method and payload)
```
### `Return code`
- 200  `Request was performed and okay as expected `
- 400   `Not found | false `
- 401   `Unauthorized`
- 403   `Access is forbidden` 

### `API`
- Auth `POST`
```
email and password as payload
```

### `AOB`

**Note: Api link has been set, just add the controller you wish to call to axios !**
Example of a simple payload
payload: {
    name: "My name",
    gender: "Male",
    id: 2
}