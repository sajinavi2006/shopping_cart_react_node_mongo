import './ProductScreen.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsThunk } from '../redux/slice/productSlice';
import { addToCartThunk } from '../redux/slice/cartSlice';
const ProductScreen = () => {



    const navigate = useNavigate()

    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch()
    const { product, error, loading } = useSelector(state => state.reducer.getProductDetailsSlice)




    useEffect(() => {

        dispatch(getProductDetailsThunk(id))

    }, [dispatch, id])


    const addToCartHandler = () => {
        const addCartId = product.data._id;
        dispatch(addToCartThunk({ addCartId, qty }));

        navigate("/cart", { replace: true })
    }


    return (
        <div className='productscreen'>
            {loading ? (
                <h2>loading...</h2>
            ) : error ? (
                <h2>Something Wrong!! </h2>
            ) : (

                <>
                    <div className='productscreen__left'>
                        <div className='left__image'>
                            <img src={product.data.imageUrl} alt='product.data.name' />
                        </div>
                    </div>
                    <div className='left__info'>
                        <p className='left__name'>{product.data.name}</p>
                        <p >Price: ${product.data.price}</p>
                        <p >Discription: {product.data.description}</p>
                    </div>
                    <div className='productscreen__right'>
                        <div className='right__info'>
                            <p>
                                Price :: <span>${product.data.price}</span>
                            </p>
                            <p>
                                Status :: <span>{product.data.countInStock > 0 ? "In stock" : "out Of Stock"}</span>
                            </p>
                            <p>
                                Qty ::
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.data.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type='button' onClick={addToCartHandler}>Add To Cart  </button>
                            </p>
                        </div>
                    </div>

                </>


            )}

        </div>
    )
}

export default ProductScreen