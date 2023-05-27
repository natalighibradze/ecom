import { createContext, useReducer } from "react";
import reducer from "./reducer";
import { useContext } from "react";

export const AppState = createContext({});
export const useAppState = () => useContext(AppState);
type childrenProps = {
  children: React.ReactNode;
};
const initialState = {
  products: [],
  searchedProducts: [],
  product: null,
  sliderImages:[],
  cart: []
};
const StateProvider = ({ children }: childrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.product)
  const productsStore = {
    state,
    dispatch,
  };
  return (
    <AppState.Provider value={productsStore}>
      {children}
    </AppState.Provider>
  );
};
export default StateProvider;