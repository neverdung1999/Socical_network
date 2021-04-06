import React from "react";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/register";
import Home from "./components/home/home";
import NotFound from "./components/notFound/notFound";

const Routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/loginForm",
    exact: true,
    main: ({ history }) => <LoginForm history={history} />,
  },
  {
    path: "/register",
    exact: true,
    main: ({ history    }) => <Register history={history} />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default Routes;
