import './main-content.css';
import Home from './main-content-pages/home/home';
import History from './main-content-pages/history/history'
import Analyze from './main-content-pages/analyze/analyze'

export default function MainContent(props) {
  return (
    <div className='main-content'>
      {props.pageNum === 0? <Home /> : null}
      {props.pageNum === 1? <Analyze /> : null}
      {props.pageNum === 3? <History /> : null}
    </div>
  );
}