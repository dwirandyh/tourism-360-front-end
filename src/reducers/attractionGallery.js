import { GET_GALLERIES, ADD_GALLERY } from "../actions/types";

const initialState = {
  galleries: [],
  loading: false,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GALLERIES:
      return {
        ...state,
        galleries: payload,
        loading: false
      };
    case ADD_GALLERY:
      return {
        ...state,
        galleries: [payload, ...state.galleries],
        loading: false
      };
    default:
      return state;
  }
};
