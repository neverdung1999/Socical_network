import * as Types from "../contants/index";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const initialState = [];

const defaultMessage = {
  status: false,
  message: "",
  severity: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      const values = action.values;
      const setAllTouched = action.setAllTouched;
      const isValid = action.isValid;
      const cookies = new Cookies();

      try {
        const data = action.data;
        const token = data.token;
        const message = data.message;

        if (token) {
          const decoded = jwt_decode(token);

          cookies.set("token", token);
          cookies.set("name", decoded.name);
          cookies.set("email", decoded.email);
          alert("Đăng nhập thành công !!!");
          action.history.push("/");
        }

        if (message === "wrong password") {
          action.setPasswordMs({
            status: true,
            message: "Sai mật khẩu !!!",
            severity: "error",
          });
          // setAllTouched();
          action.setEmailMs(defaultMessage);
        }

        if (message === "account does not exist") {
          action.setEmailMs({
            status: true,
            message: "Chưa tồn tại tài khoản !!!",
            severity: "error",
          });
          // setAllTouched();
          action.setPasswordMs(defaultMessage);
        }
      } catch (error) {
        console.log(error);
      }

      if (values.email === "" || values.password === "") {
        setAllTouched();
      }
      if (!isValid) {
        setAllTouched();
      }
      return state;

    case Types.REGISTER_USER:
      const data = action.data;
      const message = data.message;

      try {
        if (message === "sign up successfully") {
          alert("Đăng ký thành công tài khoản");
          action.history.push("/");
        }

        if (message === "account already exist") {
          action.setEmailMs({
            status: true,
            message: "Đã tồn tại tài khoản !!!",
            severity: "error",
          });
        }
      } catch (error) {
        console.log(error);
      }

      return state;

    default:
      return state;
  }
};

export default user;
