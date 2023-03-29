import { useState } from 'react';
import './analyze.css';
import createSpeech from '../../functions/createSpeech'
import Record from './record/record'
import Results from './results/results';

export default function Analyze() {
  const [ recording, setRecording ] = useState(false)
  const [ speechScript, setSpeechScript ] = useState('')
  const [ facialEmotions, setFacialEmotions ] = useState([])
  const [ emotions, setEmotions ] = useState([])
  const [ showResults, setShowResults ] = useState(true)

  async function saveSpeech() {
    if (speechScript !== '') {
      createSpeech(speechScript, facialEmotions, emotions)
    } else {
      console.log("cant save")
    }
  }

  return (
    <div className='analyze-content'>
      <Record recording={recording} setRecording={setRecording} setFacialEmotions={setFacialEmotions} setSpeechScript={setSpeechScript} speechScript={speechScript} setShowResults={setShowResults}/>
      <button className='save' style={{backgroundColor: '#35495E', color: 'white'}} onClick={() => {saveSpeech()}}> Save </button>
      {showResults ? <Results facialEmotions={facialEmotions} speechScript={speechScript} emotions={emotions} setEmotions={setEmotions}/> : null}
    </div>
  );
}