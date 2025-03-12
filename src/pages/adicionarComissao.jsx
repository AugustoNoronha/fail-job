import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { ColorRing } from "react-loader-spinner";
import Modal from "../components/modal";
import InputBase from "../shared/inputBase";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const AdicionarComissao = () => {
  const params = useParams();
  const config = collection(db, "Corretores", params.id, "Produtores");
  const [data, setData] = useState([]);
  const [nomeProdutor, setNomeProdutor] = useState("");
  const [produtorId, setProdutorId] = useState("");
  const [apoliceavencerData, setApoliceAvencerData] = useState([]);
  const [apolicePreechidaData, setApolicePreenchidaData] = useState([]);

  const [dtPagamento, setDtPagamento] = useState("");

  const [mainComponent, setMainComponent] = useState("block");
  const [loader, setLoader] = useState(false);

  const [segurado, setsegurado] = useState("");
  const [dtInicial, setDataInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ramo, setramo] = useState("");
  const [linkPdf, setLInkPdf] = useState("");
  const [novoPdf, setNovoPdf] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalComissao, setOpenModalComissao] = useState(false);
  const [numeroProposta, setNumeroProposta] = useState(null);

  const [nApolice, setApoliceNumber] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [seguradora, setSeguradora] = useState("");
  const [parcela, setParcela] = useState("");
  const [percentualComissao, setPercentualComissao] = useState("");
  const [premioLiquido, setPremioLiquido] = useState("");
  const [comissaoValorMonetario, setComissaoValorMonetario] = useState("");
  const [observacao, setObservacao] = useState("");

  const [auxiliar, setAuxiliar] = useState({});

  const [openModalCApolice, setOpenModalCApolice] = useState("");
  const getAllProdutores = async () => {
    await getDocs(config).then((e) => {
      const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
      setData(res);
    });
  };

  const formatDataPagamento = (dataP) => {
    setDtPagamento(moment(dataP).format("DD/MM/YYYY"));
  };

  const cadastrarComissao = async () => {
    // setLoader(true)
    const body = {
      segurado: segurado,
      dtPagamento: dtPagamento,
      ramo: ramo,
      placa: placa,
      modelo: modelo,
      nomeProdutor: auxiliar.data.produtor,
      //idProdutor: auxiliar.data.idProdutor,
      linkPdf: auxiliar.data.producao,
      status: true,
      nApolice: auxiliar.data.numeroApolice,
      //numeroProposta: auxiliar.data.numeroProposta,
      seguradora: seguradora,
      parcela: parcela,
      percentualComissao: percentualComissao,
      premioLiquido: premioLiquido,
      comissaoValorMonetario: comissaoValorMonetario,
      observacao: observacao,
    };

    const criacomissaoRef = collection(
      db,
      "Corretores",
      params.id,
      "ComissaoGrupoB"
    );
    await addDoc(criacomissaoRef, body)
      .then(async (e) => {
        const updateAPoliceAPreecher = doc(
          db,
          "Corretores",
          params.id,
          "ApolicePreencher",
          auxiliar.idDoc
        );
        await updateDoc(updateAPoliceAPreecher, { status: false }).then(() => {
          console.log("entrei");
          setOpenModalCApolice(false)
          setLoader(false);
          toast.success("Ápolice preenchida", {
            theme: "colored",
          });
          carregarApolice()
        });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        toast.warn("Algo deu errado", {
          theme: "colored",
        });
      });

    console.log(auxiliar);
  };

  const setDataFromSelectProdutor = (e) => {
    const splitText = e.split(" ");
    setProdutorId(splitText[0]);
    console.log("slplitText", splitText);
    setNomeProdutor(splitText[1]);
    //setProducoes([]);
    localStorage.setItem("idCorretora", splitText[0]);
  };

  const carregarApolicePreenchida = async () => {
    console.log("entrou")
    const getApolicePreenchidaRef = collection(
      db,
      "Corretores",
      params.id,
      "ComissaoGrupoB"
    );
    await getDocs(getApolicePreenchidaRef).then((response) => {
      const res = response.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
      setApolicePreenchidaData(res);
    });
    setApoliceAvencerData([]);
  };

  const sendData = (data) => {
    switch (data.id) {
      case "segurado":
        setsegurado(data.value);
        break;
      case "dtInicial":
        setDataInicial(data.value);
        break;
      case "dtFinal":
        setDtFinal(data.value);
        break;
      case "ramo":
        setramo(data.value);
        break;

      case "placa":
        setPlaca(data.value);
        break;
      case "modelo":
        setModelo(data.value);
        break;

      case "produtor":
        setProdutorId(data.value);
        break;
      case "nProposta":
        setNumeroProposta(data.value);
        break;
      case "apoliceNumber":
        setApoliceNumber(data.value);
        break;
      case "motivo":
        setMotivo(data.value);
        break;

      case "seguradora":
        setSeguradora(data.value);
        break;

      case "parcela":
        setParcela(data.value);
        break;

      case "percentualComissao":
        setPercentualComissao(data.value);
        break;

      case "premioLiquido":
        setPremioLiquido(data.value);
        break;

      case "ComissaoValorMonetario":
        setComissaoValorMonetario(data.value);
        break;

      case "obs":
        setObservacao(data.value);
        break;
    }
  };

  useEffect(() => {
    getAllProdutores();
  }, []);

  const carregarApolice = async () => {
    setApolicePreenchidaData([])
    const apoliceConfig = collection(
      db,
      "Corretores",
      params.id,
      "ApolicePreencher"
    );

    await getDocs(apoliceConfig)
      .then((e) => {
        if (e.empty) {
          alert("Desculpe ");
        } else {
          const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));

          setApoliceAvencerData([])
          res.forEach((d) => {
            if (d.doc.status != false) {
              setApoliceAvencerData((prev) => [...prev, d]);
            }
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <h1>{params.id}</h1>
      <div>
        <div className="columnApolice" style={{ width: "80%" }}>
          <span className="spanBase">{"Produtor"}</span>
          <select
            id="produtor"
            className="inputBase"
            placeholder={"Produtor"}
            onChange={(e) => {
              setDataFromSelectProdutor(e.target.value);
            }}
          >
            {data.map((option) => {
              return (
                <option
                  key={option.idDoc}
                  value={option.idDoc + " " + option.doc.produtor}
                >
                  {option.doc.produtor}
                </option>
              );
            })}
          </select>
          <button className="btnActionsScreen" onClick={carregarApolice}>
            Carregar Ápolices a Preencher
          </button>

          <button
            className="btnActionsScreen"
            onClick={carregarApolicePreenchida}
          >
            Carregar Ápolices Preenchidas
          </button>
        </div>
      </div>

      {apoliceavencerData.map((e) => {
        return (
          <div
            key={e.id}
            className="cardOpenModal"
            style={{ backgroundColor: "#008a00b2", borderColor: "green" }}
          >
            <div className="columnApolice">
              <span className="cardSpanCloseProp">
                Nº {e.doc.numeroApolice} - {e.doc.produtor} -{" "}
                {e.doc.dataregistro}
              </span>

              <div className="rowApolice">
                <ColorRing
                  id="loader"
                  visible={loader}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#21B9FF",
                    "#21B9FF",
                    "#21B9FF",
                    "#21B9FF",
                    "#21B9FF",
                  ]}
                />

                <button
                  className="btnApolice"
                  style={{ display: mainComponent }}
                  onClick={() => {
                    setAuxiliar({ data: e.doc, idDoc: e.idDoc });
                    setNomeProdutor(e.doc.protudor);
                    setOpenModalCApolice(true);
                  }}
                >
                  Cadastrar Comissão
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {apolicePreechidaData.map((e) => {
        console.log("modelo",e.doc);
        return (
          <div
            key={e.id}
            className="cardOpenModal"
            style={{ backgroundColor: "#00408ab1", borderColor: "blue" }}
          >
            <div className="columnApolice">
              <span className="cardSpanCloseProp">
                Nº {e.doc.nApolice} - {e.doc.segurado} -
                {e.doc.dtPagamento}
              </span>

              
              
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={openModalCApolice}
        setModalOpen={() => setOpenModalCApolice(!openModalCApolice)}
        selectProdutor={nomeProdutor}
      >
        <div className="row">
          <InputBase
            style={{ width: "40%" }}
            spanProps={"Segurado"}
            spanPlaceholder={"Insira o nome do Segurado"}
            idProps={"segurado"}
            sendData={sendData}
            typeProps={"text"}
          />

          <InputBase
            style={{ width: "40%" }}
            spanProps={"Ramo"}
            spanPlaceholder={"Insira o Ramo"}
            idProps={"ramo"}
            sendData={sendData}
            typeProps={"text"}
          />
          <InputBase
            style={{ width: "40%" }}
            spanProps={"Modelo"}
            spanPlaceholder={"Insira o modelo"}
            idProps={"modelo"}
            sendData={sendData}
            typeProps={"text"}
          />
        </div>
        <div className="row">
          <InputBase
            style={{ width: "40%" }}
            spanProps={"Seguradora"}
            spanPlaceholder={"Insira o nome da Seguradora"}
            idProps={"seguradora"}
            sendData={sendData}
            typeProps={"text"}
          />

          <InputBase
            style={{ width: "40%" }}
            spanProps={"Parcela"}
            spanPlaceholder={"Insira a Parcela"}
            idProps={"parcela"}
            sendData={sendData}
            typeProps={"text"}
          />
          <InputBase
            style={{ width: "40%" }}
            spanProps={"%Comissão"}
            spanPlaceholder={"Insira o percentual de Comissão"}
            idProps={"percentualComissao"}
            sendData={sendData}
            typeProps={"text"}
          />
        </div>
        <div className="row">
          <InputBase
            style={{ width: "40%" }}
            spanProps={"Prêmio Líquido"}
            spanPlaceholder={"Insira o Prêmio Líquido"}
            idProps={"premioLiquido"}
            sendData={sendData}
            typeProps={"text"}
          />

          <InputBase
            style={{ width: "40%" }}
            spanProps={"Comissão"}
            spanPlaceholder={"Insira o Valor da Comissão"}
            idProps={"ComissaoValorMonetario"}
            sendData={sendData}
            typeProps={"text"}
          />

          <div className="column">
            <span>Data do Pagamento</span>
            <input
              type="date"
              onChange={(e) => formatDataPagamento(e.target.value)}
            />
          </div>

          <InputBase
            style={{ width: "40%" }}
            spanProps={"Observação"}
            spanPlaceholder={"Insira uma Observação"}
            idProps={"obs"}
            sendData={sendData}
            typeProps={"text"}
          />
        </div>

        <button onClick={cadastrarComissao}>Cadastrar</button>
      </Modal>
    </div>
  );
};

export default AdicionarComissao;
