import React, { Component } from "react";
import axios from "axios";

function getDisplayName(WrappdedComponent) {
  return WrappdedComponent.displayName || WrappdedComponent.name || "Component";
}

export function withApiProgress(WrappdedComponent, apiPath) {
  return class extends Component {
    static displayName = `ApiProgress(${getDisplayName(WrappdedComponent)})`;
    //static displayName =
    // "ApiProgress(" + getDisplayName(WrappdedComponent) + ")";

    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        //console.log("Api istek atildi", request.url);
        this.updateApiCallFor(request.url, true);
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (response) => {
          //   console.log("Api istek bitti");
          this.updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          this.updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({ pendingApiCall: inProgress });
      }
    };

    render() {
      const pendingApiCall =
        this.state.pendingApiCall || this.props.pendingApiCall;
      return (
        <WrappdedComponent {...this.props} pendingApiCall={pendingApiCall} />
      );
    }
  };
}
