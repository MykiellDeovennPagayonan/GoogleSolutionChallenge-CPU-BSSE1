import './results.css';
import Mark from 'mark.js';
import React, { useRef, useEffect, useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function Emphasis(props) {
  const [ importantPhrasesArray, setImportantPhrasesArray ] = useState([])
  const script = props.speechScript
  const scriptRef = useRef(null);
  const markInstanceRef = useRef(null);

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Identify important phrases in the script, that should be highlighted during delivery. List it separated by a |. Do not place it inside of "" \nScript: `;

  async function detectImportantPhrases() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + script + "\nImportant phrases = ",
      temperature: 0,
      max_tokens: 254,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    return (response.data.choices[0].text)
  }  

  useEffect(() => {
    markInstanceRef.current = new Mark(scriptRef.current);
  }, []);

  useEffect(() => {
    async function getEmotions() {
      const importantPhrases = await detectImportantPhrases();
      let arrayedPhrases;
      if (importantPhrases.includes("|")) {
        arrayedPhrases = importantPhrases.split("|")
        let tempArrayedPhrases = []
        for (let i = 0; i < arrayedPhrases.length; i++) {
          tempArrayedPhrases.push(arrayedPhrases[i].trim().replace(/^"(.*)"$/, '$1'))
        }
        arrayedPhrases = tempArrayedPhrases;
      } else {
        arrayedPhrases = importantPhrases
      }
      setImportantPhrasesArray(arrayedPhrases);
    }
    if (props.speechScript.length > 200) {
      getEmotions()
    } else {
      setImportantPhrasesArray("Speech too short")
    }
  }, [props.speechScript]);


  useEffect(() => {
    handleSearch([importantPhrasesArray]);
  }, [importantPhrasesArray]);

  const handleSearch = (words) => {
    markInstanceRef.current.unmark();

    if (words && words.length > 0) {
      words.forEach((word) => {
        markInstanceRef.current.mark(word, {
          className: 'yellow-highlight',
          separateWordSearch: false,
          accuracy: "exactly"
        });        
      });
    }
  };


  return (
    <div className='emphasis-content'>
      <h3 ref={scriptRef}> {script} </h3>
    </div>
  )
}