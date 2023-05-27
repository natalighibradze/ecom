import { CART_ITEM, SAVE_PRODUCTS, SAVE_SEARCHED_PRODUCTS, SELECTED_PRODUCT, SET_SLIDER_IMAGES } from "./action";

const reducer = (state: any, action: {
  [x: string]: any;
    products: any; type: any; 
}) => {
    switch (action.type) {

        case SAVE_PRODUCTS:{ return{...state, products: action.products}}
        case SAVE_SEARCHED_PRODUCTS:
        return{...state, searchedProducts:action.products}
        case SELECTED_PRODUCT:
          return{...state, product: action.product}
        case SET_SLIDER_IMAGES : 
          return{...state, sliderImages: action.images}
        case CART_ITEM: 
          return {...state, cart: [...state.cart, action.item]}   
      default:
        return state
    }
  };
  export default reducer;