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
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,

        totalQuantity,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
