import React, { useEffect, useState } from "react";
import HeaderBoomer from "../shared/header";
import "./css.css";
import "./reg.css";
import FooterBoomer from "../shared/footer";
import regFoto from "../images/regFoto.png";
import title from "../images/titleReg.png";
import Espacamento from "../shared/espacamento";
import InputMetade from "../shared/input";
import { db } from "../firebase";
import { addDoc, collection, getDocs, refEqual } from "firebase/firestore";
import InputPDF from "../shared/inputpdf";
import NavBar from "../shared/navbar";
import { async } from "q";
import { ColorRing } from "react-loader-spinner";

import storage from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import InputBase from "../shared/inputBase";
import Modal from "../components/modal";

const RegistroApolice = () => {
  const id = localStorage.getItem("token");
  const config = collection(db, "Corretores", id, "Produtores");
  const [getData, setData] = useState([]);
  const [produtor, setProdutor] = useState("");
  const [produtorNome, setProdutoNome] = useState("");

  const [loader, setLoader] = useState(false);
  const [mainComponent, setMainComponent] = useState("visible");

  const [apolicenumber, setapolicenumber] = useState("");
  const [file, setFileData] = useState(null);
  const [producaoId, setProducaoId] = useState(null);
  const [allProp, setAllProp] = useState([]);

  const [fileAux, setFileDataAux] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getAllProdutores = async () => {
    await getDocs(config).then((e) => {
      const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
      setData(res);
    });
  };

  const getAllProp = async () => {
    const getAllPropRef = collection(
      db,
      "Corretores",
      localStorage.getItem("token"),
      "ApolicePreencher"
    );
    await getDocs(getAllPropRef).then((res) => {
      res.docs.map((e) => {
        setAllProp((prev) => [...prev, e.data()]);
      });
    });
  };

  useEffect(() => {
    getAllProdutores();
    getAllProp();
  }, []);

  const sendData = (data) => {
    setapolicenumber(data.value);
  };

  const cadastrarApolice = async (url) => {
    if (produtor == "" || produtor == null || produtor == "undefined") {
      setLoader(false);
      setMainComponent("visible");
      toast.warn("  Selecione um Produtor!", {
        theme: "colored",
      });
    } else if(apolicenumber == ""){
      toast.warn("Adicione o número da Apólice", {
        theme: "colored",
      });
    } else{
      if (url == "" || url == null || url == "undefined") {
        setLoader(false);
        setMainComponent("visible");
        toast.warn("  Selecione um pdf!", {
          theme: "colored",
        });
      } else {
        const contas = collection(
          db,
          "Corretores",
          localStorage.getItem("token"),
          "ApolicePreencher"
        );

         const currentDate = moment(Date()).format("DD/MM/YYYY");

        const isValid = allProp.filter(
          (prop) => prop.numeroApolice == apolicenumber
        );

        if (isValid.length == 0) {
          await addDoc(contas, {
            producao: url,
            status: true,
            produtor: produtorNome,
            dataregistro: currentDate,
            numeroApolice: apolicenumber,
          })
            .then((res) => {
              setLoader(false);
              setMainComponent("visible");
              toast.success("  Apólice Cadastrada", {
                theme: "colored",
              });
            })
            .catch((error) => {
              console.log(error);
              setLoader(false);
              setMainComponent("visible");
              toast.error("  Ocorreu um erro, tente novamente!", {
                theme: "colored",
              });
            });
        }else{
          toast.warn("Essa Apólice ja foi cadastrada", {
            theme: "colored",
          });
        }
      }
    }

    setLoader(false);
    setMainComponent("visible");
  };

  const setFile = () => {
    setLoader(true);
    setMainComponent("hidden");
    if (file == null) {
      setLoader(false);
      setMainComponent("visible");
      toast.warn("Anexe um PDF!");
      return;
    }

    if (fileAux != null) {
      console.log("names", fileAux.name, file.name)

      if (fileAux.name == file.name) {
        setOpenModal(!openModal)
        setLoader(false);
        setMainComponent("visible");
        return
      }
    }

    const fileRef = ref(storage, `files/${file.name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileDataAux(file)
        cadastrarApolice(url);
        setLoader(false);
        setMainComponent("visible");
      });
    });
  };

  const separaData = (dataUntrated) => {
    console.log(dataUntrated);
    var splitText = dataUntrated.split(",");
    setProdutor(splitText[0]);
    setProdutoNome(splitText[1]);
  };

  const sendRepetFile = () => {
    console.log("entrei")
    setFileDataAux(null); 
    setOpenModal(false)
    toast.info("Envie Novamente o arquivo!")
  }
  
  return (
    <div className="main">
      <NavBar />

      <div className="registroContainer">
        <ToastContainer />

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
        <div className="containerR" style={{ visibility: mainComponent }}>
          <img src={regFoto} alt="" style={{ width: "35rem" }} />
          <Espacamento />
          <div className="formR">
            <img src={title} alt="" className="titleR" />
            <div className="relacao">
              <div className="column" style={{ width: "40%" }}>
                <span className="spanBase">{"Produtor"}</span>
                <select
                  style={{ width: "86%" }}
                  id="produtores"
                  className="inputBase"
                  placeholder={"Produtor"}
                  onChange={(e) => {
                    separaData(e.target.value);
                  }}
                >
                   <option value="">
                        Nenhum
                    </option>
                  {getData.map((option) => {
                    return (
                     
                      <option
                        key={option.idDoc}
                        value={option.idDoc + "," + option.doc.produtor}
                      >
                        {option.doc.produtor}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Espacamento />

              <div className="column" style={{ width: "70%" }}>
                {/* <i><AiOutlinePaperClip/></i> */}
                <input
                  id="produtores"
                  type="file"
                  className="custom-file-input-apolice"
                  onChange={(e) => setFileData(e.target.files[0])}
                />
              </div>
            </div>

            <div className="rowReg">
              <InputBase
                style={{ width: "60%" }}
                spanProps={"Número da Apólice"}
                spanPlaceholder={"Número da Apólice"}
                idProps={"apolicenumber"}
                sendData={sendData}
                typeProps={"text"}
              />
              <button className="RButton" onClick={setFile}>
                Concluir Registro
              </button>
            </div>
          </div>
        </div>

        <FooterBoomer />
      </div>
      <Modal
        isOpen={openModal}
        setModalOpen={() => setOpenModal(!openModal)}
      >
        <div className="column" >

          <span className="spanText" >Tem certeza de quer subir um arquivo repitido ?</span>
          <div className="rowReg">
          <button className="buttonModal" onClick={() => {sendRepetFile()}}>Sim</button>

          <button className="buttonModal" onClick={() => {setOpenModal(false); toast.warn("Altere o arquivo!")}}>Não</button>
          </div>

        </div>
      </Modal>
    </div>
  );
};

export default RegistroApolice;
