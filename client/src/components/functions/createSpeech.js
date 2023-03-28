import Axios from "axios";

class Speech {
  transcript;
  facialEmotion;
  speechEmotion;
  tone;
  emphasis;
  recommendation;
  open;

  constructor(transcript, facialEmotion, speechEmotion, tone, emphasis, recommendation) {
    this.transcript = transcript
    this.facialEmotion = facialEmotion
    this.speechEmotion = speechEmotion
    this.tone = tone
    this.emphasis = emphasis
    this.recommendation = recommendation
  }
}

export default async function createSpeech(transcript, facialEmotion, speechEmotion, tone, emphasis, recommendation) {
  const newSpeech = new Speech(transcript, facialEmotion, speechEmotion, tone, emphasis, recommendation)
  Axios.post("http://localhost:7000/createSpeech", newSpeech)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}