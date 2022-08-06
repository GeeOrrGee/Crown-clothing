import { createContext, useReducer, useState, useEffect } from 'react';

export const CartContext = createContext({
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemsFromCart: () => {},
    isCartOpen: false,
    cartItems: [],
    totalQuantity: 0,
    totalValue: 0,
});

// export const CartProvider = ({ children }) => {
//     // const [isCartOpen, setIsCartOpen] = useState(false);
//     // const [cartItems, setCartItems] = useState([]);
//     // const [totalQuantity, setTotalQuantity] = useState(0);
//     // const [totalValue, setTotalValue] = useState(0);

//     const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//     const { isCartOpen, cartItems, totalQuantity, totalValue } = state;

// const addItemToCart = (productToAdd) => {
//     dispatch({
//         type: CART_ACTION_TYPES.SET_CART_ITEMS,
//         payload: addCartItem(cartItems, productToAdd),
//     });
// };
// const removeItemFromCart = (productToRemove) => {
//     dispatch({
//         type: CART_ACTION_TYPES.SET_CART_ITEMS,
//         payload: removeCartItem(cartItems, productToRemove),
//     });
// };
// const clearItemsFromCart = (itemsToClear) => {
//     dispatch({
//         type: CART_ACTION_TYPES.SET_CART_ITEMS,
//         payload: clearCartItems(cartItems, itemsToClear),
//     });
// };

// const setTotalQuantity = (newTotalQuantity) => {
//     dispatch({
//         type: CART_ACTION_TYPES.SET_TOTAL_QUANTITY,
//         payload: newTotalQuantity,
//     });
// };

// const setTotalValue = (newTotalValue) => {
//     dispatch({
//         type: CART_ACTION_TYPES.SET_TOTAL_VALUE,
//         payload: newTotalValue,
//     });
// };

//     const setIsCartOpen = (boolean) => {
//         dispatch({
//             type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
//             payload: boolean,
//         });
//     };

//     useEffect(() => {
//         const newTotalQuantity = cartItems.reduce((total, cartItem) => {
//             return total + cartItem.quantity;
//         }, 0);
//         setTotalQuantity(newTotalQuantity);
//     }, [cartItems]);
//     useEffect(() => {
//         const newTotalValue = cartItems.reduce((total, cartItem) => {
//             return total + cartItem.price * cartItem.quantity;
//         }, 0);
//         setTotalValue(newTotalValue);
//     }, [cartItems]);

//     const value = {
//         isCartOpen,
//         setIsCartOpen,
//         addItemToCart,
//         cartItems,
//         removeItemFromCart,
//         totalQuantity,
//         clearItemsFromCart,
//         totalValue,
//     };
//     return (
//         <CartContext.Provider value={value}>{children}</CartContext.Provider>
//     );
// };
