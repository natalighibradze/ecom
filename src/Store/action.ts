export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const SAVE_PRODUCTS = "SAVE_PRODUCTS";
export const SAVE_SEARCHED_PRODUCTS = "SAVE_SEARCHED_PRODUCTS";
export const SET_SLIDER_IMAGES = "SET_SLIDER_IMAGES";
export const CART_ITEM = "CART_ITEM";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const SAVE_SIMILAR_PRODUCTS = "SAVE_SIMILAR_PRODUCTS";
export const SAVE_ADMIN_PRODUCTS = "SAVE_ADMIN_PRODUCTS";

export const saveProducts = (products: any, total_found: number) => ({
  type: SAVE_PRODUCTS,
  products,
  total_found,
});

export const saveSearchedProducts = (
  products: Product[],
  total_found: number
) => ({
  type: SAVE_SEARCHED_PRODUCTS,
  products,
  total_found,
});

export const selectedProduct = (product: any) => ({
  type: SELECTED_PRODUCT,
  product,
});

export const setSliderImages = (images: any) => ({
  type: SET_SLIDER_IMAGES,
  images,
});

export const cartItem = (item: any) => ({
  type: CART_ITEM,
  item,
});

export const removeProduct = (product: any) => ({
  type: DELETE_PRODUCT_FROM_CART,
  product,
});

export const saveSimilarProducts = (products: any) => ({
  type: SAVE_SIMILAR_PRODUCTS,
  products,
});

export const saveAdminProducts = (products: Product[]) => ({
  type: SAVE_ADMIN_PRODUCTS,
  products,
});
