import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../../Store/StoreContext";
import { cartItem, selectedProduct } from "../../../../Store/action";
import Button from "@mui/material/Button";
import EditProduct from "../../Components/ProductCard/EditProduct/EditProduct";
import Delete from "./DeletProduct/DeleteProduct";
function ProductCard({ product }: { product: Product }) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="card-infoo">
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
          <p
            style={{ cursor: "pointer", fontSize: "10px", marginTop: "0.2px" }}
          >
            {" "}
            {product.title}
          </p>
        </h6>
        <p>
          {t("global.brand")} <strong>{product?.brand}</strong>
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      {isEditOpen && (
        <EditProduct
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          product={product}
        />
      )}
      {isDeleteOpen && (
        <Delete
          isDeleteOpen={isDeleteOpen}
          setIsDeletOpen={setIsDeleteOpen}
          product={product} setProducts={() => {}} />
      )}
    </div>
  );
}
export default ProductCard;







