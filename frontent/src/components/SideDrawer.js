import { Link } from 'react-router-dom';
import './SideDrawer.css';
import { useSelector } from "react-redux";
const SideDrawer = ({ show, click }) => {
    const sideDrawerClass = ["sidedrawer"];
    const { cartItems } = useSelector((state) => state.cart);
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };


    if (show) {
        sideDrawerClass.push("show");
    }

    return <div className={sideDrawerClass.join(" ")}>
        <ul className='sidedrawer__links' onClick={click}>
            <li>
                <Link to="/cart">
                    <i className='fas fa-shopping-cart'></i>
                    <span>
                        Cart <span className='sidedrawer__cartbadge'>{getCartCount()}</span>
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/">Shop</Link>
            </li>

        </ul>
    </div>
}

export default SideDrawer