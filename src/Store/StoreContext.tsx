import { createContext, useReducer } from "react";
import reducer from "./reducer";
import { useContext } from "react";

export const AppState = createContext<AppMainState>({
  products: [],
  totalProducts:0,
  searchedProducts: [],
  product: null,
  sliderImages: [],
  cart: [],
  dispatch: undefined,
  similarProducts:[],
});
export const useAppState = () => useContext(AppState);

type childrenProps = {
  children: React.ReactNode;
};
const initialState: AppMainState = {
  products: [],
  totalProducts:0,
  searchedProducts: [],
  product: null,
  sliderImages: [],
  cart: [],
  dispatch: undefined,
  similarProducts:[],
};
const StateProvider = ({ children }: childrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const productsStore = {
    ...state,
    dispatch,
  };
  return (
    <AppState.Provider value={productsStore}>{children}</AppState.Provider>
  );
};
export default StateProvider;
