import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from "../actions/types";

const initialState = {
  categories: {
    page: {
      page: 1,
      pageSize: 20,
      total: 15
    },
    data: []
  },
  allCategories: [],
  category: {},
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: payload,
        loading: false
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: {
          page: state.categories.page,
          data: state.categories.data.filter(
            category => category.id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
};
