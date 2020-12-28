import { useState, useEffect, useRef } from 'react';
import Progress from "./progress";
import TimeDisplayer from "./timeDisplayer";

import "../CSS/Card.css";
import doneSound from "../sound/done.wav";

function Card( props ) {
  
  // console.log(props.changeData);
  const initialTime = props.data.time * 60;
  
  const [ timeLeft, setTimeLeft ] = useState(initialTime);
  const [ timeText, setTimeText ] = useState({});
  const [ percentage, setPercentage ] = useState(1);
  
  const container = useRef({
    time: timeLeft,
    initial: timeLeft,
    id: props.data.id
  });
  
  useEffect(() => {
    
    let start = Date.now(), currentRef = container.current;
    
    function startCountDown() {
      
      // console.log(currentRef);
      currentRef.time -= (Date.now() - start) / 1000;
      
      setPercentage(v => 1 * (currentRef.time / currentRef.initial).toFixed(2));
      setTimeLeft(currentRef.time);
      setTimeText(formatTime(currentRef.time));
      
      if (currentRef.time <= 0) {
        console.log("Stopped Count Down");
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
    
    currentRef.intervalId = setInterval(startCountDown, 1000);
    
    return () => clearInterval(currentRef.intervalId);
  }, []);
  
  function buttonHandler() {
    props.changeData(container.current.id);
  }
  
  function onPlayHanler(event) {
    return event.target.volume = 0.10;
  }
  
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
      <div className="card-body">
        <Progress percentage={percentage} />
        <div className="card-timer">
          {
            renderTime()
          }
        </div>
        <button onClick={buttonHandler}>Remove</button>
      </div>
    </div>
  )
}

export default Card;