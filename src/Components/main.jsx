import { useState } from 'react';
import "../CSS/Main.css";

import Input from "./input";
import Card from "./card";

function Main() {
  const [ values, setValues ] = useState({});  
  const [ nthList, setnthList ] = useState(1);
  
  function toParent(input) {
    if (input.title === undefined) {
      input.title = `#${nthList}`;
      setnthList(nthList + 1);
    }
    setValues(v => {
      const newList = Object.assign({}, v);
      newList[input.id] = input;
      return newList;
    });
  }
  
  function scrollHandler(event) {
    event.target.scrollLeft += event.deltaY / 4;
  }
  
  const callbackParent = {
    remove: (id) => {
      const newTodos = { ...values }
      delete newTodos[id];
      setValues(newTodos);
      
      return;
    },
    getDataById: (id) => {
      return new Promise(function(resolve, reject) {
        if (values[id]) { resolve(values[id]); }
        return reject([]);
      });
    },
    changeDataWithId: (id, data) => {
      setValues({ ...values, [id]: data });
    }
  }
  
  function removeAll() {
    setValues({});
  }
  
  function finishAll() {
    let copy = {...values};
    for (let id in copy) {
      copy[id].isFinished = true;
    }
    setValues(copy);
  }
  
  return (
    <main>
      <Input toParent={toParent}/>
      <section className="card-section" onWheel={scrollHandler}>
        {
          Object.values(values).map(v => {
            return (
              <Card key={v.id} data={v} callbackParent={callbackParent}/>
            )
          })
        }
      </section>
      <section>
        <button onClick={removeAll} >Remove All</button>
        <button onClick={finishAll}>Finish all</button>
      </section>
    </main>
  );
}
export default Main;