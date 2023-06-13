import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Component/Card/Card";
import { useAppState } from "../Store/StoreContext";
import { saveProducts, setSliderImages } from "../Store/action";
import { Pagination, Stack } from "@mui/material";
import MyCarousel from "../Component/Carouseli/Carousel";
const Products = () => {
  const { dispatch, searchedProducts, products, totalProducts } = useAppState();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const startIndex = pageNumber * 20;
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  useEffect(() => {
    try {
      const getProducts = async () => {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: "",
          page_size: 20,
          page_number: startIndex,
        });
        dispatch(saveProducts(data.products, data.total_found));
        dispatch(setSliderImages(data.products));
      };
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [startIndex]);
  console.log(totalProducts);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MyCarousel />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Stack spacing={2} mt={4}>
        <Pagination
          count={Math.ceil(totalProducts / 20)}
          page={pageNumber}
          variant="outlined"
          color="secondary"
          onChange={changePage}
        />
      </Stack>
    </div>
  );
};
export default Products;