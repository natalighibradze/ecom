import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../ContactScss/style.scss";
import { t } from "i18next";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert("Form submitted successfully!");
      resetForm();
    },
  });
  return (
    <div className="contact-form">
      <h2> {t("global.contact_form")} </h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={t("global.firstName") || ""}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}

        <input
          type="email"
          id="email"
          name="email"
          placeholder={t("global.email") || ""}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <textarea
          className="message-input"
          id="message"
          name="message"
          placeholder={t("global.message") || ""}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="error">{formik.errors.message}</div>
        ) : null}

        <button type="submit"> {t("global.submit")} </button>
      </form>
    </div>
  );
};

export default ContactPage;
