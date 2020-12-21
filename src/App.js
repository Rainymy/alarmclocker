import Nav from "./Components/nav";
import Main from "./Components/main";
import MinMaxClose from "./Components/MinMaxClose";

import './App.css';

function App() {
  return (
    <div className="App">
      <MinMaxClose/>
      <Nav/>
      <Main/>
    </div>
  );
}

export default App;
