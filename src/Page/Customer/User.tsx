import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
function UserPage() {
  const { t } = useTranslation()
  const [editingMode, setEditingMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const token = localStorage.getItem("token");
  const initialValues: UserInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: UserInfo) => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/user",
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Avatar />
        <Typography variant="h4" color="initial">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Box>
        <Paper>
          <Grid
            container
            component="form"
            onSubmit={() => {
              handleSubmit();
              setEditingMode(false);
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
              {t("global.firstName")}
              </Typography>
              {editingMode ? (
                <TextField
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="h6" color="initial">
                  {user.firstName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
              {t("global.lastName")}
              </Typography>
              {editingMode ? (
                <TextField
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="h6" color="initial">
                  {user.lastName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
              {t("global.phone")}
               
              </Typography>
              {editingMode ? (
                <TextField
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="h6" color="initial">
                  {user.phoneNumber}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
              {t("global.email")}
              </Typography>
              {editingMode ? (
                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="h6" color="initial">
                  {user.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {!editingMode && (
                <Button onClick={() => setEditingMode(true)}> {t("global.edit")} </Button>
              )}
              {editingMode && <Button type="submit">  {t("global.save")} </Button>}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
export default UserPage;