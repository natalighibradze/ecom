import React, { FC, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { isUserAuthenticated } from "../../../../../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../../../Store/StoreContext";


type DeleteProds = {
  isDeleteOpen: boolean;
  setIsDeletOpen: Function;
  product: Product;
  setProducts: Function; 
};

const Delete: FC<DeleteProds> = ({
  isDeleteOpen,
  setIsDeletOpen,
  product,
  setProducts,
}) => {
  

  const {adminProducts, dispatch} = useAppState()
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const userAuthenticated = isUserAuthenticated();
  const authorizationKey = userAuthenticated ? userAuthenticated.key : undefined;

  const handleClose = () => {
    setIsDeletOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/product/${product.id}`,
       { headers: { Authorization: authorizationKey } }
      );
      setIsDeletOpen(false);
      setProducts((prevProducts: Product[]) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirm) {
      handleDelete();
    }
  }, [confirm, setProducts]);

  return (
    <Dialog open={isDeleteOpen} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>{product.title}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => setConfirm(true)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
