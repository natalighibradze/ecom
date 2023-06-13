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
      <div className="card-info">
        <p>
          <strong> $ {Number(product.price).toFixed(2)}</strong>
          <button
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
        <h6
          onClick={() => {
            dispatch(selectedProduct(product));
            navigate("/product");
          }}
        >
          <p style={{cursor: "pointer", fontSize: "10px", marginTop: "0.2px"}}>{product.title}</p>
         
        </h6>
        {/* <p>
          Brand: <strong>{product?.brand}</strong>
        </p> */}
        {/* <p>
          Category: <strong> {product?.categories} </strong>
          onclick={() => { navigate("/user"); }}
        </p> */}
       
      </div>
    </div>
  );
};

export default Card;
