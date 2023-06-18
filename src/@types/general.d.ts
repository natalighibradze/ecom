type Product = {
  id: string;
  title: string;
  brand: string;
  categories: string;
  description: string;
  images: string[];
  price: number;
  rating: string;
  amount: string;
  categories: string[];
  
};

type CartItem = Product & {
  quantity: number;
};

type AppMainState = {
  products: Product[];
  totalProducts: number
  searchedProducts: Product[];
  product: Product | null;
  sliderImages: Product[];
  cart: CartItem[];
  dispatch: React.Dispatch;
  similarProducts:Product[];
  adminProducts:Product[];
};
