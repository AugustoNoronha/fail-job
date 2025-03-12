import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import title from "../images/titleCdastroImage.png";
import fotoCadastro from "../images/fotoCadastro.png";
import logo from "../images/logo.png";
import whatsapp from "../images/whatsapp.png";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import "./cadastro.css";
import "./css.css";
import HeaderBoomer from "../shared/header";
import { celularMask, cepMask, cnpjMask } from "../Utils/Mask";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isDif, setIsDif] = useState(false);
  const [changeColor, setChangeColor] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [changeColorEmail, setChangeColorEmail] = useState();


  const [newName, setNewName] = useState("");
  const [newCnpj, setNewCnpj] = useState("");
  const [newTelefone, setNewTelefone] = useState("");
  const [newSusep, setNewSusep] = useState("");
  const [newEndereco, setNewEndereco] = useState("");
  const [newCep, setNewCep] = useState("");

  const [newProdutor, setNewProdutor] = useState([]);
  const [userType, setUserType] = useState("a");

  const [loader, setLoader] = useState(false);
  const [mainComponent, setMainComponent] = useState("visible");
  const [loaderContainer, setLoaderContainer] = useState("none");

  const navigate = useNavigate()

  const createCorretor = () => {
    setLoader(true);
    setMainComponent("hidden");
    setLoaderContainer('flex')
    if (!isDif) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const corretorCollectionRef = doc(
            db,
            "Corretores",
            userCredential.user.uid
          );

          await setDoc(corretorCollectionRef, {
            nameEmpresa: newName,
            cnpj: newCnpj,
            email: email,
            telefone: newTelefone,
            password: password,
            susep: newSusep,
            endereco: newEndereco,
            cep: newCep,
            tipo: userType,
            isAdm: false
          });
          const user = userCredential.user;

          const produtores = collection(
            db,
            "Corretores",
            userCredential.user.uid,
            "Produtores"
          );

          var i = 0;
          newProdutor.forEach(async (e) => {
            await addDoc(produtores, { produtor: e, id: i++ });
          });
          setLoaderContainer('none')
          setLoader(false);
          setMainComponent("visible");
          console.log(userType);
          navigate('/login')
        })
        .catch((error) => {
          setLoaderContainer("none")
          setLoader(false);
          setMainComponent("visible");
          alert(error);
        });
    } else {
      alert("Confira os campos de senha ou email");
    }
  };

  const confirmPassword = (e) => {
    if (e != password) {
      setIsDif(true);
      setChangeColor("Red");
    } else {
      setIsDif(false);
      setChangeColor("#999999");
    }
  };

  const confirmEmail = (e) => {
    if (e != email) {
      setIsDif(true);
      setChangeColorEmail("Red");
    } else {
      setIsDif(false);
      setChangeColorEmail("#999999");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const setTelefoneState = (e) => {
    setNewTelefone(e);
    console.log(e);
  };

  return (
    <div className="mainCadastro">
      <HeaderBoomer />
      <div className="loaderContainer" style={{ display: loaderContainer }}>
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
      </div>

      <div className="cadastrobox" style={{ visibility: mainComponent }}>
        <img src={fotoCadastro} alt="" className="fotoCadastro" />

        <div className="space"></div>
        <div className="columnCadastro">
          <img className="fotoTitle" src={title} alt="" />

          <span className="spanLabelC">Nome da corretora</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira sua corretora"
            onChange={(e) => setNewName(e.target.value)}
          />

          <span className="spanLabelC">CNPJ/CPF</span>
          <input
            className="inputCadastro"
            type="text"
            maxLength={18}
            placeholder="Insira seu CNPJ"
            value={cnpjMask(newCnpj)}
            onChange={(e) => setNewCnpj(e.target.value)}
          />

          <span className="spanLabelC">Email</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu email"
            style={{ color: changeColorEmail }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="spanLabelC">Confirme seu Email</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Confirme seu email"
            style={{ color: changeColorEmail }}
            onChange={(e) => confirmEmail(e.target.value)}
          />

          <span className="spanLabelC">Telefone de Contato</span>
          <input
            className="inputCadastro"
            type="text"
            maxLength={15}
            value={celularMask(newTelefone)}
            placeholder="Insira seu telefone"
            onChange={(e) => setTelefoneState(e.target.value)}
          />

          <span className="spanLabelC">Senha</span>
          <div className="passWordContainer">
            <input
              className="inputCadastro"
              type={passwordShown ? "password" : "text"}
              placeholder="Insira sua senha"
              style={{ color: changeColor }}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>
          <span className="spanLabelC">Confirme sua Senha</span>

          <div className="passWordContainer">
            <input
              className="inputCadastro"
              type={passwordShown ? "password" : "text"}
              placeholder="Confirme sua senha"
              style={{ color: changeColor }}
              onChange={(e) => confirmPassword(e.target.value)}
            />

          </div>

          <span className="spanLabelC">Número do Susep</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu susep"
            onChange={(e) => setNewSusep(e.target.value)}
          />

          <span className="spanLabelC">Endereço</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu endereço"
            onChange={(e) => setNewEndereco(e.target.value)}
          />

          <span className="spanLabelC">CEP</span>
          <input
            className="inputCadastro"
            type="text"
            maxLength={10}
            value={cepMask(newCep)}
            placeholder="Insira seu CEP"
            onChange={(e) => setNewCep(e.target.value)}
          />

          <span className="spanLabelC">Tipo de usuário</span>
          <select name="" id="" className="selectType" onChange={(e) => { setUserType(e.target.value) }}>
            <option value="a" className="selectType">Tipo A</option>
            <option value="b" className="selectType">Tipo B</option>

          </select>



          <span className="spanCadastro">
            Abaixo, coloque por favor todos os produtores que você possui em sua
            corretora, assim poderemos fazer um controle de comissão por
            produtor.
          </span>

          <span className="spanLabelC">Produtor 1</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu Produtor"
            onBlur={(e) =>
              setNewProdutor((newProdutor) => [...newProdutor, e.target.value])
            }
          />

          <span className="spanLabelC">Produtor 2</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu Produtor"
            onBlur={(e) =>
              setNewProdutor((newProdutor) => [...newProdutor, e.target.value])
            }
          />

          <span className="spanLabelC">Produtor 3</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu Produtor"
            onBlur={(e) =>
              setNewProdutor((newProdutor) => [...newProdutor, e.target.value])
            }
          />

          <span className="spanLabelC">Produtor 4</span>
          <input
            className="inputCadastro"
            type="text"
            placeholder="Insira seu Produtor"
            onBlur={(e) =>
              setNewProdutor((newProdutor) => [...newProdutor, e.target.value])
            }
          />

          <div className="bottomLine">
            <span className="lowtext">
              Já tem conta?{" "}
              <a style={{ color: "black", fontFamily: "semibold" }} href="">
                Login
              </a>
            </span>
            <button className="inserirC" onClick={createCorretor}>
              Registrar
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <img className="logo2" src={logo} alt="" />
        <img className="whatsapp" src={whatsapp} alt="" />
      </div>
    </div>
  );
}

export default Cadastro;
