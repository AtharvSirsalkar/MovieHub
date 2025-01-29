export { removepeople } from "../reducers/peopleSlice";
import axios from "../../utils/axios";
import { loadpeople } from "../reducers/peopleSlice";

export const asynchloadpeople = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let ultimatateDetails = {
      details: details.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    dispatch(loadpeople(ultimatateDetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};
