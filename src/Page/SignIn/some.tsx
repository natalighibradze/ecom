// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { Grid, Box, Typography } from '@mui/material';
// import * as yup from 'yup';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Container from '@mui/material/Container';
// import { useFormik } from 'formik';
// import { Link } from 'react-router-dom';
// interface RegisterFormData {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   password2: string;
// }

// const initialValues: RegisterFormData = {
//   firstName: '',
//   lastName: '',
//   username: '',
//   email: '',
//   password: '',
//   password2: '',
// };

// const validationSchema = yup.object().shape({
//   username: yup.string().required('Username is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().required('Password is required'),
//   password2: yup
//     .string()
//     .oneOf([yup.ref('password'), ''], 'Passwords must match'),
// });

// const Register = () => {
//   const { values, handleSubmit, handleChange, errors } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values: RegisterFormData) => {
//       console.log(values)
//     },
//   });

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="firstName"
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 value={values.firstName}
//                 onChange={handleChange}
//                 error={!!errors.firstName}
//                 helperText={errors.firstName}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="lastName"
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 error={!!errors.lastName}
//                 helperText={errors.lastName}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="username"
//                 fullWidth
//                 id="userName"
//                 label="Username"
//                 value={values.username}
//                 onChange={handleChange}
//                 error={!!errors.username}
//                 helperText={errors.username}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="email"
//                 fullWidth
//                 id="email"
//                 label="mail"
//                 value={values.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 type="password"
//                 name="password"
//                 fullWidth
//                 label="Password"
//                 value={values.password}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 type="password"
//                 name="password2"
//                 fullWidth
//                 label="Confirm Password"
//                 value={values.password2}
//                 onChange={handleChange}
//                 error={!!errors.password2}
//                 helperText={errors.password2}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link to="/login">Already have an account? Sign in</Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Register;

// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
// } from "@mui/material";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { FC, useState } from "react";
// type SignInProps = {
//   open: boolean;
//   setOpen: Function;
// };
// type SigninData = {
//   email: string;
//   password: string;
// };
// const initialValues: SigninData = {
//   email: "",
//   password: "",
// };
// // function  LogIn ({open, setOpen}) {
// const LogIn: FC<SignInProps> = ({ open, setOpen }) => {
//   const { isRegisterOpen, setIsRegisterOpen } = useState<boolean>(false);
//   const validationSchema = yup.object().shape({
//     email: yup.string().email("Invalid email").required("Email is required"),
//     password: yup.string().required("Password is required"),
//   });
//   const { values, handleSubmit, handleChange, errors } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values: SigninData) => {
//       console.log(values);
//     },
//   });
//   const handleClose = () => {
//     setOpen((prev: boolean) => !prev);
//   };
//   const handleClick = () => {
//     handleSubmit();
//     handleClose();
//   };
//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Log In</DialogTitle>
//         <DialogContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             width: "300px",
//             height: "140px",
//           }}
//         >
//           <TextField
//             name="email"
//             fullWidth
//             id="email"
//             label="mail"
//             value={values.email}
//             onChange={handleChange}
//             error={!!errors.email}
//             helperText={errors.email}
//           />
//           <TextField
//             type="password"
//             name="password"
//             fullWidth
//             label="Password"
//             value={values.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Typography>
//             <span>Register</span>
//           </Typography>
//           <Button color="success" sx={{ color: "black" }} onClick={handleClick}>
//             {" "}
//             Sign In{" "}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LogIn;
