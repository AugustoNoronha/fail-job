import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import foto1Login from "../images/foto1Login.png";
import titileLogin from "../images/titileLogin.png";
import "./css.css";
import "./login.css";
import HeaderBoomer from "../shared/header";
import FooterBoomer from "../shared/footer";

import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  var navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [mainComponent, setMainComponent] = useState("visible");

  const login = () => {
    setLoader(true);
    setMainComponent("hidden");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        localStorage.setItem("token", userCredential.user.uid);
        const userRef = doc(db, "Corretores", userCredential.user.uid);
        await getDoc(userRef).then((res) => {
          const user = res.data();
          if (user.tipo == "a") {
            navigate("/dashBoard");
          } else {
            navigate("/comissoes");
          }
        });

        setLoader(false);
        setMainComponent("visible");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setMainComponent("visible");
        alert("Ocorreu um erro, verifiquei o usuario e tente novamente! ");
      });
  };

  return (
    <div className="mainLogin">
      <HeaderBoomer />

      <ColorRing
        id="loader"
        visible={loader}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#21B9FF", "#21B9FF", "#21B9FF", "#21B9FF", "#21B9FF"]}
      />
      <div
        className="midleContainerLogin"
        style={{ visibility: mainComponent }}
      >
        <div className="formBox">
          <img className="fotoLogin" src={foto1Login} alt="" />
          <div className="midleLogin">
            <div className="actionBox">
              <img src={titileLogin} alt="" />
              <span className="spanSizeLogin">
                Saia do passado, faça login no NOVO!
              </span>

              <span className="spanLabelLogin">Email</span>
              <input
                placeholder="Introduza seu Email"
                type="text"
                className="inputLogin"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="spanLabelLogin">Senha</span>
              <input
                placeholder="Introduza sua senha"
                type="password"
                className="inputLogin"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="actionsNavigate">
                <samp className="info">
                  Não tem conta?{" "}
                  <a style={{ color: "black", fontFamily: "semibold" }} href="">
                    Registre
                  </a>
                </samp>
                <button className="loginButton" onClick={login}>
                  Login
                </button>
              
              </div>
              <button className="fgpBtn" onClick={() => {
                  navigate('/esqueci-senha')
                }}>
                  Esqueci minha senha
                </button>
            </div>
          </div>
        </div>
      </div>

      <FooterBoomer />
    </div>
  );
}

export default Login;
