import React from "react";
import "./input.css";
const InputBase = (props) => {
  const sendData = (value) => {
    props.sendData(value);
  };

  return (
    <div className="inputContainerBase">
      <span className="spanBase">{props.spanProps}</span>
      <input
        id="produtores"
        type={props.typeProps}
        className="inputBase"
        placeholder={props.spanPlaceholder}
        onChange={(e) => 
          sendData({id: props.idProps, value: e.target.value})
        }
      />
    </div>
  );
};
export default InputBase;
