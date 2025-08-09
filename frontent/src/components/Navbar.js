import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
const Navbar = ({ click }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }
    return (
        <div className='navbar'>
            <div className='navbar__logo'>
                <Link to="/">
                    <h2>Shop for     life easy</h2>
                </Link>
            </div>
            <ul className="navbar__links">
                <li>
                    <Link to="/cart" className="cart__link">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
                            Cart <span className="cartlogo__badge">{getCartCount()}</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">Shop</Link>
                </li>
                <li>
                    <Link to="/checkout">Checkout</Link>
                </li>
                <li>
                    {userInfo ? (
                        <button onClick={() => dispatch(logout())} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
            <GiHamburgerMenu onClick={click} className='hamburger__menu' />
            <Outlet />
        </div>
    )
}

export default Navbar;