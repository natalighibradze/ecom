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
import { useAppState } from "../../Store/StoreContext";
import { saveSearchedProducts } from "../../Store/action";
import { useNavigate } from "react-router";
import cartIcon from "../../img/cart.png";
import { Avatar, Badge, Button, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import SignIn from "../../Page/SignIn";
import SarchComponent from "../Search";
import logo from "../../img/logo.png";
import i18next, { changeLanguage } from "i18next";
import i18n from "../../Translation";
import { useTranslation } from "react-i18next";
import { isUserAuthenticated } from "../../helpers/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "lightgrey",
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

const Navbar = ({ searchTerm, setSearchTerm }: any) => {
  const { t } = useTranslation();
  const { dispatch, cart } = useAppState();
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const changeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage);
  };
  
  const user = JSON.parse(localStorage.getItem("user") as string);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f5f5f5",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1px",
            paddingBottom: "30px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Select
            id="language-select"
            value={i18n.language}
            onChange={changeLanguage}
          >
            <MenuItem value="en">Eng</MenuItem>
            <MenuItem value="ge">Geo</MenuItem>
          </Select>

          {isUserAuthenticated() && (
            <Button
              variant="contained"
              sx={{
                borderRadius: "5px",
                backgroundColor: "black",
                border: "none",
                "&:hover": {
                  backgroundColor: "grey",
                  border: "none",
                },
              }}
              onClick={() => {
                navigate("/");
                handleLogout();
              }}
            >
              {" "}
              {t("global.logout")}
            </Button>
          )}

          <Box>
              <IconButton>
                <Avatar onClick={() => {
            navigate("/user");
          }}
                />

                {user?.firstName}
              </IconButton>
            </Box>
          <img onClick={()=>navigate('/')}
            style={{ width: "180px", cursor: "pointer" }}
            src={logo}
            alt="logo png"
            
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              backgroundColor: "#DB5E45",
              border: "none",
              "&:hover": {
                backgroundColor: "#DE8B7A",
                border: "none",
              },
            }}
            onClick={() => setIsSignInOpen((prev) => !prev)}
          >
            {t("global.become_a_member")}
           
          </Button>
          <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} />
          <Search>
            <form onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder={`${t('global.search')}...`}
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </Search>
          <Badge badgeContent={cart.length} color="secondary">
            <Box onClick={() => navigate("/cart")}>
              <img
                style={{ width: "50px", cursor: "pointer"}}
                src={cartIcon}
                alt="cart png"
              />
            </Box>
          </Badge>
        </Toolbar>
      </AppBar>
      {searchTerm?.length > 0 && (
        <Box sx={{ position: "fixed", top: 70, left: 0, width: "100%", zIndex: "1" }}>
          <SarchComponent searchTerm={searchTerm} />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
