import { FC, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Register from "../Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
type SigninData = {
  email: string;
  password: string;
};
type SignInProps = {
  open: boolean;
  setOpen: Function;
};
const initialValues: SigninData = {
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
const SignIn: FC<SignInProps> = ({ open, setOpen }) => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [isRegiterOpen, setIsRegiterOpen] = useState<boolean>(false);
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: SigninData) => {
      const { data } = await axios.post("http://localhost:8080/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", data.AccessToken);
      localStorage.setItem("user", JSON.stringify(data.User));
      setOpen(false);
    },
  });
  const handleClose = () => {
    setOpen((prev: boolean) => !prev);
  };
  const handleClick = () => {
    handleSubmit();
    setOpen(false);
    handleClose();
  };
  const handelOpneRegister = () => {
    handleClose();
    setIsRegiterOpen((prev) => !prev);
  };
  return (
    <Box
      component="form"
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            height: "140px",
          }}
        >
          <TextField
            name="email"
            fullWidth
            id="email"
            label={t('global.email')}
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            type="password"
            name="password"
            fullWidth
            label={t('global.password')}
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="subtitle2" color="initial">
            {t("global.not_a_member")}
            <span onClick={handelOpneRegister} style={{cursor: "pointer", color: "purple"}}> {t("global.register")} </span>
          </Typography>
          <Button color='success' sx={{color: "green"}} onClick={handleClick}>  {t("global.signIn")} </Button>
        </DialogActions>
      </Dialog>
      <Register
        isRegiterOpen={isRegiterOpen}
        setIsRegiterOpen={setIsRegiterOpen}
      />
    </Box>
  );
};
export default SignIn;