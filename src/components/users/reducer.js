const initialState = {
  list: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { list: action.payload.results };
    default:
      return state;
  }
};

export default userReducer;
