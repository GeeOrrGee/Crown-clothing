import { AnyAction } from 'redux';
import { setCartItems, setIsCartOpen } from './cart.action';
import { Cart } from './cart.types';

export type CartState = {
    isCartOpen: boolean;
    cartItems: Cart;
    totalQuantity: number;
    totalValue: number;
};

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    totalQuantity: 0,
    totalValue: 0,
};

export const cartReducer = (
    state = INITIAL_STATE,
    action = {} as AnyAction
): CartState => {
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }

    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }
    return state;
};
