import * as Types from "../contants/index";
import CallApi from "../../utils/apiCaller";

export const LoginUserRequest = (
  values,
  setAllTouched,
  isValid,
  setPasswordMs,
  setEmailMs,
  history
) => {
  return (dispatch) => {
    return CallApi("POST", "/user/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      dispatch(
        LoginUser(
          response.data,
          values,
          setAllTouched,
          isValid,
          setPasswordMs,
          setEmailMs,
          history
        )
      );
    });
  };
};

export const LoginUser = (
  data,
  values,
  setAllTouched,
  isValid,
  setPasswordMs,
  setEmailMs,
  history
) => {
  return {
    type: Types.LOGIN_USER,
    data,
    values,
    setAllTouched,
    isValid,
    setPasswordMs,
    setEmailMs,
    history,
  };
};

export const RegisterUserRequest = (
  values,
  setAllTouched,
  isValid,
  setEmailMs,
  history
) => {
  return (dispatch) => {
    return CallApi("POST", "/user/register", {
      name: values.name,
      email: values.email,
      password: values.password,
    }).then((response) => {
      dispatch(
        RegisterUser(
          response.data,
          values,
          setAllTouched,
          isValid,
          setEmailMs,
          history
        )
      );
    });
  };
};

export const RegisterUser = (
  data,
  values,
  setAllTouched,
  isValid,
  setEmailMs,
  history
) => {
  return {
    type: Types.REGISTER_USER,
    data,
    values,
    setAllTouched,
    isValid,
    setEmailMs,
    history,
  };
};


