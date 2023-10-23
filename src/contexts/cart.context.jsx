import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.name === productToAdd.name);
    const productToIncrement = existingItem || productToAdd;
    productToIncrement.count = productToIncrement.count + 1 || 1;
    return [productToIncrement, ...cartItems]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const value = {isCartOpen, setIsCartOpen};

    const addItemToCart = (productToAdd) => {

    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}