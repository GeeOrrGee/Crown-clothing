export enum CATEGORIES_TYPES {
    SET_CATEGORIES_MAP = 'categories/SET_CATEGORIES_MAP',
    FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAIL = 'categories/FETCH_CATEGORIES_FAIL',
}
export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};
export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
};

export type CategoryMap = {
    [key: string]: CategoryItem[];
};
