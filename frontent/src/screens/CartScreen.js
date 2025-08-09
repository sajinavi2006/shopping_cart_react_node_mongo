import CartItem from '../components/CartItem';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './CartScreen.css';
import { addToCartThunk, removeToCartThunk } from '../redux/slice/cartSlice';

const CartScreen = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate();

    const qtyChangeHandler = (addCartId, qty) => {

        dispatch(addToCartThunk({ addCartId, qty }))
        // console.log("🚀 ~ file: CartScreen.js ~ line 14 ~ qtyChangeHandler ~ id, qty", addCartId, qty)

    }

    const removeFromCartHandler = (id) => {
        // console.log("🚀 ~ file: CartScreen.js ~ line 17 ~ removeCartData ~ id", id)

        dispatch(removeToCartThunk(id))
    }

    // const getCartCount = () => {
    //     return cartItems.reducer((qty, item) => item.qty + qty, 0)
    // }

    // const getCartSubTotal = () => {
    //     return cartItems.reducer((price, item) => (item.price * item.qty) + price, 0)
    // }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
            .toFixed(2);
    };



    return (
        <div className='cartscreen'>
            <div className='cartscreen__left'>
                <h2>Shoping Cart</h2>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: "center" }}>Your cart is empty<Link to="/"> <h3>Go Back</h3></Link></div>
                ) : (
                    cartItems.map(item => (
                        <CartItem item={item} key={item.product} qtyChangeHandler={qtyChangeHandler}
                            removeHandler={removeFromCartHandler} />
                    ))
                )}


            </div>
            <div className='cartscreen__right'>
                <div className='cartscreen__info'>
                    <p>Subtotol ( {getCartCount()} ) Items</p>
                    <p>${getCartSubTotal()}</p>
                </div>
                <div>
                    <button onClick={() => navigate('/checkout')}>Proceed To Checkout</button>
                </div>
            </div>
        </div >
    )
}

export default CartScreen;