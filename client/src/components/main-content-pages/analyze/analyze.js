import { useState } from 'react';
import './analyze.css';
import Record from './record/record'
import Results from './results/results';

export default function Analyze() {
  const [ recording, setRecording ] = useState(false)
  const [ speechScript, setSpeechScript ] = useState('')
  const [ facialEmotions, setFacialEmotions ] = useState([])
  const [ showResults, setShowResults ] = useState(true)

  return (
    <div className='analyze-content'>
      <Record recording={recording} setRecording={setRecording} setFacialEmotions={setFacialEmotions} setSpeechScript={setSpeechScript} setShowResults={setShowResults}/>
      {showResults ? <Results facialEmotions={facialEmotions} speechScript={speechScript}/> : null}
    </div>
  );
}