import {
    ActionWithPayload,
    createAction,
    withMatcher,
} from '../../utils/createAction/createAction';
import { CategoryItem } from '../categories/categories.types';
import { Cart, CartItemType, CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems: Cart, productToAdd: CategoryItem): Cart => {
    // if (!productToAdd) return [];
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
const removeCartItem = (
    cartItems: Cart,
    productToRemove: CartItemType
): Cart => {
    // if (!productToRemove) return [];
    const existingCartItem = cartItems.find(
        (item) => item.id === productToRemove.id
    );
    if (existingCartItem?.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToRemove.id);
    }
    return cartItems.map((item) =>
        item.id === productToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const clearCartItems = (cartItems: Cart, itemToClear: CartItemType): Cart => {
    // if (!itemToClear) return [];
    return cartItems.filter((item) => item.id !== itemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<
    CART_ACTION_TYPES.SET_IS_CART_OPEN,
    boolean
>;

export type SetCartItems = ActionWithPayload<
    CART_ACTION_TYPES.SET_CART_ITEMS,
    Cart
>;
// DISPATCH OBJECTS //////

export const setCartItems = withMatcher(
    (cartItems: Cart): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);
export const addItemToCart = (
    cartItems: Cart,
    productToAdd: CategoryItem
): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};
export const removeItemFromCart = (
    cartItems: Cart,
    productToRemove: CartItemType
): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
};
export const clearItemsFromCart = (
    cartItems: Cart,
    itemToClear: CartItemType
): SetCartItems => {
    const newCartItems = clearCartItems(cartItems, itemToClear);
    return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher(
    (bool: boolean): SetIsCartOpen =>
        createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);
