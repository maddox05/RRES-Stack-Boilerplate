import axios from "./axios";
import {
  hideFlashMessage,
  showFlashMessage,
} from "../components/flashmessage/flashMessageSlice";
import { startLoading, stopLoading } from "../store/loadingSlice";

/**
 * A redux thunk standard api call THIS IS BASICALLY A MIDDLEWARE (idk how to make a real one yet) IF YOU ARE TALKING TO THE API PLS USE THIS
 * dispatches side affect actions such as loading, flash messages, adding the page to the fetch history
 *
 * @param {String} method get post put patch delete
 * @param {String} route where you wanna send data
 * @param {Object} [data] data you wanna send
 * @param {String || Array} resultAction the constant you have in your reducer to set the data afer its returned
 * @param {Object} [options] - Additional options for the request.
 * @param {Array} [options.loadingComponent] - The name of the component to show while the request is in progress.
 * @param {String} [options.fetchHistory] - Do you want to add fetch history to state
 * @param {AxiosRequestConfig} [options.axiosConfig] - Axios Config
 * @param {String} [options.errorMsg] - error message to be seen by user
 * @param {String} [options.noticeOfSuccess] - if given, will show a flash message with this message
 * @param {Boolean} [options.hideError] - wanna hide error message? go for it
 * @returns {Function} dispatches an action to the reducer with a action.payload of the data
 */
export function standardApiCall(
  method: string,
  route: string,
  data = null,
  resultAction: string,
  options
) {
  return async function (dispatch) {
    dispatch(startLoading(options?.loadingComponent));
    try {
      let result = null;
      if (method === "post" || method === "put" || method === "patch") {
        result = await axios[method.toLowerCase()](
          route,
          data,
          options?.axiosConfig
        );
      } else if (method === "get" || method === "delete") {
        result = await axios[method.toLowerCase()](route, options?.axiosConfig);
      } else {
        dispatch(
          showFlashMessage(
            "axios method not found, this is a developer error. email support for help",
            "err"
          )
        );
        return;
      }
      if (Array.isArray(resultAction)) {
        for (let i = 0; i < resultAction.length; i++) {
          dispatch({ type: resultAction[i], payload: result.data });
        }
      } else if (resultAction)
        dispatch({ type: resultAction, payload: result.data });

      dispatch(hideFlashMessage());

      if (options?.noticeOfSuccess) {
        dispatch(showFlashMessage(options.noticeOfSuccess, null));
      }
      dispatch(stopLoading(options?.loadingComponent));
      return result.data;
    } catch (error) {
      console.error(error);
      dispatch(stopLoading(options?.loadingComponent));
      console.error("Failed req to ", error?.request?.responseURL);

      dispatch(
        showFlashMessage(
          "message:",
          error?.response?.data?.message || options?.errorMsg || error.message
        )
      );
    }
  };
}
