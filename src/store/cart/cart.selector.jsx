import { createSelector } from '@reduxjs/toolkit';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0)
);

export const selectTotalValue = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0)
);

//TODO amat gadaxede, selector action gaarchie (useContext, dispatch object referensivitaa) , da useContextebi chaanacvle da ideally redux thunk ic moishore
