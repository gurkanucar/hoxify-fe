import React, { Component } from "react";

import { signup } from "../api/apiCalls";

export default class UserSignupPage extends Component {
  state = {
    username: null,
    agreeChecked: false,
    name: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
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

  onClickSignup = async (event) => {
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

    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body);
    } catch (err) {}

    this.setState({ pendingApiCall: false });

    //   signup(body).then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });
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
    const { pendingApiCall, agreeChecked } = this.state; // object destructing

    return (
      <div className="container">
        <h1 className="">User Signup</h1>
        <form>
          <div className="mb-3">
            <label className="form-label">Kullanıcı Adı</label>
            <input
              className="form-control"
              name="username"
              onChange={this.onChange}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Gözükecek İsim</label>
            <input
              className="form-control"
              name="name"
              onChange={this.onChange}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Şifre</label>
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Şifre Tekrar</label>
            <input
              className="form-control"
              name="passwordRepeat"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>

          <div className="mb-3 form-check">
            <label for="agreeChecked" className="form-check-label">
              Okudum Onaylıyorum
            </label>
            <input
              id="agreeChecked"
              className="form-check-input"
              name="agreeChecked"
              type="checkbox"
              onChange={this.onChangeAgree}
            ></input>
          </div>

          <div className=" text-center">
            <button
              className="btn btn-primary"
              disabled={!agreeChecked || pendingApiCall}
              onClick={this.onClickSignup}
            >
              {pendingApiCall && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {"  "}Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
