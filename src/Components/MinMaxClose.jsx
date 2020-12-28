import { useState } from "react";
import "../CSS/MinMaxClose.css";

const { ipcRenderer } = window.require('electron');

function MinMaxClose() {

  let [ isMaxed, setIsMaxed ] = useState();

  ipcRenderer.on("maximize", (event, arg) => setIsMaxed(arg));
  
  function closeApp() { return ipcRenderer.send("close"); }
  function Maximize() { return ipcRenderer.send("maximize"); }
  function Minimize() { return ipcRenderer.send("minimize"); }
    
  return (
    <div className="app-div">
      <div className="app-logo">
        <img src="https:\/\/c0.klipartz.com/pngpicture/17/75/gratis-png-temporizador-iconos-de-computadora-reloj-cuenta-regresiva-minuto-reloj.png" alt="Logo" />
      </div>
      <div className="app-buttons" onClick={Minimize}>
        <span className="mini"></span>
      </div>
      <div className="app-buttons" onClick={Maximize}>
        <span className={isMaxed ? "minimize": "maxi"}></span>
      </div>
      <div className="app-buttons b-red" onClick={closeApp}>
        <span className="close"></span>
      </div>
    </div>
  );
}

export default MinMaxClose;