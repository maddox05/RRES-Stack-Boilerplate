import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.MODE === "development" ? undefined : "idk dude",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
