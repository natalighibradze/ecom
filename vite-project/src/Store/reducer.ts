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
          case CART_ITEM: {
            const myCartItems  = [...state.cart]
            const indexOfItem = myCartItems.findIndex((product)=>product.id === action.item.id)
            if (indexOfItem === -1) {
              return [...myCartItems, { ...action.item, quantity: 1 }];
            
            }
            const existingProduct = myCartItems[indexOfItem]
            const updateProductQuantity = {...existingProduct, quantity: existingProduct.quantity + 1}
            myCartItems[indexOfItem] = updateProductQuantity
            return { ...state, cart:myCartItems}}
      default:
        return state
    }
  };
  export default reducer;