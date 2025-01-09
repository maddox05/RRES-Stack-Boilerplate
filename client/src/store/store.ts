import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import flashReducer from "../components/flashmessage/flashMessageSlice";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    flashMessage: flashReducer,
  },
});
