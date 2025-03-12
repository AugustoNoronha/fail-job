import React, { useEffect, useState } from "react"
import "./css.css"
import "./comissoesview.css"
import HeaderBoomer from "../shared/header";
import FooterBoomer from "../shared/footer";
import titlec from "../images/comissoestitle.png"
import { MaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { darken } from '@mui/material';
import NavBar from "../shared/navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Comissoes = () => {

  const uid = localStorage.getItem("token")
  const comissoesref = collection(db,"Corretores", uid, "ComissaoGrupoB")

  const [tableData ,setTableData] = useState([])

  const getTableData = async() => {
    await getDocs(comissoesref).then((snapshot) => {
      snapshot.forEach((e) => { setTableData(prev => [...prev ,e.data()])});
    })
  }

  useEffect(() => {
    getTableData()
  }, []);
    
      const columns = useMemo(
        () => [
          {
            header: "Produtor",
            accessorKey: "nomeProdutor", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Segurado",
            accessorKey: "segurado", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
        
        
          {
            header: "Ápolice",
            accessorKey: "nApolice", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Parcela",
            accessorKey: "parcela", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "%Comissao",
            accessorKey: "percentualComissao", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Prêmio Liquido",
            accessorKey: "premioLiquido", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Comissão",
            accessorKey: "comissaoValorMonetario", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Data do Pagamento",
            accessorKey: "dtPagamento", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Seguradora",
            accessorKey: "seguradora", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },
          {
            header: "Observação",
            accessorKey: "observacao", //simple accessorKey pointing to flat data
            style: {
                textAlign: 'center'
              }
          },

        ],
        []
      );

    return(
        <div className="main">
            <NavBar/>
            <div className="baseConatiner" style={{minHeight:'80vh'}}>
            <img src={titlec} alt="" />

            <div className="reactTable">
              <MaterialReactTable
                columns={columns}
                data={tableData}
                enableGlobalFilter={true}
                enableFullScreenToggle={false}
                enableHiding={false}
                muiTableHeadCellProps={{
                    //simple styling with the `sx` prop, works just like a style prop in this example
                    sx: {
                      fontFamily:'basic',
                      fontSize: '18px',
                    },
                  }}
                  muiTableBodyRowProps={{
                    height:'60px',
                    borderRadius:'20px',
                  }}
                  muiTablePaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: '0',
                      border: '1px dashed #e0e0e0',
                    },
                  }}
                  muiTableBodyProps={{
                    sx: (theme) => ({
                      '& tr:nth-of-type(odd)': {
                        backgroundColor: darken(theme.palette.background.default, 0.1),
                      },
                    }),
                  }}
              />
            </div>
            </div>
            <FooterBoomer/>
        </div>
    );

}

export default Comissoes