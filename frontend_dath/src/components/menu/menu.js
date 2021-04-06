import React, { Component } from "react";
import { Link } from "react-router-dom";

class menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              WebSiteName
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className="active">
              <Link to={"/login"}>Đăng nhập</Link>
            </li>
            <li className="active">
              <Link to={"/register"}>Đăng ký</Link>
            </li>
            <li className="active">
              <Link to={"/loginForm"}>Đăng nhập test</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default menu;
