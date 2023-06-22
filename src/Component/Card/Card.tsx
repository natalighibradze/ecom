import "../../Scss/style.scss"
import { useNavigate } from "react-router";
import { AppState, useAppState } from "../../Store/StoreContext";
import { cartItem, selectedProduct } from "../../Store/action";
// import MyCarousel from "../Carouseli/Carousel";
import { useTranslation } from "react-i18next";
import MyCarousel from "../../Component/Carouseli/Carousel";

type Cardprops = {
  product: Product;
};

const Card: React.FC<Cardprops> = ({ product }) => {
  const {t} = useTranslation()
  const { dispatch } = useAppState();
  const navigate = useNavigate();

  return (
    
    
    <div className="card">
      
      <div className="card-header">
        <img src={product.images[0]} alt=""  />
      </div>
      <div className="card-infoo">
        <p>
          <strong className="price-title"> $ {Number(product.price).toFixed(2)}</strong>
          <button className="card-button"
            style={{
              marginLeft: "8px",
              backgroundColor: "transparent",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(cartItem(product))}
          >
            {t("global.add")}
          </button>
        </p>
        <h6 className="title__card"
          onClick={() => {
            dispatch(selectedProduct(product));
            navigate("/product");
          }}
        >
          <p className= "product_title" style={{cursor: "pointer", fontSize: "10px", marginTop: "0.2px"}}> {product.title}</p>
         
        </h6>
        <p className="brand-title">
        {t("global.brand")} <strong>{product?.brand}</strong>
        </p>
       
      </div>
    </div>
  );
};

export default Card;
