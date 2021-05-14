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
      axios.interceptors.request.use((request) => {
        //  console.log("Api istek atildi");
        this.updateApiCallFor(request.url, true);
        return request;
      });

      axios.interceptors.response.use(
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

    updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({ pendingApiCall: inProgress });
      }
    };

    render() {
      const { pendingApiCall } = this.state;
      /* return (
        <div>{React.cloneElement(this.props.children, { pendingApiCall })}</div>
      );*/
      return (
        <WrappdedComponent pendingApiCall={pendingApiCall} {...this.props} />
      );
    }
  };
}
