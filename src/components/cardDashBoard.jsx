import React from "react";
import "./cardDashBoard.css";

export default function CardDashBoard({tilteProp, children ,sizeProp, qtdFechadas, qtdAtraso, qtdVigentes, qtdVencer,totalComissao}) {
  return (
    <div className="cardMain">
      <span className="cardTexts"  style={{color:'white'}}>{tilteProp}</span>
      <span  className="cardValueTexts" style={{color:'#21B9FF', fontSize: sizeProp}}>{children}</span>
    </div>
  );
}
