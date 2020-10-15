import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_HOMEPAGES_SUCCESS = "FETCH_HOMEPAGES_SUCCESS";

export const fetchHomepagesSuccess = homepages => ({
  type: FETCH_HOMEPAGES_SUCCESS,
  payload: homepages
});

export const fetchHomepages = () => {
  return async (dispatch, getState) => {
    const homepagesCount = getState().homepages.length;
    const response = await axios.get(
      `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
    );

    // console.log(response.data);
    dispatch(fetchHomepagesSuccess(response.data.homepages.rows));
  };
};
