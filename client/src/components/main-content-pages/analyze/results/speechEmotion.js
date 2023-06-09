import './results.css';
import React, { useEffect, useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function SpeechEmotion(props) {
  const [ sentences, setSentences ] = useState(props.speechScript.split(/(?<=[.?!])\s+/))

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Classify if the sentence which emotion, be sensitive dont always choose neutral. Only choose from the following: Happy, Sad, Neutral, Angry, Fearful, Disgusted, Surprised \nSentence:`;

  async function detectEmotion(sentence) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + sentence + "\nClassification:",
      temperature: 0,
      max_tokens: 3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response.data.choices[0].text.toLowerCase().includes('happy')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.happy, color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('angry')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.angry, color: 'white'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('disgusted')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.disgusted, color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('neutral')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.neutral, color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('fearful')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.fearful, color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('sad')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.sad, color: 'black'}}> {sentence} </h3>)
    }
    if (response.data.choices[0].text.toLowerCase().includes('surprised')) {
      return(<h3 className='sentence' style={{backgroundColor: props.emotionColor.surprised, color: 'black'}}> {sentence} </h3>)
    } else {
      return null
    }
  }  

  useEffect(() => {
    setSentences(props.speechScript.split(/(?<=[.?!])\s+/))
    async function getEmotions() {
      const emotions = await Promise.all(sentences.map((sentence) => detectEmotion(sentence)));
      props.setEmotions(emotions);
    }
    getEmotions();
  }, [props.speechScript]);

  if (props.analysisPageNum === 2) {
    return (
      <div className='speech-emotion-content'>
        <div className='legend'>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.happy}} className='color'></div>
            <h3>happy</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.angry}} className='color'></div>
            <h3>angry</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.disgusted}} className='color'></div>
            <h3>disgusted</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.fearful}} className='color'></div>
            <h3>fearful</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.neutral}} className='color'></div>
            <h3>neutral</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.sad}} className='color'></div>
            <h3>sad</h3>
          </div>
          <div className='color-label-holder'>
            <div style={{backgroundColor: props.emotionColor.surprised}} className='color'></div>
            <h3>surprised</h3>
          </div>
        </div>
        {props.emotions}
      </div>
    );
  } else {
    return null
  }
  
}