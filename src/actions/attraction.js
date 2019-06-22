import axios from "axios";
import {
  GET_ATTRACTIONS,
  ATTRACTION_ERROR,
  DELETE_ATTRACTION,
  GET_ATTRACTION,
  UPDATE_ATTRACTION
} from "./types";
import { API_URL } from "../config";

export const getAttractions = (page = 1) => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/tourist-attraction?page=${page}`
    );

    dispatch({
      type: GET_ATTRACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ATTRACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const searchAttractions = query => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      params: query
    };
    const res = await axios.get(`${API_URL}/api/tourist-attraction/`, config);

    dispatch({
      type: GET_ATTRACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ATTRACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addAttraction = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  try {
    let axiosFormData = new FormData();
    axiosFormData.append("thumbnail", formData.thumbnail);
    axiosFormData.append("name", formData.name);
    axiosFormData.append("address", formData.address);
    axiosFormData.append("shortDescription", formData.shortDescription);
    axiosFormData.append("description", formData.description);
    axiosFormData.append("longitude", formData.longitude);
    axiosFormData.append("latitude", formData.latitude);

    await axios.post(
      `${API_URL}/api/tourist-attraction`,
      axiosFormData,
      config
    );
    history.push("/attraction");
  } catch (err) {
    alert(err);
  }
};

export const updateAttraction = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  try {
    let axiosFormData = new FormData();
    axiosFormData.append("thumbnail", formData.thumbnail);
    axiosFormData.append("name", formData.name);
    axiosFormData.append("address", formData.address);
    axiosFormData.append("shortDescription", formData.shortDescription);
    axiosFormData.append("description", formData.description);
    axiosFormData.append("longitude", formData.longitude);
    axiosFormData.append("latitude", formData.latitude);

    const res = await axios.put(
      `${API_URL}/api/tourist-attraction/${id}`,
      axiosFormData,
      config
    );
    dispatch({
      type: UPDATE_ATTRACTION,
      payload: res.data
    });
    history.push("/attraction");
  } catch (err) {
    alert(err);
  }
};

export const getAttraction = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get(
      `${API_URL}/api/tourist-attraction/${id}`,
      [],
      config
    );
    dispatch({
      type: GET_ATTRACTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ATTRACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAttraction = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.delete(`${API_URL}/api/tourist-attraction/${id}`, [], config);
    dispatch({
      type: DELETE_ATTRACTION,
      payload: id
    });

    dispatch(getAttractions());
  } catch (err) {
    alert(err);
  }
};

export const cleanAttractionState = () => async dispatch => {
  dispatch({
    type: GET_ATTRACTION,
    payload: {}
  });
};
