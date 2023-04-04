import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItems from '../Review/ReviewItems';
import './Order.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)
    // console.log(cart)
    const handleRemoveFromCart = (id)=>{
        const remaining = cart.filter(product => product.id !== id)
        setCart(remaining)
        removeFromDb(id)
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {/* <h2>Product Items: {cart.length}</h2> */}
                {
                    cart.map(product => <ReviewItems key={product.id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;