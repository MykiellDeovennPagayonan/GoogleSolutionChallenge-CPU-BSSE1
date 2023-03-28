import Axios from "axios";

export default async function deleteSpeech(id) {
  Axios.delete("http://localhost:7000/deleteSpeech/" + id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}