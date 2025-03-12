import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function NavBar() {
  var navigate = useNavigate();

  const navigateCadastrar = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  const navigateLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const navigateCSeguradoras = (e) => {
    e.preventDefault();
    navigate("/cadastro-seguradora");
  };

  const navigateComissoes = (e) => {
    e.preventDefault();
    navigate("/comissoes");
  };

  const navigateCComicoes = (e) => {
    e.preventDefault();
    navigate("/cadastro-dashboard");
  };

  const navigateDashBoard = (e) => {
    e.preventDefault();
    navigate("/dashBoard");
  };

  const navigateRegProd = (e) => {
    e.preventDefault();
    navigate("/registro-producao");
  };

  const navigateRegapolice = (e) => {
    e.preventDefault();
    navigate("/registro-apolice");
  }

  const [comissoes, setComissoes] = useState('none');
  const [dashBoard, setDashBoard] = useState('none');
  const [cadastrarComissao, setCadastrarComissao] = useState('none');


  const id = localStorage.getItem("token");
  const config = doc(db, "Corretores", id);
  const getUserType = async () => {
    await getDoc(config).then((e) => {
      const res = {
        idDoc: e.id,
        doc: e.data(),
      };
      console.log(res)
      // res.forEach((e) => {
      //   console.log(e)
        
          if(res.doc.isAdm == false){
            if (res.doc.tipo == "a") {
              setDashBoard("block");
            } else {
              setComissoes("block");
            }
          }else{
            setDashBoard("block")
            setComissoes("block")
            setCadastrarComissao("block")

          }
         
        
    //   });
    });
  };

  useEffect(() => {
    getUserType();
  }, []);

  return (
    <div className="navBarMainContainer">
      <div className="navBarMain">
        <button className="btnComissoes" onClick={(e) => navigateLogin(e)}>
          Sair
        </button>
        <button
          className="btnComissoes"
          onClick={(e) => navigateCSeguradoras(e)}
        >
          Cadastrar Seguradoras
        </button>

        <button style={{display: comissoes}} className="btnComissoes" onClick={(e) => navigateComissoes(e)}>
          Comissoes
        </button>

        <button style={{display: cadastrarComissao}} className="btnComissoes" onClick={(e) => navigateCComicoes(e)}>
           Back Office
        </button>

        <button style={{display: dashBoard}} className="btnComissoes" onClick={(e) => navigateDashBoard(e)}>
          Home
        </button>

        <button style={{display: dashBoard}} className="btnComissoes" onClick={(e) => navigateRegProd(e)}>
          Registrar Produção
        </button>

        <button style={{display: comissoes}} className="btnComissoes" onClick={(e) => navigateRegapolice(e)}>
          Registrar Ápolice
        </button>
      </div>
    </div>
  );
}

export default NavBar;
