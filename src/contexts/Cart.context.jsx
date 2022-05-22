import { createContext, useState, useEffect } from 'react';
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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalQuantity: 0,
    removeItemFromCart: () => {},
    clearItemsFromCart: () => {},
    totalValue: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };
    const clearItemsFromCart = (itemsToClear) => {
        setCartItems(clearCartItems(cartItems, itemsToClear));
    };

    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);
    useEffect(() => {
        const newTotalValue = cartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
        }, 0);
        setTotalValue(newTotalValue);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        removeItemFromCart,
        totalQuantity,
        clearItemsFromCart,
        totalValue,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
