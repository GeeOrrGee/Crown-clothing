export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
    SET_TOTAL_QUANTITY = 'SET_TOTAL_QUANTITY',
    SET_TOTAL_VALUE = 'SET_TOTAL_VALUE',
}

export type CartItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
};

export type Cart = CartItem[];
