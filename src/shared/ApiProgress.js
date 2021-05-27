import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
  const [pendingAoiCall, setPendingAoiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        setPendingAoiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        //console.log("Api istek atildi", request.url);
        updateApiCallFor(request.url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          //   console.log("Api istek bitti");
          updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    };

    const unRegisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return function unmount() {
      unRegisterInterceptors();
    };
  });

  return pendingAoiCall;
};
