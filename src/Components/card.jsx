import { useState, useEffect, useRef } from 'react';
import Progress from "./progress";
import TimeDisplayer from "./timeDisplayer";

import "../CSS/Card.css";
import doneSound from "../sound/done.wav";

function Card( props ) {
  
  const initialTime = props.data.time * 60;
  
  const [ timeLeft, setTimeLeft ] = useState(initialTime);
  const [ timeText, setTimeText ] = useState({});
  const [ percentage, setPercentage ] = useState(1);
  
  const [ editMode, setEditMode ] = useState(false);
  
  const container = useRef({
    time: timeLeft,
    initial: timeLeft,
    id: props.data.id,
    isFinished: props.data.isFinished,
    startCountDown: null,
    data: {}
  });
  
  container.current.isFinished = props.data.isFinished;
  
  useEffect(() => {
    if (editMode) {
      console.log("Clock Paused");
      clearInterval(container.current.intervalId);
    }
    else {
      console.log("Clock resumed");
      container.current.intervalId = setInterval(container.current.startCountDown, 1000);
    }
  }, [editMode]);
  
  useEffect(() => {
    
    let start = Date.now(), currentRef = container.current;
    
    function startCountDown() {
      
      if (currentRef.isFinished) {
        currentRef.time = 0;
      }
      
      currentRef.time -= (Date.now() - start) / 1000;
      
      setPercentage(v => 1 * (currentRef.time / currentRef.initial).toFixed(2));
      setTimeLeft(currentRef.time);
      setTimeText(formatTime(currentRef.time));
      
      if (currentRef.time <= 0) {
        console.log("Stopped Count Down");
        currentRef.isFinished = true;
        return clearInterval(currentRef.intervalId);
      }
      start = Date.now();
    }
    
    
    function formatTime(text) {
      return {
        days: Math.max(Math.floor(text / 60 / 60 / 24, 0), 0),
        hours: Math.max(Math.floor(text / 60 / 60) % 24, 0),
        minutes: Math.max(Math.floor(text / 60) % 60, 0),
        seconds: Math.max(Math.round(text % 60), 0),
        milliseconds: 1 * ((text - Math.floor(text)) * 1000).toFixed(4)
      }
    }
    
    currentRef.startCountDown = startCountDown;
    currentRef.intervalId = setInterval(currentRef.startCountDown, 1000);
    
    return () => clearInterval(currentRef.intervalId);
  }, []);
  
  function buttonHandler() {
    props.callbackParent.remove(container.current.id);
  }
  
  async function editHandler() {
    let data = await props.callbackParent.getDataById(container.current.id);
    if (JSON.stringify(container.current.data) !== JSON.stringify(data)) {
      container.current.data = data;
    }
    if (data) {
      setEditMode(v => !v);
    }
    // data.isFinished = true;
    // props.callbackParent.changeDataWithId(data.id, data);
  }
  
  function changeBack(event) {
    event.preventDefault();
    
    const values = {};
    
    [...event.target].forEach((item, i) => {
      // if (item.name && item.value) values[item.name] = item.value;
      if (item.name) values[item.name] = item.value;
    });
    
    setEditMode(v => !v);
    
    console.log(container.current.data);
    console.log(values);
    console.log("change back");
  }
  
  function onPlayHanler(event) { return event.target.volume = 0.05; }
  
  function renderTime() {
    if (percentage <= 0) {
      return (
        <>
          <div>
            <audio autoPlay onCanPlayThrough={onPlayHanler}>
              <source type="audio/wav" src={doneSound} />
            </audio>
          </div>
          <div>
            Done
          </div>
        </>
      )
    }
    return percentage <= 0 ? <div>Loading...</div> : <TimeDisplayer data={timeText}/>
  }
  
  return (
    <div className="card">
      <h1>{props.data.title}</h1>
      {
        !editMode 
          ? (
            <div className="card-body">
              <Progress percentage={percentage} />
              <div className="card-timer">
                {
                  renderTime()
                }
              </div>
              <button onClick={buttonHandler}>Remove</button>
              {
                container.current.time > 0 && <button onClick={editHandler}>Edit</button>
              }
            </div>
          )
          : (
            <div>
              <form onSubmit={changeBack} >
                <div>
                  <label htmlFor={`title_${container.current.id}`}>Title</label>
                </div>
                <input 
                  type="search" 
                  id={`title_${container.current.id}`} 
                  name="title" 
                  placeholder={props.data.title}
                />
                
                <div>
                  <label htmlFor={`email_${container.current.id}`}>Add/Remove</label>
                </div>
                <input type="number" id={`email_${container.current.id}`} name="add" />

                <div>
                  <button type="submit">Confirm</button>
                  <button type="submit">Cancel</button>
                </div>
              </form>
            </div>
          )
      }
    </div>
  )
}

export default Card;