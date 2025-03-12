import React from "react";
import './css.css'
import './home.css'
import logo from '../images/logo.png'
import whatsapp from '../images/whatsapp.png'
import foto1Home from '../images/foto1HomePage.png'
import foto2Home from '../images/foto2HomePage.png'
import Espacamento from "../shared/espacamento";

// import foto3Home from '../images/foto3HomePage.png'
// import homeTop from '../images/homeTopSise.png'
import homeBottom from '../images/homeBottom.png'




import { BsArrowDown } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import HeaderBoomer from "../shared/header";

function Home() {


    return (
        <div className="main" >
            <div className="headerContainerH" style={{ zIndex: '1000' }}>
                <HeaderBoomer />

            </div>
            <div className="midleContainer">
                <div className="midle">
                    {/* <img className="foto1" src={homeTop} alt="" /> */}

                    <div className="conatinerX">

                        <div className="textBox">
                            <span className="spanSize" >Boomer</span>
                            <span className="spanSize" style={{ color: "#21B9FF" }}>One</span>
                        </div>

                        <div className="fraseContainer">
                            <span className="spanSize2">A gente também</span>
                            <span className="spanSize2">não queria fazer  </span>
                            <span className="spanSize2">mais um sistema </span>
                            <span className="spanSize2">de gestão,  </span>
                            <span className="spanSize2">por isso </span>
                            <span className="spanSize2">resolvemos</span>
                            <span className="spanSize3" style={{ color: "#21B9FF" }}>revolucionar</span>
                        </div>
                        <button className="btnSaibaMais">Saiba Mais <BsArrowDown /></button>


                    </div>

                    <div className="img1Container">
                        <img className="foto1Homepage" src={foto1Home} alt="" />

                    </div>



                </div>
            </div>

            <div className="bottomContainer">
                <div className="bottomTopContainer">

                    <img className="foto2Home" src={foto2Home} alt="" />

                    <div className="foto2HomeSide">
                        <div className="textboxBottom">
                            <span className="spanSize2">Porque queremos  </span>
                            <span className="spanSize3" style={{ color: "#21B9FF" }}>gerar impacto</span>
                        </div>

                        <br />
                        <span className="spanSize2" >na vidado do corretor de seguros?  </span>
                        <span className="spanSize4">O Corretor de Seguros enfrenta muitas tarefas burocráticas após a venda de um seguro, o que pode ser uma grande fonte de frustração. Essas tarefas incluem baixar propostas em PDF e adicioná-las ao sistema, inserir informações cadastrais do cliente quando a apólice é emitida, baixar extratos de comissão e vincular comissão de cada cliente individualmente, entre outras tarefas que são desnecessárias..</span>
                    </div>

                    <span className="spanSize2" >na vidado do corretor de seguros?  </span>


                </div>


            </div>
            <div className="fotoBottomContainer">
                <div className="metadeContainer">
                    <div className="conatinerX">

                        <div className="fraseContainer">
                            <span className="spanSize2">Com o</span>

                            <span className="spanSize" >Boomer</span>
                            <span className="spanSize" style={{ color: "#21B9FF" }}>One</span>
                        </div>

                        <div className="fraseContainer">
                            <span className="spanSize5">você não precisa mais se preocupar
                                em realizar diversas tarefas burocráticas após a transmissão do
                                seguro, como baixar PDFs de propostas e anexá-los ao sistema de
                                gestão, alimentar dados cadastrais de clientes quando as apólices
                                são emitidas e vincular comissões de cliente por cliente. Ao invés
                                disso, você pode facilmente consultar as informações dos seus clientes
                                e da sua corretora em um só lugar, poupando tempo e aumentando a eficiência
                                do seu trabalho.
                            </span>

                        </div>


                    </div>
                </div>
                <Espacamento />
                <div className="metadeContainer">
                    <img src={homeBottom} alt="" className="foto3" />

                </div>
            </div>





            <div className="footer">

                <img className="logo2" src={logo} alt="" />
                <img className="whatsapp" src={whatsapp} alt="" />

            </div>
        </div>
    )
}

export default Home;