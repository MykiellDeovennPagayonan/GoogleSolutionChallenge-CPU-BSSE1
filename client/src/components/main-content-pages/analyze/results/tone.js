import './results.css';
import React, { useEffect, useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function Tone(props) {
  const [ emotions, setEmotions ] = useState([])
  const sentences = props.speechScript.split(/(?<=[.?!])\s+/);

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Classify the tone of the sentence. Only choose from the following: Formal, Light-hearted, Calm \nSentence:`;

  async function detectEmotion(sentence) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + sentence + "\nClassification:",
      temperature: 0,
      max_tokens: 6,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text.toLowerCase())
    if (response.data.choices[0].text.toLowerCase().includes('formal')) {
      return(<h3 className='sentence' style={{backgroundColor: 'rgb(48, 48, 48)', color: 'white'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('light-hearted')) {
      return(<h3 className='sentence' style={{backgroundColor: 'rgb(245, 166, 35)', color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('calm')) {
      return(<h3 className='sentence' style={{backgroundColor: 'rgb(140, 200, 182)', color: 'black'}}> {sentence} </h3>)
    } else {
      return(<h3 className='sentence' style={{color: 'black'}}> {sentence} </h3>)
    }
  }  

  useEffect(() => {
    async function getEmotions() {
      const emotions = await Promise.all(sentences.map((sentence) => detectEmotion(sentence)));
      setEmotions(emotions);
    }
    getEmotions();
  }, [props.speechScript]);

  if (props.analysisPageNum === 3) {
    return (
      <div className='tone-content'>
        {emotions}
      </div>
    );
  } else {
    return null
  }
}