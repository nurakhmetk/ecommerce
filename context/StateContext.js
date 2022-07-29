import React, {createContext, useContext, useState} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();


export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(
            (item) => item._id === product._id
        );

        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id)
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${quantity} ${product.name} added to the cart.`);
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice(
            (prevTotalPrice) =>
                prevTotalPrice - foundProduct.price * foundProduct.quantity
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
        );
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);

        if (value === 'inc') {
            setCartItems(
                cartItems.map((item) =>
                    item._id === id
                        ? {...foundProduct, quantity: foundProduct.quantity + 1}
                        : item
                )
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems(
                    cartItems.map((item) =>
                        item._id === id
                            ? {...foundProduct, quantity: foundProduct.quantity - 1}
                            : item
                    )
                );
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    };

    const increaseQuantity = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decreaseQuantity = () => {
        setQty((prevQuantity) => {
            if (prevQuantity - 1 < 1) return 1;
            return prevQuantity - 1;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
