import '../Scss/style.scss'
import { useNavigate } from "react-router";
import { AppState, useAppState } from "../Store/StoreContext";
import { cartItem, selectedProduct } from "../Store/action";
import MyCarousel from "../Carouseli/Carousel";


function Card({product}) {

  // console.log(product)
  const {dispatch} = useAppState()
  const navigate = useNavigate();
  return (
      <div className="card">
        <div className="card-header">
          <img src={product.images[0]} width="100px" height="100px" />
          <div>
            <h6 onClick={()=>{dispatch(selectedProduct(product)); navigate('/product')}}>
              <strong>{ product.title} </strong>{' '} 
            </h6>
            </div>
          <button style={{ color: 'red', cursor: 'pointer', marginLeft: 2, margin: '10px 20px' }}>
            Delete
          </button>
        </div>
        <div className="card-info">
          <p>
            Brand: <strong>{product?.brand}</strong> 
          </p>
          <p>
            Category: <strong> {product?.category} </strong>
          </p>
          <p>
          Price: <strong> {Number(product.price).toFixed(2)} $ </strong>
          </p>
        </div>
        <button >Edit Product</button>
        <button  style={{ marginTop: '10px', margin: '15px 20px' }} onClick={() => dispatch(cartItem(item))}>
          Add To Cart
        </button>
      </div>
  ) }
  export default Card;