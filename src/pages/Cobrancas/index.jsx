import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import closed from '../../assets/closed.svg';
import iconeModalRecusaCobranca from '../../assets/iconeModalRecusaCobranca.svg';
import checkedCliente from '../../assets/images/checkedCliente.svg';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import clientesLogoOn from '../../assets/images/clientesLogoOn.svg';
import cobrancasLogoOff from '../../assets/images/cobrancasLogoOff.svg';
import cobrancasLogoOn from '../../assets/images/cobrancasLogoOn.svg';
import homeLogoOff from '../../assets/images/homeLogoOff.svg';
import homeLogoOn from '../../assets/images/homeLogoOn.svg';
import botaoFiltro from '../../assets/mainImages/botaoFiltro.svg';
import redClosed from '../../assets/redClosed.svg';
import Header from '../../componentsSprint2/Header/index';
import TabelaCobrancas from '../../componentsSprint2/TabelaCobrancas/index';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import './styles.css';
import Sidebar from '../../components/SideBar/index';

function Cobrancas() {
    const navigate = useNavigate();
    const [homeState, setHomeState] = React.useState('cobrancas');

    const [inps, setInps] = React.useState([])

    const [openCobrancaSelecionada, setOpenCobrancaSelecionada] = React.useState(false);
    const handleOpen = () => {
        setOpenCobrancaSelecionada(true);
    }
    const handleClose = () => {
        setOpenCobrancaSelecionada(false);
    }
    const [cobrancasState, setCobrancas] = React.useState([]);
    const [cobrancaSelecionadaState,
        setCobrancaSelecionadaState] = React.useState([]);

    const [modalRecusaCobranca, setModalRecusaState] = React.useState(false);

    const [modalSucessoCliente, setModalSucessoCliente] = React.useState(false);
    const [modalSucessoCobranca, setModalSucessoCobranca] = React.useState(false);
    const [modalSucessoCobrancaEditada, setModalSucessoCobrancaEditada] = React.useState('cadastrada');

    const handleModalRecusaCobranca = () => {
        setModalRecusaState(!modalRecusaCobranca);
        setTimeout(() => {
            setModalRecusaState(false)
          }, 2000)
    
    }
    const handleModalSucessoCliente = () => {
        setModalSucessoCliente(!modalSucessoCliente);
        setTimeout(() => {
            setModalSucessoCliente(false)
          }, 2000)
    }
    const handleModalSucessoCobranca = () => {
        setModalSucessoCobranca(!modalSucessoCobranca);
        setTimeout(() => {
            setModalSucessoCobranca(false)
          }, 2000)
    }

    const createData = (nome_cliente, valor, dataVencimento, status_cobranca, descricao, id) => {
        return { nome_cliente, valor, dataVencimento, status_cobranca, descricao, id };
    }
    const rows = [];
    const effectActivate = ''


    const getCobrancas = async () => {
        let localCobrancas = ''
        const cobrancas = await api.get('/cobranca');
        localCobrancas = cobrancas.data
        setCobrancas(localCobrancas);
        console.log(cobrancas.data)
    }

    const handleCobrancaSelecionada = (cobranca) => {
        setCobrancaSelecionadaState(cobranca);
        if ( modalRecusaCobranca === true){
        setModalRecusaState(!modalRecusaCobranca)
    }
    }

    cobrancasState.map((cobranca) => {
        return (
            rows.push(createData(cobranca.nome_cliente, cobranca.valor, cobranca.vencimento, cobranca.status_cobranca, cobranca.descricao, cobranca.id))
        )
    })




    useEffect(() => { getCobrancas() }, [effectActivate])




    const handleHomeState = () => {
        setHomeState('home')
        navigate('/home')
    }
    const handleClientesState = () => {
        setHomeState('clientes')
        navigate('/clientes')
    }
    const handleCobrancasState = () => {
        setHomeState('cobrancas')
        navigate('/cobrancas')
    }
    const handleTipoModalSucessoCobranca = (tipo) => {
        setModalSucessoCobrancaEditada(tipo)
        console.log('teste edit')
    }



    return (
        <UserContext.Provider value={{

            handleCobrancaSelecionada,
            handleTipoModalSucessoCobranca,
            handleOpen,
            handleClose,
            handleModalSucessoCobranca,
            handleModalRecusaCobranca,

            cobrancaSelecionadaState,
            openCobrancaSelecionada,
            getCobrancas,

            modalRecusaCobranca,

            setModalSucessoCobrancaEditada,
            setModalRecusaState
            
            
        }}>
            <div className='main-container-home'>


               <Sidebar/>


                <div className='container2-home'>

                    <Header
                    ></Header>

                    <div className='clientes-title-btn-input'>

                        <div className='logo-title'>
                            <img src={clientesLogoOff} alt='clientes-icone'></img>
                            <h2 className='cliente-title'>Cobrancas</h2>
                        </div>

                        <div className='btn-input'>




                            <img src={botaoFiltro} alt='botaoFiltro'></img>
                            <Input
                                sx={{
                                    border: '1px solid #D0D5DD', width: '322px', borderRadius: 1.4, height: 33, '&:before': {
                                        borderBottom: 'none !important'
                                    }, '&:after': {
                                        borderBottom: 'none !important'
                                    },
                                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                                    padding: '7px 8px',
                                    backgroundColor: '#FFFFFF',
                                }}
                                focused={false}
                                placeholder={'Pesquisar'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility"
                                        >
                                            <SearchIcon />

                                        </IconButton>
                                    </InputAdornment>
                                }
                            >

                            </Input>

                        </div>

                    </div>




                    <div className='container-tabelas-clientes'>

                        <div className='tabelas2-container'>

                            <div className='tabela-container2'>



                                <TabelaCobrancas
                                    rows={rows}
                                    handleModalSucessoCobranca={handleModalSucessoCobranca}
                                >
                                </TabelaCobrancas>





                            </div>

                        </div>
                    </div>
                    {modalSucessoCliente &&
                        <div className='modal-sucesso-cadastro-cliente'>
                            <img src={checkedCliente} alt='checked'></img>
                            <p>Cadastro concluído com sucesso</p>
                            <img src={closed} alt='close' className='close-cliente'
                                onClick={handleModalSucessoCliente}>

                            </img>

                        </div>
                    }
                      { modalRecusaCobranca &&         <div className='modal-recusa-deletar-cobranca'
                        >
                            <img src={iconeModalRecusaCobranca} alt='checked'
                            ></img>
                            <p>Esta cobranca não pode ser excluída!</p>

                            <img src={redClosed} alt='close' className='pointer'
                                onClick={handleModalRecusaCobranca}>

                            </img>

                        </div> }
                
                   
                    {modalSucessoCobranca &&
                        <div className='modal-sucesso-cadastro-cliente'
                        >
                            <img src={checkedCliente} alt='checked'
                            ></img>
                            {modalSucessoCobrancaEditada === 'cadastrada' ? <p>Cobranca cadastrada com sucesso</p> : modalSucessoCobrancaEditada === 'editada' ? <p>Cobranca editada com sucesso</p> : <p>Cobranca excluída com sucesso</p>}

                            <img src={closed} alt='close' className='close-cliente'
                                onClick={handleModalSucessoCobranca}>

                            </img>

                        </div>
                    }
                

                </div>

            </div >
        </UserContext.Provider>
    )
}

export default Cobrancas;