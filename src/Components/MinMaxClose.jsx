import React from 'react';
import "../CSS/MinMaxClose.css";

class Nav extends React.Component {
  render() {
    return (
      <div className="app-div">
        <div className="app-buttons">
          <span className="mini"></span>
        </div>
        <div className="app-buttons">
          <span className="maxi"></span>
        </div>
        <div className="app-buttons b-red">
          <span className="close"></span>
        </div>
      </div>
    );
  }
}
export default Nav;