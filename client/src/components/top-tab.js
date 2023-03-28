import './top-tab.css';

export default function TopTab(props) {
  return (
    <div className='top-tab'>
      <div className='horizontal-line'></div>
      <div className='top-tab-content'>
        <h1 className='title'> Title </h1>
        <div className='tabs'>
          <button className='tabs-button' style={props.pageNum === 0 ? {backgroundColor: 'white', color: 'black'} : null} onClick={() => props.setPageNum(0)}> Home </button>
          <button className='tabs-button' style={props.pageNum === 1 ? {backgroundColor: 'white', color: 'black'} : null} onClick={() => props.setPageNum(1)}> Analyze </button>
          <button className='tabs-button' style={props.pageNum === 2 ? {backgroundColor: 'white', color: 'black'} : null} onClick={() => props.setPageNum(2)}> Quests </button>
          <button className='tabs-button' style={props.pageNum === 3 ? {backgroundColor: 'white', color: 'black'} : null} onClick={() => props.setPageNum(3)}> History </button>
        </div>
        <div className='logo-holder'>
          <div className='logo'></div>
        </div>
      </div>
    </div>
  );
}