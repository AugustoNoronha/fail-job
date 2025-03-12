import React from "react";
import HeaderBoomer from "../shared/header";
import titleComicoes from "../images/cadastroSeguradora.png";

import azulSeguros from "../images/azulSeguros.png";
import alianz from "../images/aliazn.png";
import bradesco from "../images/bradesco.png";
import hdi from "../images/hdi.png";
import libert from "../images/libert.png";

import mapfre from "../images/mapfre.png";
import portoSeguro from "../images/portoSeguro.png";
import tokioMarine from "../images/tokio.png";
import zurich from "../images/zurich.png";
import alfa from "../images/alfa.png";

import FooterBoomer from "../shared/footer";

import "./css.css";
import "./cseguradoras.css";
import InputBase from "../shared/inputBase";
import Espacamento from "../shared/espacamento";
import NavBar from "../shared/navbar";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const CadastroSeguradoras = () => {
  const [azulUser, setAzulUser] = useState("");
  const [azulPass, setAzulPass] = useState("");

  const [mapfreUser, setmapfreUser] = useState("");
  const [mapfrePass, setmapfrePass] = useState("");
  const [mapfreCI, setmapfreCI] = useState("");

  const [allianzUser, setallianzUser] = useState("");
  const [allianzPass, setallianzPass] = useState("");

  const [portoseguroUser, setportoseguroUser] = useState("");
  const [portoseguroPass, setportoseguroPass] = useState("");
  const [portoseguroCSusep, setportoseguroCSusep] = useState("");

  const [bradescoUser, setbradescoUser] = useState("");
  const [bradescoPass, setbradescoPass] = useState("");

  const [tokioUser, settokioUser] = useState("");
  const [tokioPass, settokioPass] = useState("");

  const [hdiUser, sethdiUser] = useState("");
  const [hdiPass, sethdiPass] = useState("");

  const [zurichUser, setzurichUser] = useState("");
  const [zurichPass, setzurichPass] = useState("");

  const [libertUser, setlibertUser] = useState("");
  const [libertPass, setlibertPass] = useState("");

  const [alfaUser, setalfaUser] = useState("");
  const [alfaPass, setalfaPass] = useState("");

  const [body, setBody] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaderContainer, setLoaderContaier] = useState("none");

  const sendData = (data) => {
    switch (data.id) {
      case "azulUser":
        setAzulUser(data.value);
        break;
      case "azulPass":
        setAzulPass(data.value);
        break;

      case "mapfreUser":
        setmapfreUser(data.value);
        break;
      case "mapfrePass":
        setmapfrePass(data.value);
        break;
      case "mapfreCI":
        setmapfreCI(data.value);
        break;

      case "allianzUser":
        setallianzUser(data.value);
        break;
      case "allianzPass":
        setallianzPass(data.value);
        break;

      case "portoseguroUser":
        setportoseguroUser(data.value);
        break;
      case "portoseguroPass":
        setportoseguroPass(data.value);
        break;
      case "portosegurCi":
        setportoseguroCSusep(data.value);
        break;

      case "bradescoUser":
        setbradescoUser(data.value);
        break;
      case "bradescoPass":
        setbradescoPass(data.value);
        break;

      case "tokioUser":
        settokioUser(data.value);
        break;
      case "tokioPass":
        settokioPass(data.value);
        break;

      case "hdiUser":
        sethdiUser(data.value);
        break;
      case "hdiPass":
        sethdiPass(data.value);
        break;

      case "zurichUser":
        setzurichUser(data.value);
        break;
      case "zurichPass":
        setzurichPass(data.value);
        break;

      case "libertUser":
        setlibertUser(data.value);
        break;
      case "libertPass":
        setlibertPass(data.value);
        break;

      case "alfaUser":
        setalfaUser(data.value);
        break;
      case "alfaPass":
        setalfaPass(data.value);
        break;
    }
  };

  const cadastrar = async () => {
    setLoader(true);
    setLoaderContaier("flex");

    if (mapfreUser || mapfrePass || mapfreCI) {
      if (mapfrePass == "" || mapfrePass == "" || mapfreCI == "") {
        setLoader(false);
        setLoaderContaier("none");
        toast.warn("Todos Os dados da Mapfre devem ser preenchidos")
       
        return
      }
    }

    if (portoseguroUser || portoseguroPass || portoseguroCSusep) {
      if (portoseguroUser == "" || portoseguroPass == ""|| portoseguroCSusep == "") {
        setLoader(false);
        setLoaderContaier("none");
        toast.warn("Todos Os dados da Porto Seguro devem ser preenchidos")
      
        return
      }
    }
    const data = {
      azul: {
        user: azulUser,
        pass: azulPass,
      },
      mapfre: {
        user: mapfreUser,
        pass: mapfrePass,
        ci: mapfreCI,
      },
      allianz: {
        user: allianzUser,
        pass: allianzPass,
      },
      portoseguro: {
        user: portoseguroUser,
        pass: portoseguroPass,
        cSusep: portoseguroCSusep,
      },
      bradesco: {
        user: bradescoUser,
        pass: bradescoPass,
      },
      tokio: {
        user: tokioUser,
        pass: tokioPass,
      },
      hdi: {
        user: hdiUser,
        pass: hdiPass,
      },
      zurich: {
        user: zurichUser,
        pass: zurichPass,
      },
      libert: {
        user: libertUser,
        pass: libertPass,
      },
      alfa: {
        user: alfaUser,
        pass: alfaPass,
      },
    };
    const contas = collection(
      db,
      "Corretores",
      localStorage.getItem("token"),
      "Contas"
    );
    await addDoc(contas, { body: data })
      .then(() => {
        setLoader(false);
        setLoaderContaier("none");
        toast.success("Contas cadastradas !");
      })
      .catch(() => {
        setLoader(false);
        setLoaderContaier("none");
        toast.warn("Algo de errado aconteceu !");
      });
  };
  return (
    <div className="main">
      <div className="loaderContaoner" style={{ display: loaderContainer }}>
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
      <ToastContainer />

      <NavBar />
      <div className="cadastroSeguradorasMain">
        <img src={titleComicoes} style={{ width: "60rem" }} alt="" />

        <div className="formSeguradoras">
          <div className="rowcSegu">
            <div className="columnSeguradas">
              <img src={azulSeguros} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"azulUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"azulPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
            <div className="columnSeguradas">
              <img src={mapfre} alt="" />
              <div className="rowCSeguradoras">
                <div className="columnCSeguradoras">
                  <InputBase
                    spanProps={"Usuário"}
                    spanPlaceholder={"Introduza seu ID"}
                    idProps={"mapfreUser"}
                    sendData={sendData}
                    typeProps={"text"}
                  />

                  <InputBase
                    spanProps={"Senha"}
                    spanPlaceholder={"Introduza sua Senha"}
                    idProps={"mapfrePass"}
                    sendData={sendData}
                    typeProps={"password"}
                  />
                </div>
                <InputBase
                  spanProps={"Código Interno"}
                  spanPlaceholder={"Código Interno"}
                  idProps={"mapfreCI"}
                  sendData={sendData}
                  typeProps={"text"}
                />
              </div>
            </div>
          </div>

          <div className="rowcSegu">
            <div className="columnSeguradas">
              <img src={alianz} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"allianzUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"allianzPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
            <div className="columnSeguradas">
              <img src={portoSeguro} alt="" />
              <div className="rowCSeguradoras">
                <div className="columnCSeguradoras">
                  <InputBase
                    spanProps={"Usuário"}
                    spanPlaceholder={"Introduza seu ID"}
                    idProps={"portoseguroUser"}
                    sendData={sendData}
                    typeProps={"text"}
                  />

                  <InputBase
                    spanProps={"Senha"}
                    spanPlaceholder={"Introduza sua Senha"}
                    idProps={"portoseguroPass"}
                    sendData={sendData}
                    typeProps={"password"}
                  />
                </div>
                <InputBase
                  spanProps={"Código Susep"}
                  spanPlaceholder={"Código Susep"}
                  idProps={"portosegurCi"}
                  sendData={sendData}
                  typeProps={"text"}
                />
              </div>
            </div>
          </div>

          <div className="rowcSegu">
            <div className="columnSeguradas">
              <img src={bradesco} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"bradescoUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"bradescoPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
            <div className="columnSeguradas">
              <img src={tokioMarine} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"tokioUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"tokioPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
          </div>

          <div className="rowcSegu">
            <div className="columnSeguradas">
              <img src={hdi} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"hdiUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"hdiPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
            <div className="columnSeguradas">
              <img src={zurich} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"zurichUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"zurichPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
          </div>

          <div className="rowcSegu">
            <div className="columnSeguradas">
              <img src={libert} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"libertUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"libertPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
            <div className="columnSeguradas">
              <img src={alfa} alt="" />
              <InputBase
                spanProps={"Usuário"}
                spanPlaceholder={"Introduza seu ID"}
                idProps={"alfaUser"}
                sendData={sendData}
                typeProps={"text"}
              />
              <Espacamento />
              <InputBase
                spanProps={"Senha"}
                spanPlaceholder={"Introduza sua Senha"}
                idProps={"alfaPass"}
                sendData={sendData}
                typeProps={"password"}
              />
            </div>
          </div>
          <button className="CadastrarSeguradorasBtn" onClick={cadastrar}>
            Cadastrar Seguradoras
          </button>
        </div>
      </div>
      <FooterBoomer />
    </div>
  );
};

export default CadastroSeguradoras;
