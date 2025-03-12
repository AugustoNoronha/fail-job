import React, { Component, useState } from "react";
import "./input.css";
import storage, {storgae} from '../firebase'
import {ref, uploadBytes} from 'firebase/storage'
import {v4} from "uuid"

const InputPDF = (props) => {

    const [getData, setData] = useState([props.valuepProps])
    const [file, setFileData] = useState(null)


    const uploadFileChange = ({target})=>{
      fileToBase64(target.files[0], (err, result) => {
         if(target.file < 1 || !target.validity.valid){
          return
         }
         fileToBase64(target.files[0], (err, result) => {
              if(result){
                  props.sendData(result)
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


  const setFile = () => {
    if(file == null)return;

    const fileRef = ref(storage, `files/${file.name + v4() }`);
    uploadBytes(fileRef, file).then(() => {
      alert("file uplode")
    })
  }

    return (

        
      <div className="inputPdfConatoner">
     {/* <i><AiOutlinePaperClip/></i> */}
        <input
          id="produtores"
          type="file"
          className="custom-file-input"
          onChange={(e) => setFileData(e.target.value)}
        />

        <button onClick={setFile}>setFile</button>
          
      </div>
    );
}

export default InputPDF