import React, { useCallback } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { GoogleLogin } from "react-google-login";
import "./login.css";

import { connect } from "react-redux";
import * as Action from "../../redux/actions/index";

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

      props.loginUserRequest(values, setAllTouched, isValid);
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
            src="/static/images/avatar/1.jpg"
            className="center"
          />
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
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth={true}
              size="large"
              style={{ margin: "10px auto" }}
            >
              Secondary
            </Button>
          </form>
          <GoogleLogin
            clientId="835540304132-ejrq6rluhmiut5gbrpk3asovjn6ijdu2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            name="txtGoogle"
            classes="googleBtn"
          />
        </Paper>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUserRequest: (values, setAllTouched, isValid) => {
      dispatch(Action.LoginUserRequest(values, setAllTouched, isValid));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
