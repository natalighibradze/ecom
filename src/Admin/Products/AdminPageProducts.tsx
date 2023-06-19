import { Box, List, ListItemButton, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useAppState } from "../../Store/StoreContext";
import axios from "axios";
import { saveAdminProducts } from "../../Store/action";
import ProductCard from "./Components/ProductCard/ProductCard";

function AdminPageProducts() {
  const { adminProducts, dispatch } = useAppState();

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: "",
          filter: { brand: "" },
          page_size: 24,
          page_number: 0,
        });
        dispatch(saveAdminProducts(data.products));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminProducts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Paper elevation={5}>
          <List sx={{ padding: "20px" }}>
            <ListItemButton>
              All Products
            </ListItemButton>
            <ListItemButton>
              Add Product
            </ListItemButton>
          </List>
        </Paper>
      </Box>
      <Box>
        {adminProducts.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default AdminPageProducts;
