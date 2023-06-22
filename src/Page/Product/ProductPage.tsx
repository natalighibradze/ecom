import { useEffect, useState } from "react";
import axios from "axios";
import { useAppState } from "../../Store/StoreContext";
import { cartItem, saveSimilarProducts } from "../../Store/action";
import "../../Styles/style.scss";
import Card from "../../Component/Card/Card";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "../../BreadCrumps/Breadcrumb";
const isProductAvailable = (product: any) => {
  return Number(product.amount) > 0;
};
function ProductPage() {
  const { t } = useTranslation();
  const { product, similarProducts, dispatch } = useAppState();
const [productimage, setProductImage] = useState('')
  console.log(similarProducts);
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
        console.log(similarProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarProducts();
  }, [product]);
  return (
    <div>
      <div>
        <div className="bread" style={{ textAlign: "start", paddingLeft: "30px" }}>
          <BreadCrumbs />
        </div>
        <div className="cardd-inffo" style={{ marginTop: "40px" }}>
          <div className="product_container">
            <img
              src={productimage ? productimage : product?.images[0]}
              alt={product?.brand}
              className="image_product"
            />
            <div>
              {product?.images.map((image, i) => {
                if (i < 4) {
                  return (
                    <img
                      src={image}
                      alt={product.title}
                      width={80}
                      height={80}
                      style={{ borderRadius:'5px'}}
                      onClick={()=>setProductImage(image)}
                    />
                  );
                }
              })}
            </div>
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
              {t("global.price")}{" "}
              <strong className="price">
                {Number(product?.price).toFixed(2)} $
              </strong>
            </p>
            <p>
              {isProductAvailable(product)
                ? t("global.in_stock")
                : t("global.out_of_stock")}
            </p>
          </div>
        </div>
        <div></div>
        <button className="btn" onClick={() => dispatch(cartItem(product))}>
          {" "}
          {t("global.add")}{" "}
        </button>
        <div className= "similar__products" style={{ display: "flex", marginTop: "70px" }}>
          {similarProducts.map((product, index) => {
            return <Card key={index} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default ProductPage;