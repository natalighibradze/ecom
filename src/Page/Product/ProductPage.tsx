import { useEffect } from "react";
import axios from "axios";
import { useAppState } from "../../Store/StoreContext";
import { cartItem, saveSimilarProducts } from "../../Store/action";
import "../../Styles/style.scss";
import Card from "../../Component/Card/Card";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "../../BreadCrumps/Breadcrumb";

const isProductAvailable = (product: any) => {
  return product.quantity > 0;
};

function ProductPage() {
  const { t } = useTranslation()
  const { product, similarProducts, dispatch } = useAppState();
  const breadcrumbItems = ['Home', 'Products', 'Electronics', 'Laptops']
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
        console.log(similarProducts)
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarProducts();
  }, [product]);

  return (
    <div>
      <div>
        <div className="cardd-inffo">
          <div className="product_container">
          <BreadCrumbs />
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
            <p>
              {isProductAvailable(product) ? t("global.in_stock") : t("global.out_of_stock")}
            </p>
          </div>
        </div>
        <button className="btn" onClick={() => dispatch(cartItem(product))}>  {t("global.add")} </button>
        <div style={{ display: "flex", marginTop: "70px" }}>
          {similarProducts.map((product, index) => {
            return <Card key={index} product={product} />
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
