import { createSlice } from '@reduxjs/toolkit';

const shippingFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {
      fullName: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
    };

const billingFromStorage = localStorage.getItem('billingAddress')
  ? JSON.parse(localStorage.getItem('billingAddress'))
  : {
      fullName: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
    };

const initialState = {
  shippingAddress: shippingFromStorage,
  billingAddress: billingFromStorage,
  sameAsShipping: true,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    saveShippingAddress(state, action) {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
      if (state.sameAsShipping) {
        state.billingAddress = { ...state.shippingAddress };
        localStorage.setItem('billingAddress', JSON.stringify(state.billingAddress));
      }
    },
    saveBillingAddress(state, action) {
      state.billingAddress = { ...state.billingAddress, ...action.payload };
      localStorage.setItem('billingAddress', JSON.stringify(state.billingAddress));
    },
    setSameAsShipping(state, action) {
      state.sameAsShipping = !!action.payload;
      if (state.sameAsShipping) {
        state.billingAddress = { ...state.shippingAddress };
        localStorage.setItem('billingAddress', JSON.stringify(state.billingAddress));
      }
    },
  },
});

export const { saveShippingAddress, saveBillingAddress, setSameAsShipping } = checkoutSlice.actions;
export default checkoutSlice.reducer;


