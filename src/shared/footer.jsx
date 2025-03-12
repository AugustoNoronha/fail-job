import React from "react";
import "./footer.css";
import logo from "../images/logo.png";
import whatsapp from "../images/whatsapp.png";

const FooterBoomer = () => {
  return (
    <div className="footer">
      <img className="logo2" src={logo} alt="" />
      <div className="rowfooter">
         <span className="footerSpan">Precisa de ajuda ?</span>
          <a href="https://wa.me/553193118748" target="_blank">
          <img
            className="whatsapp"
            src={whatsapp}
            alt=""
            style={{ height: "4rem" }}
          />
        </a>
      </div>
    </div>
  );
};

export default FooterBoomer;
