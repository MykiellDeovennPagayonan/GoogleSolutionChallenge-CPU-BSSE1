import Axios from "axios";

export default async function getSpeeches() {
  return Axios.get("http://localhost:7000/getSpeeches").then((response) => {
    return response.data;
  });
}