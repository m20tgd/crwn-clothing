import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id);
    if (existingItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, itemToRemove) => {
    const existingItem = cartItems.find(item => item.id === itemToRemove.id);
    if (existingItem.quantity === 1){
        return cartItems.filter(item => item.id !== itemToRemove.id);
    }
    return cartItems.map(cartItem => cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

const clearCartItem = (cartItems, itemToClear) => cartItems.filter(item => item.id !== itemToClear.id);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}