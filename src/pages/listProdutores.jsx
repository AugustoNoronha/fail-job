import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storage, { db } from "../firebase";
import InputBase from "../shared/inputBase";
import { BsFiletypePdf } from "react-icons/bs";
import Modal from "../components/modal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./css.css";
import "./ccomicoes.css";
import "./listProdutores.css";
import { ColorRing } from "react-loader-spinner";
import { load } from "mime";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const ListProdutores = () => {
  const [data, setData] = useState([]);
  const [propostasAbertasData, setPropostasAbertasData] = useState([]);
  const [propostasFechadasData, setPropostasFechadasData] = useState([]);
  const [apoliceData, setapoliceData] = useState([]);
  const [propostaPendenteData, setPropostaPendenteData] = useState([]);
  const [produtorId, setProdutorId] = useState("");
  const [nameProdutor, setNameProdutor] = useState("");
  const [segurado, setsegurado] = useState("");
  const [dtInicial, setDataInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [dtPagamento, setDtPagamento] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ramo, setramo] = useState("");
  const [nomeProdutor, setNomeProdutor] = useState("");
  const [linkPdf, setLInkPdf] = useState("");
  const [novoPdf, setNovoPdf] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalComissao, setOpenModalComissao] = useState(false);
  const [numeroProposta, setNumeroProposta] = useState(null);
  const [loaderContainer, setLoaderConatiner] = useState("none");

  const [nApolice, setApoliceNumber] = useState(false);
  const [idDocAberta, setIdDocAberta] = useState("");
  const [mainComponent, setMainComponent] = useState("block");
  const [componenteLoadingFlex, setComponentLoadingFlex] = useState("flex");

  const [loader, setLoader] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [seguradora, setSeguradora] = useState("");
  const [parcela, setParcela] = useState("");
  const [percentualComissao, setPercentualComissao] = useState("");
  const [premioLiquido, setPremioLiquido] = useState("");
  const [comissaoValorMonetario, setComissaoValorMonetario] = useState("");
  const [observacao, setObservacao] = useState("");

  const params = useParams();
  const config = collection(db, "Corretores", params.id, "Produtores");

  const getAllProdutores = async () => {
    await getDocs(config).then((e) => {
      const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
      setData(res);
    });
  };

  useEffect(() => {
    getAllProdutores();
  }, []);

  const formatDataInicial = (dataI) => {
    setDataInicial(moment(dataI).format("DD/MM/YYYY"));
  };

  const formatDataFinal = (dataF) => {
    setDtFinal(moment(dataF).format("DD/MM/YYYY"));
  };

  const formatDataPagamento = (dataP) => {
    setDtPagamento(moment(dataP).format("DD/MM/YYYY"));
  };

  const carregarPropF = async () => {
    if (produtorId == "") {
      alert("Selecione um produtor");
    } else {
      const closePropsConfig = collection(
        db,
        "Corretores",
        params.id,
        "PropClose"
      );
      setPropostasFechadasData([]);

      await getDocs(closePropsConfig)
        .then((e) => {
          if (e.empty) {
            alert("Desculpe, esse Produtor ainda não fechou propostas");
          } else {
            const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
            res.forEach((d) => {
              if (d.doc.status != false) {
                setPropostasFechadasData((prev) => [...prev, d]);
              }
            });

            setPropostasAbertasData([]);
            setapoliceData([]);
            setPropostaPendenteData([]);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const carregarPropPendente = async () => {
    if (produtorId == "") {
      alert("Selecione um produtor");
    } else {
      const propostaPendenteConfig = collection(
        db,
        "Corretores",
        params.id,
        "PropostaPendente"
      );

      await getDocs(propostaPendenteConfig)
        .then((e) => {
          if (e.empty) {
            alert("Desculpe ");
          } else {
            const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
            setPropostaPendenteData([]);
            res.forEach((d) => {
              if (d.doc.status != false) {
                setPropostaPendenteData((prev) => [...prev, d]);
              }
            });
            setapoliceData([]);
            setPropostasAbertasData([]);
            setPropostasFechadasData([]);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const carregarApolice = async () => {
    if (produtorId == "") {
      alert("Selecione um produtor");
    } else {
      const apoliceConfig = collection(
        db,
        "Corretores",
        params.id,
        "ApoliceVigente"
      );

      await getDocs(apoliceConfig)
        .then((e) => {
          if (e.empty) {
            alert("Desculpe ");
          } else {
            const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
            setapoliceData(res);
            setPropostasAbertasData([]);
            setPropostasFechadasData([]);
            setPropostaPendenteData([]);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const carregarProd = async () => {
    const produtorConfig = collection(
      db,
      "Corretores",
      params.id,
      "PropAberta"
    );

    await getDocs(produtorConfig)
      .then((e) => {
        if (e.empty) {
          alert("Desculpe ");
        } else {
          const res = e.docs.map((p) => ({ idDoc: p.id, doc: p.data() }));
          setPropostasAbertasData([]);
          res.forEach((d) => {
            if (produtorId != "") {
              if (d.doc.produtor == nameProdutor && d.doc.status != false) {
                setPropostasAbertasData((prev) => [...prev, d]);
              }
            } else {
              if (d.doc.status != false) {
                setPropostasAbertasData((prev) => [...prev, d]);
              }
            }
          });
          setPropostasFechadasData([]);
          setapoliceData([]);
          setPropostaPendenteData([]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const setDataFromSelectProdutor = (e) => {
    const splitText = e.split(" ");
    setProdutorId(splitText[0]);
    setNameProdutor(splitText[1]);
    //setProducoes([]);
    localStorage.setItem("idCorretora", splitText[0]);
  };

  const openPdf = (url) => {
    window.open(url, "_blank");
  };

  const setFile = (fille) => {
    setLoaderConatiner("flex");
    setLoader(true);

    if (fille == null) return;

    const fileRef = ref(storage, `files/${fille.name}`);
    uploadBytes(fileRef, fille).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        setNovoPdf(url);
      });
      setLoader(false);
      setLoaderConatiner("none");
    });
  };

  const cadastrarApolice = async (data, idDoc) => {
    if (novoPdf == "") {
      alert("selecione um pdf");
    } else {
      const body = {
        segurado: data.segurado,
        dtInicial: data.dtInicial,
        dtFinal: data.dtFinal,
        ramo: data.ramo,
        placa: data.placa,
        modelo: data.modelo,
        nomeProdutor: data.nomeProdutor,
        idProdutor: data.idProdutor,
        linkPdf: data.linkPdf,
        linkPdf2: novoPdf,
        status: true,
        nApolice: nApolice,
        numeroProposta: data.numeroProposta,
        seguradora: data.seguradora,
      };
      setComponentLoadingFlex("none");
      setLoaderConatiner("flex");
      setLoader(true);
      const apoliceref = collection(
        db,
        "Corretores",
        params.id,
        "ApoliceVigente"
      );
      await addDoc(apoliceref, body)
        .then(async () => {
          const updatePropostaFechada = doc(
            db,
            "Corretores",
            params.id,
            "PropClose",
            idDoc
          );
          await updateDoc(updatePropostaFechada, { status: false }).then(() => {
            carregarPropF();

            setLoader(false);
            setLoaderConatiner("none");
            setComponentLoadingFlex("flex");
          });
        })
        .catch((err) => {
          alert("Algo deu errado" + err);
        });
    }
  };

  const cadastrarPropostaPendente = async (data, idDoc) => {
    const body = {
      segurado: data.segurado,
      dtInicial: data.dtInicial,
      dtFinal: data.dtFinal,
      ramo: data.ramo,
      placa: data.placa,
      modelo: data.modelo,
      nomeProdutor: data.nomeProdutor,
      idProdutor: data.idProdutor,
      linkPdf: data.linkPdf,
      linkPdf2: novoPdf,
      status: true,
      nApolice: nApolice,
      numeroProposta: data.numeroProposta,
      idDoc: idDoc,
      motivo: "",
      seguradora: data.seguradora,
    };

    const apoliceref = collection(
      db,
      "Corretores",
      params.id,
      "PropostaPendente"
    );
    await addDoc(apoliceref, body)
      .then(async () => {
        const updatePropostaFechada = doc(
          db,
          "Corretores",
          params.id,
          "PropClose",
          idDoc
        );
        await updateDoc(updatePropostaFechada, { status: false });
        carregarPropF();
      })
      .catch((err) => {
        alert("Algo deu errado" + err);
      });
  };

  const cadastrar = async () => {
    const valid = validation();

    if (valid < 8) {
      console.log("não faz nda");
    } else {
      const i = dtInicial.split("/").reverse().join("-");
      const f = dtFinal.split("/").reverse().join("-");
      if (moment(i).isBefore(f)) {
        const data = {
          segurado: segurado,
          dtInicial: dtInicial,
          dtFinal: dtFinal,
          ramo: ramo,
          placa: placa,
          modelo: modelo,
          nomeProdutor: nameProdutor,
          idProdutor: produtorId,
          linkPdf: linkPdf,
          status: true,
          numeroProposta: numeroProposta,
          seguradora: seguradora,
        };
        const contas = collection(db, "Corretores", params.id, "PropClose");
        await addDoc(contas, data)
          .then(async () => {
            const updatePropostaFechada = doc(
              db,
              "Corretores",
              params.id,
              "PropAberta",
              idDocAberta
            );
            await updateDoc(updatePropostaFechada, { status: false });
            carregarProd();
            clearData();
          })
          .catch((err) => {
            alert("Algo deu errado" + err);
          });

        setOpenModal(false);
      } else {
        toast.warn("A data Inicial deve ser menor do que a final");
      }
    }
  };

  const cadastrarComissao = async () => {
    const data = {
      segurado: segurado,
      seguradora: seguradora,
      numeroApolice: nApolice,
      parcela: parcela,
      percentualComissao: percentualComissao,
      premioLiquido: premioLiquido,
      comissaoValorMonetario: comissaoValorMonetario,
      dtPagamento: dtPagamento,
      observacao: observacao,
      ramo: ramo,
      nomeProdutor: nameProdutor,
      idProdutor: produtorId,
      status: true,
    };

    const comissaoRef = collection(db, "Corretores", params.id, "Comissoes");
    await addDoc(comissaoRef, data)
      .then((e) => {
        toast.success("Comissõ cadastrada com sucesso");
        setOpenModalComissao(false);
      })
      .catch((err) => {
        toast.warn("Algo deu errado consulte o Administrador! ");
      });
  };

  const updatePropostaPendente = async (docId) => {
    const propostaPendenteConfig = doc(
      db,
      "Corretores",
      params.id,
      "PropostaPendente",
      docId
    );
    await updateDoc(propostaPendenteConfig, { motivo: motivo, status: false });
    carregarPropPendente();
  };

  const clearData = () => {
    setsegurado("");
    setDataInicial("");
    setDtFinal("");
    setramo("");
    setPlaca("");
    setModelo("");
    setProdutorId("");
    setNumeroProposta("");
    setApoliceNumber("");
    setMotivo("");
    setSeguradora("");
    setParcela("");
    setPercentualComissao("");
    setPremioLiquido("");
    setComissaoValorMonetario("");
    setObservacao("");
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

  const validation = () => {
    var count = 0;
    if (segurado == "") toast.warn("O campo Segurado é obrigatorio !");
    else count++;
    if (ramo == "") toast.warn("O campo Ramo é obrigatorio !");
    else count++;
    if (modelo == "") toast.warn("O campo Modelo é obrigatorio !");
    else count++;
    if (dtInicial == "") toast.warn("O campo Data Inicial é obrigatorio !");
    else count++;
    if (placa == "") toast.warn("O campo Placa é obrigatorio !");
    else count++;
    if (numeroProposta == "")
      toast.warn("O campo Número Proposta é obrigatorio !");
    else count++;
    if (seguradora == "") toast.warn("O campo Seguradora é obrigatorio !");
    else count++;
    if (dtFinal == "") toast.warn("O campo Data Final é obrigatorio !");
    else count++;
    console.log(count);

    return count;
  };

  return (
    <div className="main">
      <ToastContainer />

      <h1>{params.id}</h1>
      <div className="cadastroComicoesMain">
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
        <div className="cadastroComicoesConatiner">
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
              <option value="">nenhum</option>
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

            <div className="btnScreenContainer">
              <button className="btnActionsScreen" onClick={carregarProd}>
                Carregar Propostas em aberto
              </button>

              <button className="btnActionsScreen" onClick={carregarPropF}>
                Carregar Propostas Fechadas
              </button>

              <button className="btnActionsScreen" onClick={carregarApolice}>
                Carregar Ápolice
              </button>

              <button
                className="btnActionsScreen"
                onClick={carregarPropPendente}
              >
                Carregar Propostas Pendentes
              </button>
            </div>
          </div>

          {propostasAbertasData.map((e) => {
            return (
              <div key={e.id} className="cardOpenModal">
                <span style={{ color: "black" }}>{e.doc.produtor}</span>
                <button
                  className="btnCComicoes"
                  onClick={() => {
                    setOpenModal(true);
                    setLInkPdf(e.doc.producao);
                    setIdDocAberta(e.idDoc);
                  }}
                >
                  Cadastrar Proposta
                </button>

                <button
                  className="dpfDowload"
                  onClick={() => {
                    openPdf(e.doc.producao);
                  }}
                >
                  <BsFiletypePdf style={{ width: "40px", height: "40px" }} />
                </button>
              </div>
            );
          })}

          {propostasFechadasData.map((e) => {
            return (
              <div
                key={e.id}
                className="cardOpenModalPropF"
                style={{
                  backgroundColor: "#ffff008a",
                  borderColor: "yellow",
                  display: componenteLoadingFlex,
                }}
              >
                <div className="columnApolice">
                  <div className="rowApolice">
                    <span className="cardSpanCloseProp">
                      Nº {e.doc.numeroProposta} - {e.doc.segurado}
                    </span>

                    <InputBase
                      style={{ width: "40%" }}
                      spanProps={"Nº Ápolice"}
                      spanPlaceholder={"Insira o número da Ápolice"}
                      idProps={"apoliceNumber"}
                      sendData={sendData}
                      typeProps={"text"}
                    />
                  </div>

                  <div className="rowApolice">
                    <button
                      className="btnApolice"
                      style={{ display: mainComponent }}
                      onClick={() => {
                        cadastrarApolice(e.doc, e.idDoc);
                        // setLInkPdf(e.doc.data.linkPdf);
                      }}
                    >
                      Cadastrar Ápolice
                    </button>

                    <input
                      id="produtores"
                      type="file"
                      className="custom-file-input-apolice"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>

                <div
                  className="lateral"
                  onClick={() => {
                    cadastrarPropostaPendente(e.doc, e.idDoc);
                  }}
                >
                  <FaArrowRight />
                </div>
              </div>
            );
          })}

          {apoliceData.map((e) => {
            return (
              <div
                key={e.id}
                className="cardOpenModal"
                style={{ backgroundColor: "#008a00b2", borderColor: "green" }}
              >
                <div className="columnApolice">
                  <span className="cardSpanCloseProp">
                    Nº {e.doc.nApolice} - {e.doc.segurado}
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
                        setramo(e.doc.ramo);
                        setsegurado(e.doc.segurado);
                        setApoliceNumber(e.doc.nApolice);
                        setOpenModalComissao(true);
                      }}
                    >
                      Cadastrar Comissão
                    </button>

                    <input
                      id="produtores"
                      type="file"
                      className="custom-file-input-apolice"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {propostaPendenteData.map((e) => {
            return (
              <div
                key={e.id}
                className="cardOpenModal"
                style={{ backgroundColor: "#ff0000b1", borderColor: "red" }}
              >
                <div className="columnApolice">
                  <span className="cardSpanCloseProp">
                    Nº {e.doc.nApolice} - {e.doc.segurado}
                  </span>

                  <div className="rowApolice">
                    <InputBase
                      style={{ width: "40%" }}
                      spanProps={"Motivo"}
                      spanPlaceholder={"Insira o Motivo"}
                      idProps={"motivo"}
                      sendData={sendData}
                      typeProps={"text"}
                    />

                    <button
                      className="btnCComicoesModal"
                      style={{ marginBottom: "3rem" }}
                      onClick={() => updatePropostaPendente(e.idDoc)}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Modal
            isOpen={openModal}
            setModalOpen={() => {
              setOpenModal(!openModal);
              clearData();
            }}
            selectProdutor={nomeProdutor}
          >
            <ToastContainer />

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
                spanPlaceholder={"Insira o Modelo do carro"}
                idProps={"modelo"}
                sendData={sendData}
                typeProps={"text"}
              />

              <div className="column">
                <span>Data Inicial</span>
                <input
                  type="date"
                  onChange={(e) => formatDataInicial(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <InputBase
                style={{ width: "40%" }}
                spanProps={"Placa"}
                spanPlaceholder={"Insira a placa do carro"}
                idProps={"placa"}
                sendData={sendData}
                typeProps={"text"}
              />

              <InputBase
                style={{ width: "40%" }}
                spanProps={"Número da Proposta"}
                spanPlaceholder={"Insira o número da proposta"}
                idProps={"nProposta"}
                sendData={sendData}
                typeProps={"text"}
              />

              <InputBase
                style={{ width: "40%" }}
                spanProps={"Seguradora"}
                spanPlaceholder={"Insira o nome da Seguradora"}
                idProps={"seguradora"}
                sendData={sendData}
                typeProps={"text"}
              />

              <div className="column">
                <span>Data Final</span>
                <input
                  type="date"
                  required
                  onChange={(e) => formatDataFinal(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btnCComicoesModal"
              style={{ marginBottom: "3rem" }}
              onClick={() => cadastrar()}
            >
              Cadastrar
            </button>
          </Modal>

          <Modal
            isOpen={openModalComissao}
            setModalOpen={() => setOpenModalComissao(!openModalComissao)}
            selectProdutor={nomeProdutor}
          >
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
      </div>
    </div>
  );
};

export default ListProdutores;
