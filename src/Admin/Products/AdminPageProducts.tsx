import { Box, List, ListItemButton, Pagination, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppState } from "../../Store/StoreContext";
import axios from "axios";
import { saveAdminProducts } from "../../Store/action";
import ProductCard from "./Components/ProductCard/ProductCard";
import AddProduct from "./Components/ProductCard/AddProduct/Add";
function AdminPageProducts() {
  const { adminProducts, dispatch } = useAppState();
  const [addProduct, setAddProduct] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState(0)
  const startIndex = (pageNumber - 1) * 24;
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: "",
          filter: { brand: "" },
          page_size: 24,
          page_number: startIndex,
        });
        setTotalProducts(data.total_found)
        dispatch(saveAdminProducts(data.products));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminProducts();
  }, [pageNumber]);
  return (
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <Box>
        <Paper elevation={5}>
          <List sx={{ padding: "30px" }}>
            <ListItemButton onClick={() => setAddProduct(false)}>
              All Products
            </ListItemButton>
            <ListItemButton onClick={() => setAddProduct(true)}>
              Add Product
            </ListItemButton>
          </List>
        </Paper>
      </Box>
      <Box>
        {addProduct ? (
          <AddProduct />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {adminProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </Box>
        )}
         <Stack spacing={2} mt={10}>
          <Pagination
            count={Math.ceil(totalProducts / 24)}
            page={pageNumber}
            variant="outlined"
            color="secondary"
            onChange={changePage}
          />
        </Stack>
      </Box>
    </Box>
  );
}
export default AdminPageProducts;