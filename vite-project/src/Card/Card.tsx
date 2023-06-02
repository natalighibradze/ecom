import "../Scss/style.scss";
import { useNavigate } from "react-router";
import { AppState, useAppState } from "../Store/StoreContext";
import { cartItem, selectedProduct } from "../Store/action";
import MyCarousel from "../Carouseli/Carousel";
function Card({ product }) {
  // console.log(product)
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <img src={product.images[0]} alt="" width="100px" height="100px" />
      </div>
      <div className="card-info">
      <p>
             <strong> ${Number(product.price).toFixed(2)}  </strong>
          </p>
          <h6
          onClick={() => {
 dispatch(selectedProduct(product));
  navigate("/product");
}} 
          >
            <strong>{product.title} </strong>{" "}
          </h6>
          {/* <p>
            Brand: <strong>{product?.brand}</strong>
          </p> */}
          {/* <p>
            Category: <strong> {product?.categories} </strong>
          </p> */}
        </div>
        <div>
        <button style={{ marginTop: "1x", backgroundColor: "transparent" }} onClick={() => dispatch(cartItem(product))}>Add To Cart</button>
      </div>
    </div>
  );
}
export default Card;