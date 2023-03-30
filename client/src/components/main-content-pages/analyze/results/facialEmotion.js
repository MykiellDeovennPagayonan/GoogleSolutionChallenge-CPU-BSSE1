import './results.css';
import React from 'react';

export default function FacialEmotion(props) {

  if (props.analysisPageNum === 1) {
    
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
        
        <div className='stats-facial-timeline'>
          {props.facialEmotions?.map((emotion) => {
            return (<div className="stats-facial-timeline-bar" style={
              emotion === "happy" ? {backgroundColor: props.emotionColor.happy, width: 1000/props.facialEmotions.length} : 
              emotion === "angry" ? {backgroundColor: props.emotionColor.angry, width: 1000/props.facialEmotions.length} : 
              emotion === "disgusted" ? {backgroundColor: props.emotionColor.disgusted, width: 1000/props.facialEmotions.length} : 
              emotion === "fearful" ? {backgroundColor: props.emotionColor.fearful, width: 1000/props.facialEmotions.length} : 
              emotion === "neutral" ? {backgroundColor: props.emotionColor.neutral, width: 1000/props.facialEmotions.length} : 
              emotion === "sad" ? {backgroundColor: props.emotionColor.sad, width: 1000/props.facialEmotions.length} : 
              emotion === "surprised" ? {backgroundColor: props.emotionColor.surprised, width: 1000/props.facialEmotions.length} : {width: 1000/props.facialEmotions.length}
            }> </div>)
          })}
          
        </div>
      </div>
    );
  } else {
    return null
  }
}