// // import * as actionTypes from "../constants/productConstants";
import axios from "axios";
import { GET_PRODUCTS_REQUEST, GET_PRODUCT_DETAILS_RESET, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_FAIL, GET_PRODUCTS_SUCCESS, } from '../constants/productConstant';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST });

        const { data } = await axios.get("/api/products");

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get();

        dispatch({
            type: GET_PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_RESET });
};



// import * as actionTypes from "../constants/productConstants";
// import axios from "axios";

// export const getProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: GET_PRODUCTS_REQUEST });

//         const { data } = await axios.get("/api/products");

//         dispatch({
//             type: GET_PRODUCTS_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_PRODUCTS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

// export const getProductDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/products/${id}`);

//         dispatch({
//             type: GET_PRODUCT_DETAILS_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_PRODUCT_DETAILS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

// export const removeProductDetails = () => (dispatch) => {
//     dispatch({ type: GET_PRODUCT_DETAILS_RESET });
// };