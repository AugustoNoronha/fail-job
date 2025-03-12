import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cadastro from "./pages/cadastro";
import Login from './pages/login';
import Transmicoes from './pages/transmicoes';
import BackOffice from "./pages/backoffice";
import Detalhes from "./pages/detalhes";
import ForgotPassword from "./pages/esqueceuSenha";
import ForgotPasswordDone from "./pages/esqueceuSenhaDone";
import RegistroProd from "./pages/registroProd";
import CadastroSeguradoras from "./pages/cadastroSeguradora";
import DashBoard from "./pages/dashBoard";
import Comissoes from "./pages/comissoes";
import ListProdutores from "./pages/listProdutores";
import CadastroDashBoard from "./pages/cadastro-dashBoard";
import AdicionarComissao from "./pages/adicionarComissao";
import RegistroApolice from "./pages/registroApolice";


const Roteamento = () =>{
    return(

        <BrowserRouter>
             <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/cadastro" element={<Cadastro/>}/>

               <Route path="/login" element={<Login/>}/>

               <Route path="/transmicoes" element={<Transmicoes/>}/>

               <Route path="/backoffice" element={<BackOffice/>}/>

               <Route path="/detalhes" element={<Detalhes/>}/>
               
               <Route path="/esqueci-senha" element={<ForgotPassword/>}/>

               <Route path="/esqueci-senha-done" element={<ForgotPasswordDone/>}/>

               <Route path="/registro-producao" element={<RegistroProd/>}/>

               <Route path="/registro-apolice" element={<RegistroApolice/>}/>


               <Route path="/cadastro-seguradora" element={<CadastroSeguradoras/>}/>

               <Route path="/cadastro-dashboard" element={<CadastroDashBoard/>}/>

               <Route path="/dashBoard" element={<DashBoard/>}/>

               <Route path="/comissoes" element={<Comissoes/>}/>

               <Route path="/listProdutores/:id" element={<ListProdutores /> } />

               <Route path="/adiciona-comissao/:id" element={<AdicionarComissao /> } />




               

               


               



                
         </Routes>
        </BrowserRouter>
  
    )
}

export default Roteamento