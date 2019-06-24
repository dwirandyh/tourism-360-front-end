import axios from "axios";
import { GET_GALLERIES, GALLERY_ERROR, DELETE_GALLERY } from "./types";
import { API_URL } from "../config";

export const getGalleries = attractionId => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/tourist-gallery/attraction/${attractionId}`
    );

    dispatch({
      type: GET_GALLERIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GALLERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addGallery = (formData, attractionId) => async dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  try {
    console.log(formData);
    let axiosFormData = new FormData();
    axiosFormData.append("title", formData.title);
    axiosFormData.append("touristAttractionId", attractionId);
    axiosFormData.append("thumbnail", formData.thumbnail);

    await axios.post(`${API_URL}/api/tourist-gallery`, axiosFormData, config);

    dispatch(getGalleries(attractionId));
  } catch (err) {
    dispatch({
      type: GALLERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteGallery = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.delete(`${API_URL}/api/tourist-gallery/${id}`, [], config);

    dispatch({
      type: DELETE_GALLERY,
      payload: id
    });

    dispatch(getGalleries());
  } catch (err) {
    alert(err);
  }
};
