import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CART_INITIAL_STATE = ({
    cartItems: []
})

export const addToCartThunk = createAsyncThunk(
    'CartProduct/addToCartThunk',
    async ({ addCartId, qty }, { getState }) => {


        const { data } = await axios.get(`http://localhost:5000/api/products/${addCartId}`);


        const addCartData = {
            product: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }


        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))

        return (addCartData);
    }

)

export const removeToCartThunk = createAsyncThunk(
    'CartProduct/removeToCartThunk',
    async (paylod, { getState }) => {
        const removeCartData = paylod
        // console.log("🚀 ~ file: cartSlice.js ~ line 37 ~ paylod", paylod)

        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
        return (removeCartData)
    }
)

export const AddToCartSlice = createSlice({
    name: 'CartProduct',
    initialState: CART_INITIAL_STATE,
    reducers: {
        clearCart(state) {
            state.cartItems = []
            try { localStorage.removeItem('cart') } catch (e) {}
        }
    },
    extraReducers: {
        [addToCartThunk.pending]: (state) => {
        },
        [addToCartThunk.fulfilled]: (state, action) => {
            const item = action.payload;


            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {

                state.cartItems = [...state.cartItems]
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x)

            } else {

                state.cartItems = [...state.cartItems]
                state.cartItems = [...state.cartItems, item]

            }


        },
        [removeToCartThunk.fulfilled]: (state, action) => {

            state.cartItems = [...state.cartItems]
            // console.log("🚀 ~ file: cartSlice.js ~ line 75 ~ state.cartItems", state.cartItems)
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)
            // console.log("🚀 ~ file: cartSlice.js ~ line 76 ~ action.payload", action.payload)

        }

    }
})

export const { clearCart } = AddToCartSlice.actions
const cartReducer = AddToCartSlice.reducer
export default cartReducer;
