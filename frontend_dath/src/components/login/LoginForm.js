import React, { useCallback, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useFormik } from "formik";
import * as yup from "yup";
import { GoogleLogin } from "react-google-login";
import "./login.css";

import { connect } from "react-redux";
import * as Action from "../../redux/actions/index";
import {Link} from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email phai dung nha")
    .required("Hong duoc de trong nha"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      "Password phai dung nha"
    )
    .required("Hong duoc de trong nha"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const LoginForm = (props) => {
  const [passwordMs, setPasswordMs] = useState({
    status: false,
    message: "",
    severity: "",
  });
  const [emailMs, setEmailMs] = useState({
    status: false,
    message: "",
    severity: "",
  });

  const classes = useStyles();
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
  });

  const setAllTouched = () => {
    const fields = ["email", "password"];
    fields.forEach((field) => {
      setFieldTouched(field, true);
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {  history  } = props;
      props.loginUserRequest(
        values,
        setAllTouched,
        isValid,
        setPasswordMs,
        setEmailMs,
        history
      );
    },
    [values, isValid]
  );

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="form-login wrapper fadeInDown">
      <Grid container spacing={3} alignContent="center">
        <Paper className={classes.paper}>
          <Avatar
            alt="Remy Sharp"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
            className="center"
          />

          <p style={{ color: "black", fontSize: "18px" }}>
            Đăng nhập mạng xã hội lớn nhất Việt Nam
          </p>

          {emailMs.status ? (
            <Alert
              severity={emailMs.severity}
              style={{ margin: "10px auto", fontSize: "15px" }}
            >
              {emailMs.message}
            </Alert>
          ) : null || passwordMs.status ? (
            <Alert
              severity={passwordMs.severity}
              style={{ margin: "10px auto", fontSize: "15px" }}
            >
              {passwordMs.message}
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="email"
              type="text"
              variant="outlined"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email && true}
              helperText={touched.email && errors.email}
              margin="dense"
              className="fadeIn second"
              fullWidth={true}
              size="small"
              required={true}
            />

            <TextField
              id="outlined-basic"
              type="password"
              label="password"
              variant="outlined"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && errors.password && true}
              helperText={touched.password && errors.password}
              margin="dense"
              className="fadeIn second"
              fullWidth={true}
              size="small"
              required={true}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth={true}
              size="large"
              style={{ margin: "10px auto" }}
              disabled={
                (touched.password && errors.password && true) ||
                (touched.email && errors.emai && true)
              }
            >
              Secondary
            </Button>
          </form>
          {/* <GoogleLogin
            clientId="835540304132-ejrq6rluhmiut5gbrpk3asovjn6ijdu2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            name="txtGoogle"
            classes="googleBtn"
          /> */}
          <p>Nếu chưa có tài khoản, <Link to="/register">Đăng ký ngay</Link></p>
        </Paper>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUserRequest: (
      values,
      setAllTouched,
      isValid,
      setPasswordMs,
      setEmailMs,
      history
    ) => {
      dispatch(
        Action.LoginUserRequest(
          values,
          setAllTouched,
          isValid,
          setPasswordMs,
          setEmailMs,
          history
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
