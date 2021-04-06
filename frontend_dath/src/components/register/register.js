import React, { Component } from "react";
import "./register.css";
import callApi from "../../utils/apiCaller";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
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

  onSubmit = (e) => {
    e.preventDefault();
    var { txtUsername, txtPassword } = this.state;
    callApi("POST", "user/register", {
      username: txtUsername,
    })
      .then((response) => {
        console.log("OK nha");
      })
      .catch((err) => {
        console.log("Da ton tai tai khoan");
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
              placeholder="Register"
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

export default register;
