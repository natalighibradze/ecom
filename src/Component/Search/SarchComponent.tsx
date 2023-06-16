import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppState } from "../../Store/StoreContext";
import { FC, useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { saveSearchedProducts } from "../../Store/action";
import { useLocation, useNavigate } from "react-router-dom";
type SearchProps = {
  searchTerm: string;
};
const SarchComponent: FC<SearchProps> = ({ searchTerm }) => {
  const { searchedProducts, dispatch } = useAppState();
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  console.log(searchTerm);
  const nvigate = useNavigate();

  useEffect(() => {
    const handleSearchSubmit = async () => {
      await axios
        .post(`http://localhost:8080/products`, {
          keyword: searchTerm,
          page_size: 5,
          page_number: 0,
        })
        .then((response) => {
          dispatch(
            saveSearchedProducts(
              response.data.products,
              response.data.total_found
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    handleSearchSubmit();
  }, [searchTerm]);
  return (
    <Box sx={{ display: clicked ? "none" : "block" }}>
      <Box>
        {searchTerm.length > 0 && (
          <Paper
            sx={{
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: '540px',
              display: location.pathname === "/search" ? "none" : "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              {searchedProducts.map((product) => {
                return <Card key={product.id} product={product} />;
              })}
            </Box>
            <Box
              onClick={() => {
                nvigate("/search");
                setClicked(true);
              }}
            >
              <Button variant="contained">See More</Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
export default SarchComponent;
