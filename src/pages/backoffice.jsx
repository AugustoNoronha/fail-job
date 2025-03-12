import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const teste = [1, 2, 3];

const BackOffice = () => {
  const [corretores, setCorretores] = useState([]);
  const corretoresCollectionRef = collection(db, "Corretores");
  const [transmicoes, setTransmicoes] = useState([]);

  useEffect(() => {
    // getCorretores();
    getTransacoes();
  }, []);

  const getCorretores = async () => {
    const snapshot = await getDocs(corretoresCollectionRef).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCorretores(newData);
        // console.log(corretores, newData)
      }
    );
  };

  const getTransacoes = async () => {
    const transactionRef = collection(
      db,
      "Corretores",
      "jwLQCFwAd0VpI3VJ5tT0Ema5gdx2", //todo - salvar o token do usuario assim que clicado 
      "Transmicoes"
    );
    const newSnapshot = await getDocs(transactionRef).then((q) => {
      const newq = q.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTransmicoes(newq)
      console.log("Transmicao", newq);
    });
  };

  return (
    <div>
      listagem
      {/* {corretores.map((corretor, i) => (
        <div>
          <h1 key={i}> {corretor.id} </h1>
          <h2>{corretor.password}</h2>
          <div></div>
        </div>
      ))}
      {console.log("corretors", corretores)} */}
    </div>
  );
};

export default BackOffice;
