import './history.css';
import { useState, useEffect } from 'react';
import getSpeeches from '../../functions/getSpeeches';

export default function History() {
  const [ speeches, setSpeeches ] = useState();
  const [ open, setOpen ] = useState([])

  async function load() {
    const response = await getSpeeches();
    setSpeeches(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    let openInitial = []
    for (let i = 0; i < speeches?.length; i++) {
      openInitial.push(false)
    }
    setOpen(openInitial)
  }, [speeches])

  useEffect(() => {
    load();
  }, []);

  return (
    <div className='history-content'>
      {speeches?.map((speech, index) => {
        if (open[index]){
          return (
            <div className='speech-holder'>
              <div className='speech-transcript'>
                <h3 style={{color: '#42B883', margin: 0}}> Transcript: </h3>
                <h4 className='transcript'> {speech.transcript} </h4>
              </div>
              <div className='speech'>
                <h3 style={{color: '#42B883', margin: 0}}> Transcript: </h3>
                <h4 className='transcript'> {speech.transcript} </h4>
              </div>
              <h4 className='see-more' onClick={(index) => {
                let openInitial = [...open]
                openInitial.splice(index, 1, false)
                setOpen(openInitial)
              }}> see less </h4>
            </div>
          )
        } else {
          return (
            <div className='speech-holder'>
              <div className='speech'>
                <h3 style={{color: '#42B883', margin: 0}}> Transcript: </h3>
                <h4 className='transcript'> {speech.transcript} </h4>
              </div>
              <h4 className='see-more' onClick={(index) => {
                let openInitial = [...open]
                openInitial.splice(index, 1, true)
                setOpen(openInitial)
              }}> see more </h4>
            </div>
          )
        }

      })}
    </div>
  );
}