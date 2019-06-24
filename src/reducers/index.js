import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import category from "./category";
import attraction from "./attraction";
import galleries from "./attractionGallery";

export default combineReducers({
  alert,
  auth,
  category,
  attraction,
  galleries
});
