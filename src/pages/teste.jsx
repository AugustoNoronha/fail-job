import {  useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore"

function Corretor() {
  const [newName, setNewName] = useState("")
  const [newCnpj, setNewCnpj] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newTelefone, setNewTelefone] = useState("")
  const [newSusep, setNewSusep] = useState("")
  const corretorCollectionRef = collection(db, "Corretores")


  const createCorretor = async () => {
    
    await addDoc(corretorCollectionRef, { nameEmpresa: newName, cnpj: newCnpj, email: newEmail, telefone: newTelefone, susep: newSusep })
  }

  return (
    <div className={StyleSheet.projects}>
    
    <input type="text" placeholder="Nome da Empresa" onChange={(e) => setNewName(e.target.value)}/>
    <input type="text" placeholder="CNPJ" onChange={(e) => setNewCnpj(e.target.value)}/>
    <input type="text" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/>
    <input type="text" placeholder="Telefone" onChange={(e) => setNewTelefone(e.target.value)}/>
    <input type="text" placeholder="Susep" onChange={(e) => setNewSusep(e.target.value)}/>

    <button onClick={createCorretor}>inserir</button>
      
    </div>
  );
}

export default Corretor;