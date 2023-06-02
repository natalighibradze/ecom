import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";
import { useEffect } from "react";
import { useAppState } from "../Store/StoreContext";
import { saveSearchedProducts } from "../Store/action";
import { useNavigate } from "react-router";
import cart from "../img/cart.png";
import { Badge } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function SearchAppBar() {
  const { dispatch, state } = useAppState();
  const navigate = useNavigate()

  //*const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    const handleSearchSubmit = async () => {
      await Axios.post(`http://localhost:8080/products`, {
        keyword: searchTerm,
        page_size: 10,
        page_number: 0,
      })
        .then((response) => {
          dispatch(saveSearchedProducts(response.data.products));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    handleSearchSubmit();
  }, [searchTerm]);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  console.log(state.searchedProducts);
  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "black",
          borderColor: "transparent",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textDecoration: "underline",
              cursor: "pointer",
              display: { xs: "none", sm: "block" },
            }}
          >
            Sign In / Register account
          </Typography>
          <Search>
            <form onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleChange}
                value={searchTerm}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </Search>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textDecoration: "underline",
              cursor: "pointer",
              display: { xs: "none", sm: "block" },
            }}
          >
            Cart
          </Typography> */}
          <Badge badgeContent={state.cart.length} color="secondary">
     <Box onClick={()=>navigate('/cart')} >
         <img style={{width: '50px', cursor: 'pointer'}} src={cart} alt="cart png" />
     </Box>
</Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
}