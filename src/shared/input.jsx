import React, { Component, useState } from "react";
import "./input.css";

const InputMetade = (props) => {

const [body, setBody] = useState({})

  const enviar =(e) => {

    props.sendData({value:e})
  }

    return (
        
      <div className="inputContainer">
        <span className="spanBase">{props.spanProps}</span>
        <select
          id="produtores"
          className="inputBase"
          placeholder={props.placeholderProps}
          onChange={(a) => enviar(a.target.value)}
          value={"a"}
          >
          {props.valuepProps.map((option) => {
            return (
              <option key={option.idDoc} value={option}  >
                {option.doc.produtor}
              </option>
            );
          })}
        </select>
      </div>
    );
}

export default InputMetade