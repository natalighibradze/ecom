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
  TextField,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import MyCarousel from "../Component/Carouseli/Carousel";
import MenuIcon from "@mui/icons-material/Menu";
import "../ProductScss/style.scss";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { isUserAuthenticated } from "../helpers/auth";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [keyWordValue, setKeyWordValue] = useState("");
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const startIndex = (pageNumber - 1) * 24;
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
  useEffect(() => {
    try {
      const getProducts = async () => {
        const { data } = await axios.post("http://localhost:8080/products", {
          keyword: selectedCategories ? selectedCategories.toString() : "",
          filter: { brand: selectedBrand ? selectedBrand : "" },
          page_size: minNumber < maxNumber ? 100 : 24,
          page_number: startIndex,
        });
        if (
          selectedCategories.length > 0 ||
          selectedBrand !== "" ||
          keyWordValue
        ) {
          dispatch(saveProducts(data.products, data.total_found));
        }
        if (keyWordValue) {
          const filteredProducts = data.products.filter((product: Product) => {
            const title = product.title.toLowerCase();
            const description = product.description.toLowerCase();
            const keyWord = keyWordValue.toLowerCase();
            const filterResults =
              title.includes(keyWord) || description.includes(keyWord);
            return filterResults;
          });
          return dispatch(
            saveProducts(filteredProducts, filteredProducts.length)
          );
        }
        if (Number(minNumber) < Number(maxNumber)) {
          const filterByPrice = data.products.filter((product: Product) => {
            return (
              Number(product.price) > Number(minNumber) &&
              Number(product.price) < Number(maxNumber)
            );
          });
          console.log(filterByPrice);
          return dispatch(saveProducts(filterByPrice, filterByPrice.length));
        }
        dispatch(saveProducts(data.products, data.total_found));
        dispatch(setSliderImages(data.products));
      };
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [
    startIndex,
    selectedCategories,
    selectedBrand,
    keyWordValue.length,
    minNumber,
    maxNumber,
  ]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
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
            {t("global.category")}
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
              {t("global.brandi")}
            </Typography>
            {brandsArray.map((brand, i) => (
              <div key={brand}>
                <Checkbox
                  color={checkboxColor[i]}
                  checked={selectedBrand === brand}
                  onChange={(event) => handleBrandCheckboxChange(event, brand)}
                />
                {brand}
              </div>
            ))}
          </div>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="min"
                value={minNumber}
                onChange={(e) => setMinNumber(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="max"
                value={maxNumber}
                onChange={(e) => setMaxNumber(parseInt(e.target.value))}
              />
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            color="initial"
            onClick={() => navigate("/contact")}
            sx={{ fontSize: "15px", color: "lightpink", cursor: "pointer" }}
          >
             {t("global.contact")}
          </Typography>
        </div>
        <div>
          {isUserAuthenticated().admin && (
            <Button onClick={() => navigate("/admin")}>Dashboard</Button>
          )}
        </div>
      </Drawer>
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
            sx={{ marginTop: "40px" }}
            count={Math.ceil(totalProducts / 24)}
            page={pageNumber}
            variant="outlined"
            color="secondary"
            onChange={changePage}
          />
        </Stack>
      </div>
      <footer style={{ marginTop: "40px", textAlign: "center" }}>
  <Typography variant="body2" color="textSecondary" sx={{ borderTop: "1px solid black", paddingTop: "10px" }}>
     Our Location | About Us | Copyright © 2023 Natali Ghibradze. All rights reserved.
  </Typography>
</footer>
    </div>
  );
};
export default Products;







