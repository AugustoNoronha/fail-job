import React, { useEffect, useState } from "react";
import "./css.css";
import "./ccomicoes.css";
import HeaderBoomer from "../shared/header";
import FooterBoomer from "../shared/footer";
import cadastroTitle from "../images/cadastrocomicoes.png";
import NavBar from "../shared/navbar";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";

const CadastroDashBoard = () => {
  const config = collection(db, "Corretores");

  const [corretoraId, setCorretoraId] = useState("");
  const [data, setData] = useState([]);
  const [nomeCorretora, setNomeCorretora] = "";

  const navigate = useNavigate();

  const getAllCorretoras = async () => {
    await getDocs(config).then((e) => {
      const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
      console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    getAllCorretoras();
  }, []);

  const navegaTipoAouB = async () => {
    if (corretoraId == "") {
      alert("Essa Corretora ainda não gerou nada")
    } else {


      const docRef = doc(db, "Corretores", corretoraId);
      await getDoc(docRef).then((res) => {
        console.log(res.data());
        const tipo = res.data();

        switch (tipo.tipo) {
          case "a":
            navigate(`/listProdutores/${corretoraId}`);
            break;
          case "b":
            navigate(`/adiciona-comissao/${corretoraId}`);
        }
      });
    }

  };


  const setDataFromSelectCorretora = (e) => {
    const splitText = e.split(" ");
    console.log("split", splitText);
    setCorretoraId(splitText[0]);
    // setNomeCorretora(splitText[1]);
    //setProducoes([]);
    localStorage.setItem("idCorretora", splitText[0]);
  };

  return (
    <div className="main">
      <NavBar />
      <div className="cadastroComicoesMain">
        <div className="cadastroComicoesConatiner">
          <img src={cadastroTitle} className="alterar" alt="" />
          <div className="formCadastroComicoes">
            <div className="column" style={{ width: "40%" }}>
              <span className="spanBase">{"Corretora"}</span>
              <select
                id="corretora"
                className="inputBase"
                placeholder={"Corretora"}
                onChange={(e) => {
                  setDataFromSelectCorretora(e.target.value);
                }}
              >
                <option value="">
                  Nenhum
                </option>
                {data.map((option) => {
                  return (
                    <option
                      key={option.idDoc}
                      value={option.idDoc + " " + option.doc.nameEmpresa}
                    >
                      {option.doc.nameEmpresa}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="btnCComicoes" onClick={navegaTipoAouB}>
              Buscar Corretora
            </button>
          </div>
        </div>
      </div>

      <FooterBoomer />
    </div>
  );
};

export default CadastroDashBoard;
