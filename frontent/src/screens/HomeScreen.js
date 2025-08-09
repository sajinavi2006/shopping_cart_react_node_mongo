import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import Product from "../components/Product";
import { getProductsThunk } from "../redux/slice/productSlice";


const HomeScreen = () => {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(state => state.reducer.getProductSlice)
    // console.log(error)
    useEffect(() => {

        dispatch(getProductsThunk())

    }, [dispatch]);




    return (
        <div className="homescreen">
            <h2 className="homescreen__title">Latest Products</h2>

            <div className="homescreen__products">
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    products.map((product) => (
                        <Product
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            productId={product._id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HomeScreen;



