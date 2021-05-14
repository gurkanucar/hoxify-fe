import React, { Component } from "react";
import axios from "axios";

export default class ApiProgress extends Component {
  state = {
    pendingApiCall: false,
  };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      //  console.log("Api istek atildi");
      this.setState({ pendingApiCall: true });
      return request;
    });

    axios.interceptors.response.use(
      (response) => {
        this.setState({ pendingApiCall: false });
        //   console.log("Api istek bitti");
        return response;
      },
      (error) => {
        this.setState({
          pendingApiCall: false,
        });
        throw error;
      }
    );
  }

  render() {
    const { pendingApiCall } = this.state;
    return (
      <div>
        {React.cloneElement(this.props.children, {
          pendingApiCall: pendingApiCall,
        })}
      </div>
    );
  }
}
