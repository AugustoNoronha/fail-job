import React, { useState } from "react"
import './css.css'
import './password.css'
import logo from '../images/logo.png'
import whatsapp from '../images/whatsapp.png'
import fotoPassword from '../images/forgotPassword.png'
import titleFGP from '../images/titleFGP.png'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

function ForgotPassword() {

    const [email, setEmail] = useState('')
  const auth = getAuth();
  const navigate = useNavigate()

    const sendRequestNewPassWord = async () =>{
        if(email == ""){
            toast.warn("Preencha o campo de Email!")
            return
        }
        await sendPasswordResetEmail(auth, email).then(() => {
        navigate("/esqueci-senha-done")

        }).catch((e) =>{
            toast.warn("Algo deu Errado, Verifique seu Email!")

        });
    }


    return (
        <div className="MainPassword">
            <ToastContainer/>
            <div className="headerContainer">
                <div className="header">
                    <img className="logo" src={logo} alt="logo" />
                    <div className="btnsContainer">
                        <button className="btn">Login</button>
                        <button className="btn">Cadastrar</button>
                    </div>


                </div>



            </div>
            <div className="forgotPasswordConatiner">
            <img className="fotoFGP" src={fotoPassword} alt="" />

                <div className="espacamento" style={{ width: "60px" }}></div>

                <div className="FGPForm">
                    <img style={{ width: "30rem" }} src={titleFGP} alt="" />

                    <span className="spanFGP">Nós lhe enviaremos um e-mail para <br/> redefinir sua senha</span>

                    <span className="spanLabelLogin">Seu email</span>
                    <input
                    onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="Insira seu email"
                        type="text"
                        className="inputLogin"
                    />

                    <div className="FGPBottom">
                    <span className="lowtext">De repente me lembrei. <a style={{color:"black", fontFamily:"semibold"}} href="/login">Login.</a></span>
                        <button className="inserirFGP" onClick={() => {sendRequestNewPassWord()}}>Redefinir senha</button>
                    </div>
                </div>


            </div>


            <div className="footerPass">

                <img className="logo2" src={logo} alt="" />
                <img className="whatsapp" src={whatsapp} alt="" />

            </div>
        </div>
    );
}
export default ForgotPassword