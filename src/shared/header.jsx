import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
import logo from '../images/logo.png'

function HeaderBoomer(){

    var navigate = useNavigate()

    const navigateCadastrar = (e) => {
        e.preventDefault()
        navigate("/cadastro");
    }

    const navigateLogin = (e) => {
        e.preventDefault()
        navigate("/login");
    }

    return(
    <div className="headerContainer">
                <div className="header">
                    <img className="logo" src={logo} alt="logo" />
                    <div className="btnsContainer">
                        <button className="btn" onClick={(e) => navigateLogin(e)}>Login</button>
                        <button className="btn" onClick={(e) => navigateCadastrar(e)}>Cadastrar</button>
                    </div>


                </div>

            </div>
    )
}

export default HeaderBoomer