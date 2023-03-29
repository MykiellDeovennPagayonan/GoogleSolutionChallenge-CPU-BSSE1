import './results.css';
import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

export default function Recommendation(props) {
  const [ suggestions, setSuggestions] = useState("Loading...");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    async function suggest() {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a speech coach. Tell me what you think about my speech"},
          {role: "user", content: props.speechScript}],
      });
      if (completion.data.choices[0].message.content.length > 400) {
        setSuggestions(completion.data.choices[0].message.content)
      } else {
        setSuggestions("I did not recieve a speech")
      }
      console.log(completion.data.choices[0].message.content)
    }
    if (props.speechScript.length > 400) {
      suggest()
    } else {
      setSuggestions("Speech too short")
    }

  }, [props.speechScript]);

  if (props.analysisPageNum === 5) {
    return (
      <div className='recommendation-content'>
        <h3>{suggestions}</h3>
      </div>
    );
  } else {
    return null
  }
}