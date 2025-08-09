import reducer from './slice/productSlice'
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';
import checkoutReducer from './slice/checkoutSlice';
// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

// const { getProductSlice, getProductDetailsSlice } = reducer;

// const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const preloadedState = {
    cart: {
        cartItems: cartItemsInLocalStorage,
    },
    auth: {
        userInfo: userInfoFromStorage,
        loading: false,
        error: null,
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        checkout: checkoutReducer,
        reducer
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, })


})

export default store;