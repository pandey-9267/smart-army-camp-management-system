import { notification } from "antd";

import codeMessage from "./codeMessage";

const successHandler = (response, typeNotification = {}) => {
  if (!response.data.result) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }

  const { data } = response;

  const isEmptyCollection =
    response.status === 203 &&
    Array.isArray(data.result) &&
    data.result.length === 0;

  if (data.success === false && !isEmptyCollection) {
    const message = data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;

    notification.config({
      duration: 20,
    });

    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  }

  return data;
};

export default successHandler;