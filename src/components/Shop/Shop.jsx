import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();

    // const itemsPerPage = 10;
    const totalPage = Math.ceil(totalProducts / itemsPerPage)

    // const pageNumber = [];
    // for(let i = 1, i<=totalPage, i++){
    //     pageNumber.push(i)
    // }
    const pageNumber = [...Array(totalPage).keys()]



    // useEffect(() => {
    //     fetch('http://localhost:6500/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:6500/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json();
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);
        fetch('http://localhost:6500/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                console.log('only products in shopping cart', cartProducts);
                const savedCart = [];
                // step 1: get id of the added product
                for (const id in storedCart) {
                    // step 2: get product from products state by using id
                    const addedProduct = cartProducts.find(product => product._id === id);
                    if (addedProduct) {
                        // step 3: add quantity
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity
                        // step 4: add the added product to the saved cart
                        savedCart.push(addedProduct)
                    }
                    // console.log(addedProduct)

                }
                setCart(savedCart)
            })




    }, []);


    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity=1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id)
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }

    const options = [5, 10, 20]
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>
                                <span>Review Order</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* Pagination */}
            <div className="pagination">
                <p>Current Page: {currentPage} and Items Per Page : {itemsPerPage}</p>
                {
                    pageNumber.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;