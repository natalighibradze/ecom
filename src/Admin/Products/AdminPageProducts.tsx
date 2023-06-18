import { Box, List, ListItemButton, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useAppState } from "../../Store/StoreContext";
import Card from "../../Component/Card/Card";
import axios from "axios";
import { saveAdminProducts } from "../../Store/action";
import ProductCard from "./Components/ProductCard/ProductCard";
function AdminPage() {
  const { adminProducts, dispatch } = useAppState();
  useEffect(() => {
    try {
      const getAdminProducts = async () => {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: "",
          filter: { brand: "" },
          page_size: 24,
          page_number: 0,
        });
        dispatch(saveAdminProducts(data.products));
      };
      getAdminProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Box sx={{display:'flex' }}>
      <Box>
        <Paper elevation={5}>
          <List sx={{padding:'20px'}}>
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
        {adminProducts.map((product) => {
          return <ProductCard key={product.title} product={product} />;
        })}
      </Box>
    </Box>
  );
}
export default AdminPage;