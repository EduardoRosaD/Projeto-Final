import React from 'react';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import clientesLogoOn from '../../assets/images/clientesLogoOn.svg';
import cobrancasLogoOff from '../../assets/images/cobrancasLogoOff.svg';
import cobrancasLogoOn from '../../assets/images/cobrancasLogoOn.svg';
import homeLogoOff from '../../assets/images/homeLogoOff.svg';
import homeLogoOn from '../../assets/images/homeLogoOn.svg';
import clienteEmDia from '../../assets/mainImages/clienteEmDia.svg';
import clienteInadimplente from '../../assets/mainImages/clienteInadimplente.svg';
import cobrancaPaga from '../../assets/mainImages/cobrancaPaga.svg';
import cobrancaPrevista from '../../assets/mainImages/cobrancaPrevista.svg';
import { useNavigate } from 'react-router-dom';
import cobrancaVencida from '../../assets/mainImages/cobrancaVencida.svg';
import Header from '../../components/Header/index';
import Tabela from '../../components/Tabela/index';
import Tabela2 from '../../components/Tabela2/index';
import './styles.css';



function Home() {
    const navigate = useNavigate();
    const [homeState, setHomeState] = React.useState('home');
    const [inps, setInps] = React.useState([]);

    const handleHomeState = () => {
        setHomeState('home')
    }
    const handleClientesState = () => {
        setHomeState('clientes')
        navigate('/clientes')
    }
    const handleCobrancasState = () => {
        setHomeState('cobrancas')
        navigate('/cobrancas')
    
    }




    return (
        <div className='main-container-home-home'>


            <div className='container1-home'>
                <div className='button-container'>

                   
                        <button style={{ color: homeState === 'home' ? '#DA0175' : '#343447', borderRight: homeState === 'home' ? ' 2px solid #DA0175' : 'none', display: 'flex', alignItems: 'center', flexDirection:'column', marginLeft:18, paddingRight: 18 }} onClick={handleHomeState}>
                            <img src={homeState === 'home'  ? homeLogoOn : homeLogoOff} alt='img'></img>
                            Home
                        </button>
                   

                    <button style={{ color: homeState === 'clientes' ? '#DA0175' : '#343447', marginTop: 81, marginBottom: 81, borderRight: homeState === 'clientes' ? ' 2px solid #DA0175' : 'none' }} onClick={handleClientesState}>
                        <img src={homeState === 'clientes' ? clientesLogoOn : clientesLogoOff}alt='img'></img>
                        Clientes
                    </button>

                    <button style={{ color: homeState === 'cobrancas' ? '#DA0175' : '#343447', marginLeft: -9, borderRight: homeState === 'cobrancas' ? ' 2px solid #DA0175' : 'none' }} onClick={handleCobrancasState}>
                        <img src={homeState === 'cobrancas' ? cobrancasLogoOn : cobrancasLogoOff}alt='img'></img>
                        Cobranças
                    </button>

                </div>

            </div>


            <div className='container2-home'>

                <Header
                inps={inps}
                setInps=    {setInps}
                homeState={homeState}

                ></Header>
            

                <div className='tabelas1-container'>

                    <div className='conteudo-tabela-container'>
                        <div className='cobranca-container'>
                            <img src={cobrancaPaga} alt='cobrancaPaga'></img>
                            <div className='p-container'>
                                <p>Cobranças Pagas</p>
                                <p className='px24'>R$ 30.000</p>
                            </div>
                        </div>


                        <div className='tabela-cabecalho'>
                            <h3>Cobranças Vencidas</h3>
                            <div className='tabela-span' ><span>08</span></div>
                        </div>
                        <Tabela />

                        <div className='link-container'>
                            <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

                        </div>

                    </div>

                    <div className='conteudo-tabela-container'>
                        <div className='cobranca-container'
                            style={{ backgroundColor: '#FFEFEF' }}>
                            <img src={cobrancaVencida} alt='cobranca-vencida'></img>
                            <div className='p-container'>
                                <p>Cobranças Vencidas</p>
                                <p className='px24'>R$ 7.000</p>
                            </div>
                        </div>
                        <div className='tabela-cabecalho'>
                            <h3>Cobranças Previstas</h3>
                            <div className='tabela-span' style={{ backgroundColor: '#FCF6DC' }} ><span style={{ color: '#C5A605' }}>05</span></div>
                        </div>
                        <Tabela />

                        <div className='link-container'>
                            <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

                        </div>

                    </div>

                    <div className='conteudo-tabela-container'>
                        <div className='cobranca-container' style={{ backgroundColor: '#FCF6DC' }}>
                            <img src={cobrancaPrevista} alt='cobranca-prevista'></img>
                            <div className='p-container'>
                                <p>Cobranças Pagas</p>
                                <p className='px24'>R$ 10.000</p>
                            </div>
                        </div>
                        <div className='tabela-cabecalho'>
                            <h3>Cobranças Previstas</h3>
                            <div className='tabela-span'
                                style={{ backgroundColor: '#EEF6F6' }}
                            ><span style={{ color: '#1FA7AF' }}>10</span></div>
                        </div>
                        <Tabela />

                        <div className='link-container'>
                            <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

                        </div>

                    </div>

                </div>

                <div className='container-tabelas-clientes-home'>

                    <div className='tabelas2-container'>

                        <div className='tabela-container2'>

                            <div className='tabela-cabecalho'>
                                <div className='h3-container'>
                                    <img src={clienteInadimplente} alt='cliente-inadiplente'></img>
                                    <h3>Clientes Inadimplentes</h3>
                                </div>

                                <div className='tabela-span' ><span>08</span>
                                </div>

                            </div>

                            <Tabela2 />


                            <div className='link-container'>
                                <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

                            </div>

                        </div>

                    </div>


                    <div className='tabelas2-container'>

                        <div className='tabela-container2'>

                            <div className='tabela-cabecalho'>
                                <div className='h3-container'>
                                <img src={clienteEmDia} alt='cliente em dia'></img>
                                    <h3>Clientes em dia</h3>
                                </div>

                                <div className='tabela-span' style={{ backgroundColor: '#EEF6F6' }} ><span style={{ color: '#1FA7AF' }}>08</span>
                                </div>

                            </div>

                            <Tabela2 />


                            <div className='link-container'>
                                <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    )
}

export default Home;