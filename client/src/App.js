import { useState } from 'react';
import './app.css';
import TopTab from './components/top-tab';
import MainContent from './components/main-content';

export default function App() {
  const [ pageNum, setPageNum ] = useState(0)


  return (
    <div className='app'>
      <TopTab pageNum={pageNum} setPageNum={setPageNum}/>

      <MainContent pageNum={pageNum}/>
    </div>
  );
}