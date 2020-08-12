// import { useStaticRendering } from 'mobx-react';
import {useLocalStore, useObserver} from 'mobx-react';
import Auth from './AuthStore';
import CategoryStore from './CategoryStore';
import ChatStore from './ChatStore';
import LocationStore from './LocationStore';
import OrderStore from './OrderStore';
import ProductStore from './ProductStore';
import UserStore from './UserStore';

const isServer = typeof window === 'undefined';
// useStaticRendering(isServer);

let store;

export  function getStores(initialData = { productStore: {}, categoryStore: {}, chatStore: {}, userStore: {} }) {

    if(isServer) {
        return {
            authStore: new Auth(),
            productStore: new ProductStore(initialData.ProductStore),
            categoryStore: new CategoryStore(initialData.categoryStore),
            chatStore: new ChatStore(initialData.chatStore),
            locationStore: new LocationStore(initialData.locationStore),
            orderStore: new OrderStore(initialData.orderStore),
            userStore: new UserStore(initialData.userStore)
        };
    }
    if(!store) {
        store = {
            authStore: new Auth(),
            productStore: new ProductStore(initialData.ProductStore),
            categoryStore: new CategoryStore(initialData.categoryStore),
            chatStore: new ChatStore(initialData.chatStore),
            locationStore: new LocationStore(initialData.locationStore),
            orderStore: new OrderStore(initialData.orderStore),
            userStore: new UserStore(initialData.userStore)
        };
    }
    return store;
}

const StoreContext = React.createContext();

export function StoreProvider(props) {
    return <StoreContext.Provider value={props.value}>
        {props.children}
    </StoreContext.Provider>
}


 

export function useMobxStores() {
    return React.useContext(StoreContext);
}