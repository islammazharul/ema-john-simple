import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart()
    const ids = Object.keys(storedCart)
    console.log(ids);
    const loadedProducts = await fetch('http://localhost:6500/productsByIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json();
    console.log('products', products);

    // if cart data is in database, you have to use async await
    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }

    // if you need to send two things
    // return [products, savedCart]
    // another option
    // return {products, cart: savedCart}

    return savedCart
}
export default cartProductsLoader;