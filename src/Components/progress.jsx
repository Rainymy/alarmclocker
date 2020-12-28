import { Fragment, useState, useEffect, useRef } from "react";

import "../CSS/Progress.css";

function Progress(props) {
  
  const [ degree, setDegree ] = useState(90);
  
  const yep = useRef({ mounted: false });
  
  function getStyling(a, b) {
    return { transform: `rotate(-${a}deg) skew(${b}deg)` };
  }
  
  let testSeg = Array.from(Array(4)).map((v, i, k) => {
    return (
      <div className="segment" 
        style={getStyling(i * (360 / k.length), degree)} key={i}>
      </div>
    );
  });
  
  const [ index, setIndex ] = useState(testSeg.length - 1);
  const [ acc, setAcc ] = useState([]);
  
  function progress() {
    if (!testSeg[index]) {
      setIndex(testSeg.length - 1);
      setAcc([]);
    }
    if (degree <= 0) {
      setIndex(index - 1);
      setAcc(v => [...acc, testSeg[index]]);
      setDegree(360 / testSeg.length);
    }
    return [testSeg[index], ...acc];
  }
  
  useEffect(() => {
    if (yep.current.mounted) {
      if (props.percentage <= 0) {
        setDegree(v => 90);
      }
      else {
        setDegree(v => Math.round(((props.percentage * 360) % 90) - 3.6));
      }
    }
    yep.current.mounted = true;
  }, [props.percentage]);
  
  return (
    <Fragment>
      <div className="circle-wrapper">
        <div className="segment-wrapper">
          {
            progress()
          }
        </div>
        <div className="circle-inner"></div>
      </div>
      {/* <button onMouseDown={() => setDegree(degree - 3)}>Degree up</button>
      <button onMouseDown={() => setDegree(degree + 3)}>Degree down</button>
      <div>Degrees: { degree }</div>
      <div>Percentage: { props.percentage }</div> */}
    </Fragment>
  );
}

export default Progress;