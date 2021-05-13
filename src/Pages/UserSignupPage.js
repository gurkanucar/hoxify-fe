import React, { Component } from "react";

import { signup } from "../api/apiCalls";

import Input from "../Components/Input";

export default class UserSignupPage extends Component {
  state = {
    username: null,
    agreeChecked: false,
    name: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target; // object destructing
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = "Password missmatch";
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = "Password missmatch";
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({ [name]: value, errors });
  };

  onChangeAgree = (event) => {
    this.setState({ agreeChecked: event.target.checked });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { username, name, password } = this.state;

    const body = {
      username,
      name,
      password,
    };

    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body);
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, agreeChecked, errors } = this.state; // object destructing
    const { username, name, password, passwordRepeat } = errors;

    return (
      <div className="container">
        <h1 className="">User Signup</h1>
        <form>
          <Input
            name="username"
            label="Username"
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="name"
            label="Name"
            error={name}
            onChange={this.onChange}
          />

          <Input
            name="password"
            label="Password"
            error={password}
            onChange={this.onChange}
            type="password"
          />

          <Input
            name="passwordRepeat"
            label="Password Repeat"
            onChange={this.onChange}
            type="password"
            error={passwordRepeat}
          />

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
              disabled={pendingApiCall || passwordRepeat !== undefined}
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
