import React, { Component } from "react";
import axios from "axios";

export default class UserSignupPage extends Component {
  state = {
    username: null,
    agreeChecked: false,
    name: null,
    password: null,
    passwordRepeat: null,
  };

  onChange = (event) => {
    const { name, value } = event.target; // object destructing
    // const value = event.target.value;
    // const name = event.target.name;
    this.setState({ [name]: value });
  };

  onChangeAgree = (event) => {
    this.setState({ agreeChecked: event.target.checked });
  };

  onClickSignup = (event) => {
    event.preventDefault();

    const { username, name, password } = this.state;

    /*  const body = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    };*/

    const body = {
      username,
      name,
      password,
    };

    axios.post("/api/user", body);
  };

  /*
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangePasswordRepeat = (event) => {
    this.setState({ passwordRepeat: event.target.value });
  };
*/

  render() {
    return (
      <div>
        <h1>User Signup</h1>
        <form>
          <div>
            <label>Kullanıcı Adı</label>
            <input name="username" onChange={this.onChange}></input>
          </div>

          <div>
            <label>Gözükecek İsim</label>
            <input name="name" onChange={this.onChange}></input>
          </div>

          <div>
            <label>Şifre</label>
            <input
              name="password"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>

          <div>
            <label>Şifre Tekrar</label>
            <input
              name="passwordRepeat"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>

          <div>
            <label>Okudum Onaylıyorum</label>
            <input
              name="agreeChecked"
              type="checkbox"
              onChange={this.onChangeAgree}
            ></input>
          </div>

          <button
            disabled={!this.state.agreeChecked}
            onClick={this.onClickSignup}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
