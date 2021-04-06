import * as Types from "../contants/index";

const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      console.log(action);
      //   if (action.values.email === "" || action.values.password === "") {
      //     setAllTouched();
      //     return;
      //   }
      //   if (!action.isValid) {
      //     setAllTouched();
      //     return;
      //   }
      return state;
    default:
      return state;
  }
};

export default user;
