import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Component/Card/Card";
import { useAppState } from "../Store/StoreContext";
import { saveProducts, setSliderImages } from "../Store/action";
import {
  Checkbox,
  Drawer,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import MyCarousel from "../Component/Carouseli/Carousel";
const categoriesArray = ["tv", "mobile", "tablet"];
const brandsArray = ["Apple", "Samsung", "Sony", "LG"];
const Products = () => {
  const [checkboxColor, setCheckboxColor] = useState([
    "secondary",
    "primary",
    "success",
    "default",
    "error",
    "info",
    "warning",
  ]);
  const { dispatch, products, totalProducts } = useAppState();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const startIndex = pageNumber * 20;
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  const handleCheckboxChange = (event: any, category: string) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
      setPageNumber(1);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      setPageNumber(1);
    }
  };
  const handleBrandCheckboxChange = (event: any, brand: any) => {
    if (event.target.checked) {
      setSelectedBrand(brand);
    } else {
      setSelectedBrand("");
    }
  };
  console.log(selectedCategories.toString());
  useEffect(() => {
    try {
      const getProducts = async () => {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: selectedCategories ? selectedCategories.toString() : "",
          filter: { brand: selectedBrand ? selectedBrand : "" },
          page_size: 20,
          page_number: startIndex,
        });
        if (selectedCategories.length > 0 || selectedBrand !== "") {
          dispatch(saveProducts(data.products, data.total_found));
        }
        dispatch(saveProducts(data.products, data.total_found));
        dispatch(setSliderImages(data.products));
      };
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [startIndex, selectedCategories, selectedBrand]);
  console.log(selectedBrand);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{}}>
        <Drawer
          variant="permanent"
          sx={{
            marginTop: "64px",
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              overflowY: "auto",
              boxSizing: "border-box",
              marginTop: "120px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              paddingBottom: "100px",
              borderTop: "1px solid black",
              borderRightColor: "black",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="h5" color="initial">
              Categories
            </Typography>
            {categoriesArray.map((category, i) => (
              <div key={category}>
                <Checkbox
                  color={checkboxColor[i]}
                  checked={selectedCategories.includes(category)}
                  onChange={(event) => handleCheckboxChange(event, category)}
                />
                {category}
              </div>
            ))}
            <div>
              <Typography variant="h5" color="initial">
                Brands
              </Typography>
              {brandsArray.map((brand, i) => (
                <div key={brand}>
                  <Checkbox
                    color={checkboxColor[i]}
                    checked={selectedBrand === brand}
                    onChange={(event) =>
                      handleBrandCheckboxChange(event, brand)
                    }
                  />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
      <div>
        <MyCarousel />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            justifyContent: "space-between",
            marginTop: "100px",
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
    </div>
  );
};
export default Products;