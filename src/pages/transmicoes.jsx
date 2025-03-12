import React, { useState } from "react";
import { db } from "../firebase";
import { CollectionReference, addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore"

  function Transmicoes() {

  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [ramo, setRamo] = useState("")
  const [seguradora, setSeguradora] = useState("")
  const [nomeSeguradora, setNomeSeguradora] = useState("")
  const [produtor, setProdutor] = useState("")
  const [modeloCarro, setModeloCarro] = useState("")
  const [placa, setPlaca] = useState("")
  const [data, setData]= useState([])

  const [pdf, setPdf]= useState("")


    const uid = localStorage.getItem("token")

    

    const corretorCollectionRef = collection(db, "Corretores", uid, "Transmicoes" )

    const criarTransmicao = async () => {
        // if(dataInicial < dataFinal){

            // const sla={ 
            //     dataInicial: dataInicial, 
            //     dataFinal:dataFinal, 
            //     ramo:ramo, 
            //     seguradora:seguradora, 
            //     nomeSeguradora:nomeSeguradora,
            //     produtor:produtor,
            //     modeloCarro:modeloCarro,
            //     placa:placa
            //  }

            //  setData(sla)

            //  db.collection("Corretores").doc(uid).collection("Transmicoes").
            console.log("fui chamado")
            await addDoc(corretorCollectionRef , {dataInicial: dataFinal, dataFinal:dataFinal})
            
            //todo - resolver essa inverção
        // }else{
        //     alert("A Data final deve ser maior que a data inicial")
        // }

    }

    const updatePDF = async () =>{
        await updateDoc(corretorCollectionRef, {pdf:pdf })
    }

    const uploadFileChange = ({target})=>{
        fileToBase64(target.files[0], (err, result) => {
           if(target.file < 1 || !target.validity.valid){
            return
           }
           fileToBase64(target.files[0], (err, result) => {
                if(result){
                    setPdf(result)
                }
           })
        })
    }

    const fileToBase64 = (file, cb) => {
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=function(){
            cb(null, reader.result)
        }
        reader.onerror =function(error){
            cb(error, null)
        }
    }

    return (
        <div>
            <input type="date" placeholder="DataInicial" onChange={(e) => setDataInicial(e.target.value)} />
            <input type="date" placeholder="DataFinal" onChange={(e) => setDataFinal(e.target.value)} />
            <input type="text" placeholder="Ramo" onChange={(e) => setRamo(e.target.value)} />
            <input type="text" placeholder="Seguradora" onChange={(e) => setSeguradora(e.target.value)} />
            <input type="text" placeholder="Nome Seguradora" onChange={(e) => setNomeSeguradora(e.target.value)} />
            <input type="text" placeholder="Produtor" onChange={(e) => setProdutor(e.target.value)} />
            <input type="text" placeholder="Modelo do Carro" onChange={(e) => setModeloCarro(e.target.value)} />
            <input type="text" placeholder="Placa do carro" onChange={(e) => setPlaca(e.target.value)} />

            <input type="file" name="filetobase64" accept="application/pdf" onChange={uploadFileChange} />
            <textarea id="base64file" value={pdf} readOnly></textarea>

            <button onClick={criarTransmicao}>Criar Transmição</button>
        </div>
    )
}


export default Transmicoes;