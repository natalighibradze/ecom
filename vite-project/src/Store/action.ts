export const SELECTED_PRODUCT = 'SELECTED_PRODUCT'
export const SAVE_PRODUCTS = 'SAVE_PRODUCTS';
export const saveProducts = (products: any) => ({
    type: SAVE_PRODUCTS,
    products,
  });
  export const SAVE_SEARCHED_PRODUCTS = "SAVE_SEARCHED_PRODUCTS"
  export const saveSearchedProducts = (products: any)=>({type:SAVE_SEARCHED_PRODUCTS, products}) 
  export const selectedProduct = (product: any) => ({
    type: SELECTED_PRODUCT, 
    product
});
export const SET_SLIDER_IMAGES = 'SET_SLIDER_IMAGES'
export const setSliderImages = (images: any) => ({
    type: SET_SLIDER_IMAGES,
    images

});
export const CART_ITEM = 'CART_ITEM'
export const cartItem = (item:any) => ({
    type: CART_ITEM,
    item

});
