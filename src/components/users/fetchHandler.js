const API_URL = "https://randomuser.me/api/0.8/?results=20";

export default function fetchHandler({ url, method, actionType, body }) {
  return async (dispatch) => {
    const promise = fetch(`${API_URL}${url ? url : ""}`, {
      method,
      headers: {},
      body,
    });
    const response = await promise;
    return responseHandler(response, actionType, dispatch);
  };
}

async function responseHandler(response, actionType, dispatch) {
  let json;
  try {
    json = response.json && (await response.json());
  } catch (error) {
    console.log(`Response is not a json object`); // eslint-disable-line no-console
  }
  json = json || {};

  if (200 <= response.status && response.status < 300) {
    dispatch({
      type: actionType,
      payload: json,
    });
  } else {
    return { ...json, hasError: true };
  }
}
