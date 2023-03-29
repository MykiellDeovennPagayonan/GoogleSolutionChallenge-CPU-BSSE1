import './record.css';
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Record(props) {
  // for video
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [ emotionTimeline, setEmotionTimeline ] = useState([])
  
  const displaySize = {
    height: 720,
    width: 960
  }
  
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]).then(startVideo).catch(e => console.log(e))
      console.log("models loaded")
    }
  
    loadModels()
  }, [])
  
  useEffect(() => {
    const checkDetections = async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current, displaySize)
      const resized = faceapi.resizeResults(detections, displaySize)
  
      canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
      faceapi.draw.drawDetections(canvasRef.current, resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
  
      if (props.recording && detections && detections.length > 0 && detections[0].expressions) {
        let emotions = detections[0].expressions
        let maxEmotion = "";
        let maxValue = 0;
 
        for (let emotion in emotions) {
          if (emotions[emotion] > maxValue) {
            maxEmotion = emotion;
            maxValue = emotions[emotion];
          }
        }
        setEmotionTimeline(prevTimeline => [...prevTimeline, maxEmotion])
      }
    }
  
    function compressEmotionTimeline(timeline) {
      const compressedEmotionTimeline = [];
      const len = timeline.length;
      
      for (let i = 0; i < len; i += 10) {
        const group = timeline.slice(i, i + 10);
        const freq = group.reduce((acc, val) => {
          acc[val] = acc[val] ? acc[val] + 1 : 1;
          return acc;
        }, {});
        let maxCount = 0;
        let mostCommon;
      
        for (let key in freq) {
          if (freq[key] > maxCount || (freq[key] === maxCount && timeline.indexOf(key) < timeline.indexOf(mostCommon))) {
            maxCount = freq[key];
            mostCommon = key;
          }
        }
      
        compressedEmotionTimeline.push(mostCommon);
      }
      
      return compressedEmotionTimeline;
    }
      
    const interval = setInterval(() => {
      checkDetections()
    }, 100)
  
    if (!props.recording && emotionTimeline.length > 0) {
      props.setFacialEmotions(compressEmotionTimeline(emotionTimeline))
      setEmotionTimeline([])
      console.log(compressEmotionTimeline(emotionTimeline))
    }
  
    return () => clearInterval(interval)
  
  }, [props.recording])
  
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream)
      .catch(err => console.log(err))
  }
  
  const handleVideo = () => {
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
    faceapi.matchDimensions(canvasRef.current, displaySize)
  }

  // for audio
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  return (
    <div className='record-content'>
      <div className='video-cam'>
        <video ref={videoRef} autoPlay muted height={displaySize.height} width={displaySize.width} onPlay={handleVideo} className='display'/>
        <canvas ref={canvasRef} height={displaySize.height} width={displaySize.width} className='display'/>
      </div>
      <div className='record'>
        <div className='buttons-holder-analyze'>
          {props.recording ? 
            <button className='button-record' style={{backgroundColor: '#f05850'}} onClick={() => {SpeechRecognition.stopListening(); props.setRecording(false); props.setSpeechScript(transcript)}}> Stop Record </button> :
            <button className='button-record' style={{backgroundColor: '#42B883'}} onClick={() => {SpeechRecognition.startListening({continuous: true}); props.setRecording(true); resetTranscript(); props.setShowResults(false)}}> Start Record </button>
          }
          <button className='button-record' style={{backgroundColor: '#35495E', color: 'white'}} onClick={() => {props.setRecording(false); props.setShowResults(true)}}> Analyze </button>
        </div>
      </div>
    </div>
  );
}