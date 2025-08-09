
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { combineReducers } from 'redux';


export const getProductsThunk = createAsyncThunk(
    'getProduct/getProductsThunk',
    async (paylod) => {


        try {

            const response = await axios.get("http://localhost:5000/api/products");

            return response.data

        } catch (error) {
            return error;
        }

    }

)

const getProductsinitialState = {
    products: [],
    error: "",
    loading: false
}

const getProductSlice = createSlice({
    name: 'getProduct',
    initialState: getProductsinitialState,
    reducers: {

    },
    extraReducers: {
        [getProductsThunk.pending]: (state) => {

            state.loading = true
            state.products = []

        },
        [getProductsThunk.fulfilled]: (state, action) => {

            state.loading = false
            state.products = action.payload

        },
        [getProductsThunk.rejected]: (state, action) => {

            state.loading = false
            state.error = action.payload
        }
    }
})

export const getProductDetailsThunk = createAsyncThunk(
    'productDetails',
    async (payload) => {
        // console.log("iddd", id);
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${payload}`);
            return response
        } catch (error) {
            return error.message;
        }

    }

)



const getProductDetailsinitialState = {
    product: [],
    loading: true,
    error: ""
}

const getProductDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: getProductDetailsinitialState,
    reducer: {
        GET_PRODUCT_DETAILS_RESET: () => {
            return {
                product: {}
            }
        }
    },
    extraReducers: {
        [getProductDetailsThunk.pending]: (state) => {
            state.loading = true
        },
        [getProductDetailsThunk.fulfilled]: (state, action) => {

            state.loading = false
            state.product = action.payload
        },
        [getProductDetailsThunk.rejected]: (state, action) => {
            state.loadin = false
            state.error = action.payload
        }
    },

}
)




export const { getProductDetails, GET_PRODUCT_DETAILS_RESET } = getProductDetailsSlice.actions;



const reducer = combineReducers({
    getProductSlice: getProductSlice.reducer,
    getProductDetailsSlice: getProductDetailsSlice.reducer,
})

export default reducer;








// const getProductDetailsinitialState = {
//     product: {}
// }

// const getProductDetailsSlice = createSlice({
//     name: 'productDetails',
//     initialState: getProductDetailsinitialState,
//     reducers: {
//         GET_PRODUCT_DETAILS_REQUEST: (state) => {
//             return {
//                 loading: true,
//             }
//         },
//         GET_PRODUCT_DETAILS_SUCCESS: (state, action) => {
//             return {
//                 loading: false,
//                 product: action.payload
//             }
//         },
//         GET_PRODUCT_DETAILS_FAIL: (state, action) => {
//             return {
//                 loading: false,
//                 error: action.payload
//             };
//         },
//         GET_PRODUCT_DETAILS_RESET: () => {
//             return {
//                 product: {}
//             }
//         }
//     }

// })

// const reducer = combineReducers({
//     getProductSlice: getProductSlice.reducer,
//     getProductDetailsSlice: getProductDetailsSlice.reducer,
// })

// export default reducer;

// export const { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } = getProductSlice.actions;



// export const { GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL, GET_PRODUCT_DETAILS_RESET } = getProductDetailsSlice.actions;

// export default getProductDetailsReducer.reducer
