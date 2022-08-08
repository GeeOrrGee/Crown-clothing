import { createAction } from '../../utils/createAction/createAction';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}; // helper function

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToRemove.id);
    }
    return cartItems.map((item) =>
        item.id === productToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const clearCartItems = (cartItems, itemToClear) =>
    cartItems.filter((item) => item.id !== itemToClear.id);

// DISPATCH OBJECTS //////
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemsFromCart = (cartItems, itemToClear) => {
    const newCartItems = clearCartItems(cartItems, itemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
