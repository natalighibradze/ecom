import { useEffect } from "react";
import axios from "axios";
import { useAppState } from "../../Store/StoreContext";
import { cartItem, saveSimilarProducts } from "../../Store/action";
import "../../Styles/style.scss";
import Card from "../../Component/Card/Card";
import { useTranslation } from "react-i18next";

function ProductPage() {
  const { t } = useTranslation()
  const { product, similarProducts, dispatch } = useAppState();
  console.log(similarProducts)
  useEffect(() => {
    const getSimilarProducts = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: "",
          filter: { brand: product?.brand },
          page_size: 6,
          page_number: 0,
        });
        console.log(data);
        dispatch(saveSimilarProducts(data.products));
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarProducts();
  }, [product]);

  return (
    <div>
      <div>
        <div className="card-info">
          <div className="product_container">
            <img
              src={product?.images[0]}
              alt={product?.brand}
              className="image_product"
            />
          </div>
          <div className="product-details">
            <p>
            {t("global.title")}
               <strong>{product?.title}</strong>
            </p>
            <p>
            {t("global.brand")}
               <strong className="brand-name">{product?.brand}</strong>
            </p>
            <p>
            {t("global.price")}  {" "}
              <strong className="price">
                {Number(product?.price).toFixed(2)} $
              </strong>
            </p>
          </div>
        </div>
        <button className="btn" onClick={() => dispatch(cartItem(product))}>  {t("global.add")} </button>
        <div style={{ display: "flex", marginTop: "170px" }}>
          {similarProducts.map((product, index) => {
            return <Card key={index} product={product} />
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
