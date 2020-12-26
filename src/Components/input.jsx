import { useState } from 'react';
import "../CSS/Input.css";

function Nav(props) {
  const [ title, setTitle ] = useState(undefined);
  const [ time, setTime ] = useState(1);
  
  function getValueFromInput(event) {
    return props.toParent({ title, time, startTime: new Date().valueOf() });
  }
  
  function inputOnTitle(event) {
    let currentInput = event.target.value.trim();
    if (!!currentInput) { setTitle(currentInput); }
    else { setTitle(undefined); }
  }
  
  function inputOnTime(event) {
    let minutes = parseInt(event.target.value);
    if (!isNaN(minutes)) { setTime(minutes); }
  }
  
  function displayPreview() {
    return `Time: [${time}] | Title: [${title}]`;
  }
  
  return (
    <section className="input-section">
      <input type="text" placeholder="Title" onChange={inputOnTitle}/>
      <input type="number" placeholder="Minute" onChange={inputOnTime} min="1"/>
      <input className="preview" value={displayPreview()} disabled title="Preview"/>
      <button type="submit" className="preview" onClick={getValueFromInput}>Add</button>
    </section>
  );
}
export default Nav;