import "./App.css";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import DemoScreen from './screens/DemoScreen';
import LoginScreen from './screens/LoginScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccess from './screens/OrderSuccess';
import MyAccount from './screens/MyAccount';
import MyOrders from './screens/MyOrders';
import OrderDetails from './screens/OrderDetails';
// import DemoScreen2 from './screens/DemoScreen2';
// import InputScreen from "./screens/InputScreen";


function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(!sideToggle)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="checkout" element={<CheckoutScreen />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="demo" element={<DemoScreen />} />
          {/* <Route path="demo2" element={<DemoScreen2 />} />
          <Route path="input" element={<InputScreen />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;