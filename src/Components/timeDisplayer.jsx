export default function TimeDisplayer(props) {
  
  let propsObj = Object.values(props.data);
  
  return (
    <div className="timer-wrapper">
      {
        Object.keys(props.data).map((v, i) => {
          if (propsObj.length - 1 === i) return "";
          
          return (
            <div className={v} key={i}>
              {
                propsObj[i] ? Object.values(props.data)[i] : ""
              }
            </div>
          );
        })
      }
    </div>
  )
}