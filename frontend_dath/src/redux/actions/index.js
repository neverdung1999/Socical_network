import * as Types from "../contants/index";
import CallApi from "../../utils/apiCaller";

export const LoginUserRequest = (values, setAllTouched, isValid) => {
  return (dispatch) => {
    return CallApi("POST", "/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      dispatch(LoginUser(values, setAllTouched, isValid));
    });
  };
};

export const LoginUser = (values, setAllTouched, isValid) => {
  return {
    type: Types.LOGIN_USER,
    values,
    setAllTouched,
    isValid,
  };
};
