import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../Review/ReviewItems';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    // console.log(cart)
    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id)
        console.log(cart, id);
        setCart(remaining)
        removeFromDb(id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }


    return (
        <div className='shop-container'>
            <div className='review-container'>
                {/* <h2>Product Items: {cart.length}</h2> */}
                {
                    cart.map(product => <ReviewItems key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/checkout">
                        <button className='btn-proceed'>
                            <span>Proceed Checkout</span>
                            <FontAwesomeIcon icon={faCalendarCheck} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;