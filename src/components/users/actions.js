import { USERS } from "./types";
import fetchHandler from "./fetchHandler";

export const fetchUsers = () => {
  const fetchOptions = {
    method: "GET",
    actionType: USERS.FETCH_USERS,
  };

  return fetchHandler(fetchOptions);
};
