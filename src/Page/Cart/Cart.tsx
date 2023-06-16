import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useAppState } from "../../Store/StoreContext";
import ReactDOM from "react-dom";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownward,
  ArrowUpward,
  Clear,
  Delete,
  DeleteForever,
  DeleteOutline,
} from "@mui/icons-material";
import { removeProduct } from "../../Store/action";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation()
  const { cart, dispatch } = useAppState();
  const navigate = useNavigate();
  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.quantity,
        0
      ),
    [cart]
  );

  const handleCheckout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    })
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((response) => {
        console.log(response)
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  console.log(totalPrice);
  return cart.length === 0 ? (
    <Box mt={4}>
      <Typography variant="h5" color="error">
        {t("global.cart_is_empty")}
      </Typography>
      <Button
        sx={{ mt: 2 }}
        variant="outlined"
        color="success"
        onClick={() => navigate("/")}
      >
        {t("global.back_to_shop")}
      </Button>
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <h1>  {t("global.cart")}</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="initial">
          {t("global.total")}: ${totalPrice}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
  {t("global.checkout")}
</Button>
      </Box>
      <List>
        {cart.map((product) => {
          console.log(product);
          return (
            <ListItem key={product.id}>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    width={100}
                  />
                </ListItemIcon>
                <ListItemText sx={{ maxWidth: "400px" }}>
                  {product.title}
                </ListItemText>
                <ListItemText>
                  ${(product.price * product.quantity).toFixed(2)}
                </ListItemText>
                <IconButton onClick={() => dispatch(removeProduct(product))}>
                  <Clear />
                </IconButton>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Cart;
