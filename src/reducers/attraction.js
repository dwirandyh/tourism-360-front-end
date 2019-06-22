import {
  GET_ATTRACTION,
  GET_ATTRACTIONS,
  ADD_ATTRACTION,
  DELETE_ATTRACTION,
  UPDATE_ATTRACTION
} from "../actions/types";

const initialState = {
  attractions: {
    page: {
      page: 1,
      pageSize: 20,
      total: 15
    },
    data: []
  },
  attraction: {},
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ATTRACTIONS:
      return {
        ...state,
        attractions: payload,
        loading: false
      };
    case UPDATE_ATTRACTION:
    case GET_ATTRACTION:
      return {
        ...state,
        attraction: payload,
        loading: false
      };
    case ADD_ATTRACTION:
      return {
        ...state,
        attractions: [payload, ...state.attractions],
        loading: false
      };
    case DELETE_ATTRACTION:
      return {
        ...state,
        attractions: {
          page: state.attractions.page,
          data: state.attractions.data.filter(
            attraction => attraction.id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
};
