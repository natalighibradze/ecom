import {
  CART_ITEM,
  SAVE_PRODUCTS,
  SAVE_SEARCHED_PRODUCTS,
  SELECTED_PRODUCT,
  SET_SLIDER_IMAGES,
  DELETE_PRODUCT_FROM_CART,
  SAVE_SIMILAR_PRODUCTS,
} from "./action";
const reducer = (
  state: any,
  action: {
    [x: string]: any;
    products: any;
    type: any;
  }
) => {
  switch (action.type) {
    case SAVE_PRODUCTS: {
      return {
        ...state,
        products: action.products,
        totalProducts: action.total_found,
      };
    }
    case SAVE_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.products,
        totalProducts:action.total_found
      };
    case SELECTED_PRODUCT:
      return { ...state, product: action.product };
    case SET_SLIDER_IMAGES:
      return { ...state, sliderImages: action.images };
    case CART_ITEM: {
      const myCartItems = [...state.cart];
      const indexOfItem = myCartItems.findIndex(
        (product) => product.id === action.item.id
      );
      if (indexOfItem === -1) {
        return {
          ...state,
          cart: [...myCartItems, { ...action.item, quantity: 1 }],
        };
      }
      const existingProduct = myCartItems[indexOfItem];
      const updateProductQuantity = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      myCartItems[indexOfItem] = updateProductQuantity;
      return { ...state, cart: myCartItems };
    }
    case DELETE_PRODUCT_FROM_CART: {
      const prevCart = [...state.cart];
      const itemsAfterRemove = prevCart.filter(
        (product) => product.id !== action.product.id
      );
      return { ...state, cart: itemsAfterRemove };
    }
    case SAVE_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: action.products
      };
    default:
      return state;
  }
};
export default reducer;