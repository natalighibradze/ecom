import { useAppState } from "../Store/StoreContext";
import MyCarousel from "../Carouseli/Carousel";

function ProductPage (){
    const {state:{product}} = useAppState()
    return (
      <div>
      <div>
        <div className="card-info"> 
        {/* style={{ display: "flex" }} */}
          <div>
            <img
              src={product.images?.[0]}
              style={{ width: "140px", height: "140px", marginRight: "755.9px" }}
            />
          </div>
          <div>
            <p style={{ marginLeft: "100px", marginTop: "120px", color: "white" }}>
              Brand: <strong>{product?.brand} </strong>
            </p>
            <p>
              Category: <strong> {product?.category} </strong>
            </p>
            <p>
              Price: <strong> {Number(product.price).toFixed(2)} $ </strong>
            </p>
          </div>
        </div>
      </div>
      <MyCarousel />
    </div>
      
    )
}
export default ProductPage;