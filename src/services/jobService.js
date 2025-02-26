import axios from "axios";

const API_URL = "https://www.themuse.com/api/public/jobs";

export const fetchJobs = async (page = 1, level = "") => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&level=${level}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
