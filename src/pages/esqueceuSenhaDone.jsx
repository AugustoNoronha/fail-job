import React from "react"
import './css.css'
import './password.css'
import logo from '../images/logo.png'
import whatsapp from '../images/whatsapp.png'
import fotoPassword from '../images/FGPD.png'
import titleFGP from '../images/titleFGPD.png'
import HeaderBoomer from "../shared/header"

function ForgotPasswordDone() {


    return (
        <div className="MainPassword">
           <HeaderBoomer/>
            <div className="forgotPasswordConatiner">
            <img className="fotoFGPD" src={fotoPassword} alt="" />

                <div className="espacamento" style={{ width: "60px" }}></div>

                <div className="FGPForm">
                    <img style={{ width: "30rem" }} src={titleFGP} alt="" />

                 
                </div>


            </div>


            <div className="footerPass">

                <img className="logo2" src={logo} alt="" />
                <img className="whatsapp" src={whatsapp} alt="" />

            </div>
        </div>
    );
}
export default ForgotPasswordDone