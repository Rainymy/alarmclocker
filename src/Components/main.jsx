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
  
  function editCard(id) {
    
    const newTodos = { ...values }
    delete newTodos[id];
    setValues(newTodos);
    
    return;
  }
  
  return (
    <main>
      <Input toParent={toParent}/>
      <section className="card-section" onWheel={scrollHandler}>
        {
          Object.values(values).map(v => {
            return (
              <Card key={v.id} data={v} changeData={editCard}/>
            )
          })
        }
      </section>
    </main>
  );
}
export default Main;