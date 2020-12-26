import { useState } from 'react';
import "../CSS/Main.css";

import Input from "./input";
import Card from "./card";

function Main() {
  const [ values, setValues ] = useState([]);
  const [ nthList, setnthList ] = useState(1);
  
  function toParent(input) {
    if (input.title === undefined) {
      input.title = `#${nthList}`;
      setnthList(nthList + 1);
    }
    setValues(v => [...v, input]);
  }
  
  return (
    <main>
      <Input toParent={toParent}/>
      <section className="card-section">
        {
          values.map((v, i) => {
            return (
              <Card key={i} data={v} />
            )
          })
        }
        {/* {
          Array.from(Array(2), (_, i) => i+1).map((v, i) => {
            return (
              <Card key={i} data={{startTime: 0}} />
            )
          })
        } */}
      </section>
    </main>
  );
}
export default Main;