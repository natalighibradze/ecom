import { FC } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  TextField,
  DialogContent,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useTranslation } from "react-i18next";
type RegisterProps = {
  isRegiterOpen: boolean;
  setIsRegiterOpen: Function;
};
interface RegisterFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
const initialValues: RegisterFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  phoneNumber: yup.string().required("PhoneNumber is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Register: FC<RegisterProps> = ({ isRegiterOpen, setIsRegiterOpen }) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setIsRegiterOpen((prev: boolean) => !prev);
  };
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: RegisterFormData) => {
      const { data } = await axios.post("http://localhost:8080/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });
      if(data)  handleClose();
      console.log(data);
    },
  });
  const handleClick = () => {
    handleSubmit();
  };
  return (
    <Box>
      <Dialog open={isRegiterOpen} onClose={handleClose}>
        <DialogTitle> {t("global.register")} </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label={t("global.firstName")}
                  value={values.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  fullWidth
                  id="lastName"
                  label={t("global.lastName")}
                  value={values.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  fullWidth
                  id="phoneNumber"
                  label={t("global.phone")}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  fullWidth
                  id="email"
                  label={t("global.email")}
                  value={values.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  fullWidth
                  label={t("global.password")}
                  value={values.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            {t("global.signUp")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Register;