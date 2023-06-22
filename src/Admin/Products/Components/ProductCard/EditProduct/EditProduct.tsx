import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { isUserAuthenticated } from "../../../../../helpers/auth";
import { t } from "i18next";
type EditProductProps = {
  isEditOpen: boolean;
  setIsEditOpen: Function;
  product: Product;
};
const validationSchema = yup.object().shape({
  id: yup.string().required("id is required"),
  title: yup.string().required("Username is required"),
  brand: yup.string().required("Username is required"),
  //   categories: [],
  description: yup.string().required("Username is required"),
  //   images: [],
  price: yup.string().required("Username is required"),
  rating: yup.string().required("Username is required"),
  amount: yup.string().required("Username is required"),
});
const EditProduct: FC<EditProductProps> = ({
  isEditOpen,
  setIsEditOpen,
  product,
}) => {
  const initialValues: Product = {
    id: product.id,
    title: product.title,
    brand: product.brand,
    categories: product.categories,
    description: product.description,
    images: product.images,
    price: product.price,
    rating: product.rating,
    amount: product.amount,
  };
  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    validateForm,
    submitForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: Product) => {
      try {
        const editProduct = async () => {
          const { data } = await axios.put(
            `http://localhost:8080/product/${product.id}`,
            values,
            { headers: { Authorization: isUserAuthenticated().key } }
          );
          console.log(data);
        };
        editProduct();
        setIsEditOpen(false)
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleClose = () => {
    setIsEditOpen(false);
  };
  return (
    <Dialog open={isEditOpen} onClose={handleClose}>
      <DialogTitle>Edit Mode </DialogTitle>
      <DialogContent>
        <Grid
          container
          sx={{ padding: "20px" }}
          spacing={1}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item>
            <TextField
              id=""
              label="Id"
              name="id"
              value={values.id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Amount"
              name="amount"
              value={values.amount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Price"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Rating"
              name="rating"
              value={values.rating}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={submitForm}>
        {t("global.done")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditProduct;