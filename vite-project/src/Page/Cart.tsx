import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAppState } from "../Store/StoreContext";
import ReactDOM from "react-dom";
import { useMemo } from "react";


const Cart = () => {
const {state: {cart}} = useAppState();
console.log(cart);
const totalPrice= useMemo(
  () =>
    cart.reduce(
      (acc, current) => acc + Number(current.price) * current.quantity,
      0
    ),
  [cart]
);
console.log(totalPrice);
    return (
      <Box sx={{width: '100%'}}>
        <h1>Cart</h1>
        <List>
        {cart.map((product) => {
          console.log(product)
          return (
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <img src={product.images?.[0]} alt={product.title} />
                </ListItemIcon>
                <ListItemText>{product.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
        
    </Box>
    )
}

export default Cart;
