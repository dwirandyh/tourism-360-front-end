import axios from "axios";
import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  DELETE_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY
} from "./types";
import { API_URL } from "../config";

export const getCategories = (page = 1) => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/category?page=${page}`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const searchCategories = query => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      params: query
    };
    const res = await axios.get(`${API_URL}/api/category/`, config);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCategory = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  try {
    let axiosFormData = new FormData();
    axiosFormData.append("thumbnail", formData.thumbnail);
    axiosFormData.append("name", formData.name);
    axiosFormData.append("description", formData.description);

    await axios.post(`${API_URL}/api/category`, axiosFormData, config);
    history.push("/category");
  } catch (err) {
    alert(err);
  }
};

export const updateCategory = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = axios.put(`${API_URL}/api/category/${id}`, formData, config);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data
    });
    history.push("/category");
  } catch (err) {
    alert(err);
  }
};

export const getCategory = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get(`${API_URL}/api/category/${id}`, [], config);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteCategory = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.delete(`${API_URL}/api/category/${id}`, [], config);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  } catch (err) {
    alert(err);
  }
};
