import React, { Component } from "react";
import "../register/register.css";
import callApi from "../../utils/apiCaller";
import { GoogleLogin } from "react-google-login";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtGoogle: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  responseGoogle = (response) => {
    console.log(response);
  };

  onSubmit = (e) => {
    e.preventDefault();
    var { txtUsername, txtPassword } = this.state;
    callApi("POST", "user/login", {
      username: txtUsername,
      password: txtPassword,
    })
      .then((response) => {
        console.log("Đăng nhập thành công");
      })
      .catch((err) => {
        console.log("Sai tài khoản hoặc mật khẩu");
      });
  };

  render() {
    var { txtUsername, txtPassword } = this.state;
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            {/* <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="User Icon"
            /> */}
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="txtUsername"
              onChange={this.onChange}
              value={txtUsername}
              placeholder="login"
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="txtPassword"
              onChange={this.onChange}
              value={txtPassword}
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          <GoogleLogin
            clientId="835540304132-ejrq6rluhmiut5gbrpk3asovjn6ijdu2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            name="txtGoogle"
          />
          ;
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
