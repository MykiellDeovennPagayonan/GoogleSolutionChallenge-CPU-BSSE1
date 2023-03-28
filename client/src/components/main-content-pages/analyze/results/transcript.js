import './results.css';

export default function Transcript(props) {
  if (props.analysisPageNum === 0) {
    return (
      <div>
        <h3> {props.speechScript} </h3>
      </div>
    );
  } else {
    return null
  }
}