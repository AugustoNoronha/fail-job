import React, { useEffect, useState } from "react";
import HeaderBoomer from "../shared/header";
import FooterBoomer from "../shared/footer";

import dashboardtitle from "../images/dashboard.png";
import { MaterialReactTable } from "material-react-table";

import "./dashBoard.css";
import { useMemo } from "react";
import { darken } from "@mui/material";
import NavBar from "../shared/navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { Box, IconButton, Tooltip } from "@mui/material";

import { BsFiletypePdf, BsArrowRightCircle } from "react-icons/bs";
import CardDashBoard from "../components/cardDashBoard";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
const DashBoard = () => {
  const uid = localStorage.getItem("token");
  const propCloseRef = collection(db, "Corretores", uid, "PropClose");
  const propAtrasoRef = collection(db, "Corretores", uid, "PropostaPendente");
  const propRegistradasRef = collection(db, "Corretores", uid, "PropAberta");

  const ApoliceRef = collection(db, "Corretores", uid, "ApoliceVigente");

  const [tableData, setTableData] = useState([]);
  const [tableDataPendente, setTableDataPendente] = useState([]);
  const [tableDataApolice, setTableDataApolice] = useState([]);
  const [tableDataApoliceVencer, setTableDataApoliceVencer] = useState([]);
  const [registradasHoje, setRegistradasHoje] = useState([])

  const [columLoad, setColumLoad] = useState([])
  const [isToday, setIsToday] = useState(false)


  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const [countPendente, setCountPendente] = useState(0);
  const [countApolice, setCountApolice] = useState(0);
  const [countApoliceVencer, setCountApoliceVencer] = useState(0);

  const [propAtarso, setPropAtraso] = useState(0);
  const [apoliceVigente, setApoliceVigente] = useState(0);
  const [apoliceAvencer, setApoliceAvencer] = useState(0);

  const [comissao, setComissao] = useState();
  const [dashBoard, setDashBoard] = useState("none");
  const [comissoes, setComissoes] = useState("none");
  const [cadastroComissoes, setCadastrarComissao] = useState("none");

  const [countRegistradas, setCountRegistradas] = useState(0)

  const [tableDataLoaded, setTableDataLoaded] = useState([]);

  var navigate = useNavigate();

  const id = localStorage.getItem("token");
  const config = collection(db, "Corretores");
  const getUserType = async () => {
    await getDocs(config).then((e) => {
      const res = e.docs.map((p) => ({
        idDoc: p.id,
        doc: p.data(),
      }));
      res.forEach((e) => {
        if (e.idDoc == id) {
          if (e.doc.isAdm == false) {
            if (e.doc.tipo == "a") {
              setDashBoard("block");
            } else {
              setComissoes("block");
            }
          } else {
            setDashBoard("block");
            setComissoes("block");
            setCadastrarComissao("block");
            //todo - olhar isso aqui
          }
        }
      });
    });
  };

  const getPropClose = async () => {
    var i = 0;
    var total = 0;
    await getDocs(propCloseRef).then((snapshot) => {
      snapshot.forEach((e) => {
        // if (e.data().status) {
          setTableData((prev) => [...prev, e.data()]);
          setTableDataLoaded((prev) => [...prev, e.data()]);

          ++i;
          // total += parseInt(e.data().body.comissaoTarifa);
          console.log(e.data());
        }
      // }
      );
    });
    setCount(i);
    setTotal(total);
  };
  
  
  const getPropRegistradas = async () => {
    var i = 0;
    await getDocs(propRegistradasRef).then((snapshot) => {
      setRegistradasHoje([])
      snapshot.forEach((e) => {
        var partesData = e.data().dataregistro.split("/").reverse().join("-");
        var timeStemp = moment(partesData).startOf("day").fromNow();
        var value = timeStemp.split(" ");
       if(value[1] == 'hours'){
        ++i;
        console.log(e.data())
        setRegistradasHoje((prev) => [...prev, e.data()]);
       }
      });
    });
    setCountRegistradas(i);
  };

  const getPropPendente = async () => {
    var i = 0;
    await getDocs(propAtrasoRef).then((snapshot) => {
      snapshot.forEach((e) => {
        setTableDataPendente((prev) => [...prev, e.data()]);
        ++i;
        // total += parseInt(e.data().body.comissaoTarifa);
      });
    });
    setCountPendente(i);
  };

  const getApoliceAvencer = async () => {
    var i = 0;
    var j = 0;
    await getDocs(ApoliceRef).then((snapshot) => {
      snapshot.forEach((e) => {
        const dateTime = e.data().dtFinal;
        var partesData = dateTime.split("/").reverse().join("-");

        var dataConstruct = dateTime.split("/").reverse().join("-");
        var nowDate = moment(Date()).format("YYYY-MM-DD");

        if (moment(partesData).isAfter(nowDate)) {
          var timeStemp = moment(dataConstruct).startOf("hours").fromNow();
          var value = timeStemp.split(" ");
          console.log("value",value);
          if (value[1] == 'a' && value[2] == 'day' || value[1] == 'a' && value[2] == 'month' || value[1] <= 30 && value[2] == 'days') {
            console.log("esta vencendo");
            setTableDataApoliceVencer((prev) => [...prev, e.data()]);
            ++j;
            setCountApoliceVencer(j);
          }
        } else {
          setTableDataApoliceVencer((prev) => [...prev, e.data()]);
          ++j;
          setCountApoliceVencer(j);
        }

        setTableDataApolice((prev) => [...prev, e.data()]);
        ++i;
        // total += parseInt(e.data().body.comissaoTarifa);
        console.log(e.data());
      });
    });
    setCountApolice(i);
  };

  const getApoliceVigente = async () => {
    var i = 0;
    var total = 0;
    await getDocs(ApoliceRef).then((snapshot) => {
      snapshot.forEach((e) => {
        if(e.dtFinal )
        setTableData((prev) => [...prev, e.data()]);
        ++i;
        // total += parseInt(e.data().body.comissaoTarifa);
        console.log(e.data());
      });
    });
    setCountApolice(i);
    setTotal(total);
  };

  useEffect(() => {
    getUserType();
    getPropClose();
    getPropPendente();
    getApoliceAvencer();
    getPropRegistradas();
    getApoliceVigente();
  }, []);

  const columnsApolice = useMemo(
    () => [
      {
        header: "Segurado",
        accessorKey: "segurado", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Segurado
          </div>
        ),
      },
      {
        header: "Ramo",
        accessorKey: "ramo", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Ramo
          </div>
        ),
      },
      {
        header: "Modelo",
        accessorKey: "modelo", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Modelo
          </div>
        ),
      },
      {
        header: "Placa",
        accessorKey: "placa", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Placa
          </div>
        ),
      },
      {
        header: "Data Inicial",
        accessorKey: "dtInicial", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Data Inicial
          </div>
        ),
      },
      {
        header: "Data Final",
        accessorKey: "dtFinal", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Data Final
          </div>
        ),
      },
      {
        header: "Seguradora",
        accessorKey: "seguradora", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Seguradora
          </div>
        ),
      },
      {
        header: "Número Ápolice",
        accessorKey: "nApolice", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Número Ápolice
          </div>
        ),
      },
      

      {
        header: "Produtor",
        accessorKey: "nomeProdutor", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Produtor
          </div>
        ),
      },
    ],
    []
  );

  const columnsProposta = useMemo(
    () => [
      {
        header: "Segurado",
        accessorKey: "segurado", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Segurado
          </div>
        ),
      },
      {
        header: "Ramo",
        accessorKey: "ramo", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Ramo
          </div>
        ),
      },
      {
        header: "Modelo",
        accessorKey: "modelo", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Modelo
          </div>
        ),
      },
      {
        header: "Placa",
        accessorKey: "placa", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Placa
          </div>
        ),
      },
      {
        header: "Data Inicial",
        accessorKey: "dtInicial", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Data Inicial
          </div>
        ),
      },
      {
        header: "Data Final",
        accessorKey: "dtFinal", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Data Final
          </div>
        ),
      },
      {
        header: "Seguradora",
        accessorKey: "seguradora", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Seguradora
          </div>
        ),
      },
      {
        header: "Número Proposta",
        accessorKey: "numeroProposta", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Número Proposta
          </div>
        ),
      },
      

      {
        header: "Produtor",
        accessorKey: "nomeProdutor", //simple accessorKey pointing to flat data
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Produtor
          </div>
        ),
      },
    ],
    []
  );

  const columns2 = useMemo(() => [
    {
      header: "Número Proposta",
      accessorKey: "numeroProposta", //simple accessorKey pointing to flat data
      Header: () => (
        <div
          style={{
            textAlign: "center",
          }}
        >
          Número Proposta
        </div>
      ),
    }
  ])


  const opnePdf = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="main">
      <NavBar />
      <div className="dashBoardContainer">
        <div className="dashBoardMain">
          <div className="rowDB">
            <img src={dashboardtitle} alt="" />
            <div className="columnDash">
              <button
                className="BDash"
                onClick={() => {
                  navigate("/cadastro-seguradora");
                }}
              >
                Cadastro de Seguradoras
              </button>
              <button className="PropRegView" onClick={() =>{setColumLoad(columns2); setTableDataLoaded(registradasHoje)}}>Você já registrou : {countRegistradas} propostas hoje</button>
            </div>
          </div>

          <div className="columnDash2">
            <div className="rowDB">
              <div
                className="cardActionContainer"
                onClick={() => {setColumLoad(columnsProposta); setTableDataLoaded(tableData)}}
              >
                <CardDashBoard
                  tilteProp={"Propostas Fechadas"}
                  sizeProp={"7rem"}
                >
                  {count}
                </CardDashBoard>
              </div>

              <div
                className="cardActionContainer"
                onClick={() => {setColumLoad(columnsProposta); setTableDataLoaded(tableDataPendente)}}
              >
                <CardDashBoard
                  tilteProp={"Propostas em Atraso"}
                  sizeProp={"7rem"}
                >
                  {countPendente}
                </CardDashBoard>
              </div>

              <div
                className="cardActionContainer"
                onClick={() => {setColumLoad(columnsApolice); setTableDataLoaded(tableDataApolice)}}
              >
                <CardDashBoard
                  tilteProp={"Apólices Vigentes"}
                  sizeProp={"7rem"}
                >
                  {countApolice}
                </CardDashBoard>
              </div>
            </div>

            <div className="rowDB">
              <div
                className="cardActionContainer"
                onClick={() => {setColumLoad(columnsApolice);setTableDataLoaded(tableDataApoliceVencer)}}
              >
                <CardDashBoard
                  tilteProp={"Apólices a Vencer"}
                  sizeProp={"7rem"}
                >
                  {countApoliceVencer}
                </CardDashBoard>
              </div>

              <CardDashBoard
                style={{ display: comissao }}
                tilteProp={"Comissão"}
                sizeProp={"3rem"}
              >
                R${total}
              </CardDashBoard>
              <div
                className="cardActionContainer"
                onClick={() => {
                  navigate("/registro-producao");
                }}
              >
                <CardDashBoard
                  tilteProp={"Registro de Produção"}
                  sizeProp={"7rem"}
                >
                  <BsArrowRightCircle />
                </CardDashBoard>
              </div>
            </div>

            <div className="reactTable">
              <MaterialReactTable
                columns={columLoad}
                data={tableDataLoaded}
                enableGlobalFilter={true}
                enableFullScreenToggle={false}
                enableHiding={false}
                enableColumnActions={false}
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    muiTableHeadCellProps: {
                      align: "center",
                    },
                    size: 120,
                  },
                }}
                enableColumnOrdering
                enableEditing
                renderRowActions={({ row, table }) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "4rem",
                    }}
                  >
                    <Tooltip arrow placement="left" title="Produção">
                      <IconButton
                        color="edit"
                        onClick={() => opnePdf(row.original.linkPdf)}
                      >
                        <BsFiletypePdf />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="left" title="Apólice">
                      <IconButton
                        color="edit"
                        onClick={() => opnePdf(row.original.linkPdf2)}
                      >
                        <BsFiletypePdf />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                muiTableBodyRowProps={{
                  height: "60px",
                  borderRadius: "20px",
                }}
                muiTablePaperProps={{
                  elevation: 0,
                  sx: {
                    borderRadius: "0",
                    border: "1px dashed #e0e0e0",
                  },
                }}
                muiTableBodyProps={{
                  sx: (theme) => ({
                    "& tr:nth-of-type(odd)": {
                      backgroundColor: darken(
                        theme.palette.background.default,
                        0.1
                      ),
                    },
                  }),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterBoomer />
    </div>
  );
};

export default DashBoard;
