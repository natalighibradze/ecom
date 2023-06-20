import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { isUserAuthenticated } from "../../../../../helpers/auth";
import axios from "axios";
const validationSchema = yup.object().shape({
  title: yup.string().required("Username is required"),
  brand: yup.string().required("Username is required"),
  description: yup.string().required("Username is required"),
  price: yup.string().required("Username is required"),
  amount: yup.string().required("Username is required"),
});
const userAuthenticated = isUserAuthenticated();
const authorizationKey = userAuthenticated ? userAuthenticated.key : undefined;
const AddProduct = () => {
  const initialValues = {
    title: "",
    brand: "",
    categories: [],
    description: "",
    images: [],
    price: "",
    amount: "",
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
    onSubmit: (values) => {
      try {
        const addProduct = async () => {
          const { data } = await axios.post(
            `http://localhost:8080/product`,
            values,
            { headers: { Authorization: isUserAuthenticated().key } }
          );
        };
        addProduct();
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log(errors);
  const handleArrayChange = (event: any, field: any) => {
    const { value } = event.target;
    setFieldValue(
      field,
      value.split(",").map((item: any) => item.trim())
    );
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="brand"
              label="brand"
              value={values.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="categories"
              label="categories"
              value={values.categories}
              onChange={(e) => handleArrayChange(e, "categories")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="images"
              label="images"
              value={values.images}
              onChange={(e) => handleArrayChange(e, "images")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              label="price"
              value={values.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="amount"
              label="amount"
              value={values.amount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="description"
              label="description"
              value={values.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit">Add</Button>
      </form>
    </Box>
  );
};
export default AddProduct;