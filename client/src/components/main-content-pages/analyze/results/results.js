import { useEffect, useState } from 'react';
import './results.css';
import Transcript from './transcript';
import FacialEmotion from './facialEmotion'
import SpeechEmotion from './speechEmotion'
import Tone from './tone'
import Emphasis from './emphasis'
import Recommendation from './recommendation'

export default function Results(props) {
  const [ analysisPageNum, setAnalysisPageNum ] = useState(0)
  const emotionColor = {
    angry: 'rgb(255, 0, 0)',            // Red
    disgusted: 'rgb(120, 255, 120)',    // Light green
    fearful: 'rgb(255, 128, 0)',        // Dark orange
    happy: 'rgb(255, 255, 102)',        // Pastel yellow
    neutral: 'rgb(255, 255, 255)',      // White
    sad: 'rgb(102, 178, 255)',          // Baby blue
    surprised: 'rgb(255, 192, 203)'     // Pink
  }

  return (
    <div className='results-content'>
      <div className='results-content-holder'>
        <FacialEmotion facialEmotions={props.facialEmotions} analysisPageNum={analysisPageNum} emotionColor={emotionColor}/>
        <div className='results-content-holder-text'>
          <Transcript speechScript={props.speechScript} analysisPageNum={analysisPageNum}/>
          <SpeechEmotion speechScript={props.speechScript} analysisPageNum={analysisPageNum} emotionColor={emotionColor} emotions={props.emotions} setEmotions={props.setEmotions}/>
          <Tone speechScript={props.speechScript} analysisPageNum={analysisPageNum}/>
          {analysisPageNum === 4 ? <Emphasis speechScript={props.speechScript} analysisPageNum={analysisPageNum}/> : null}
          <Recommendation speechScript={props.speechScript} analysisPageNum={analysisPageNum}/>
        </div>
      </div>
      <div className='results-right-tab'>
        <button className='button-result-switch' style={analysisPageNum === 0 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(0)}> Transcript </button>
        <button className='button-result-switch' style={analysisPageNum === 1 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(1)}> Facial Emotion </button>
        <button className='button-result-switch' style={analysisPageNum === 2 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(2)}> Speech Emotion </button>
        <button className='button-result-switch' style={analysisPageNum === 3 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(3)}> Tone Analysis </button>
        <button className='button-result-switch' style={analysisPageNum === 4 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(4)}> Emphasis Analysis </button>
        <button className='button-result-switch' style={analysisPageNum === 5 ? {backgroundColor: '#42B883', color: 'black'} : null} onClick={() => setAnalysisPageNum(5)}> Recommendations </button>
      </div>
    </div>
  );
}