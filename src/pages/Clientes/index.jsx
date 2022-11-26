import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import closed from '../../assets/closed.svg';
import checkedCliente from '../../assets/images/checkedCliente.svg';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import clientesLogoOn from '../../assets/images/clientesLogoOn.svg';
import cobrancasLogoOff from '../../assets/images/cobrancasLogoOff.svg';
import cobrancasLogoOn from '../../assets/images/cobrancasLogoOn.svg';
import homeLogoOff from '../../assets/images/homeLogoOff.svg';
import homeLogoOn from '../../assets/images/homeLogoOn.svg';
import botaoFiltro from '../../assets/mainImages/botaoFiltro.svg';
import CardCliente from '../../componentsSprint2/CardCliente';
import Header from '../../componentsSprint2/Header/index';
import ModalCadastro from '../../componentsSprint2/ModalCadastroCliente/index';
import TabelaClientes from '../../componentsSprint2/TabelaClientes/index';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import './styles.css';

function Clientes() {

    const navigate = useNavigate();
    const [homeState, setHomeState] = React.useState('clientes');
    const [inps, setInps] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [clientsState, setClients] = React.useState([]);
    const [modalSucessoCliente, setModalSucessoCliente] = React.useState(false);
    const [modalSucessoCobranca, setModalSucessoCobranca] = React.useState(false);
    const [paginaCliente, setPaginaCliente] = React.useState(false);
    const [clienteSelecionadoState, setClienteSelecionadoState] = React.useState([]);
    const [ modalClienteState, setModalClienteState] = React.useState('cadastro');
    const [modalSucessoCobrancaEditada, setModalSucessoCobrancaEditada] = React.useState('cadastrada');
    const [modalRecusaCobranca, setModalRecusaState] = React.useState(false);

    const handleModalRecusaCobranca = () => {
        setModalRecusaState(!modalRecusaCobranca);
        setTimeout(() => {
            setModalRecusaState(false)
          }, 2000)
    
    }
    const createData = (cliente, cpf, email, telefone, status_cliente, bairro, logradouro, complemento, cep, cidade, uf, id) => {
        return { cliente, cpf, email, telefone, status_cliente, bairro, logradouro, complemento, cep, cidade, uf, id };
    }
    const rows = [];
    
    const handlePaginaCliente = () => {
        setPaginaCliente(!paginaCliente)

    }
    const handleOpen = () => {
        setOpen(true)
        setModalClienteState('cadastro')

    }
    const handleClose = () => {
        setOpen(false)
       
    }
    const abreModalFechaDetalhes = () =>{
        setPaginaCliente(false)
        setOpen(true)
        setModalClienteState('editar')
    }
    const handleTipoModalSucessoCobranca = (tipo) => {
        setModalSucessoCobrancaEditada(tipo)
        
    }

    const getClients = async () => {
        let localClients = ''
        const clients = await api.get('/cliente');
        localClients = clients.data
        setClients(localClients);
        

    }

    clientsState.map((cliente) => {
        return (
            rows.push(createData(cliente.nome_cliente, cliente.cpf, cliente.email, cliente.telefone, cliente.status_cliente, cliente.bairro, cliente.logradouro, cliente.complemento, cliente.cep, cliente.cidade, cliente.estado, cliente.id))
        )
    })

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


    useEffect(() => { getClients() }, [modalSucessoCliente])




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




    return (
        <UserContext.Provider value={{

            handleModalSucessoCliente,
            handleModalRecusaCobranca,
            handleModalSucessoCobranca,
            handlePaginaCliente,
            handleOpen,
            handleClose,
            handleTipoModalSucessoCobranca,

            setModalSucessoCobrancaEditada,
            setClienteSelecionadoState,

            clienteSelecionadoState,
            modalClienteState,
            modalSucessoCobrancaEditada,
             modalRecusaCobranca,
           
            open,
             abreModalFechaDetalhes,
             
             
             inps,
             setInps,
             rows,
             paginaCliente,
                          
        }}>
            <div className='main-container-home'>


                <div className='container1-home'>
                    <div className='button-container'>


                        <button style={{ color: homeState === 'home' ? '#DA0175' : '#343447', borderRight: homeState === 'home' ? ' 2px solid #DA0175' : 'none', display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: 18, paddingRight: 18 }} onClick={handleHomeState}>
                            <img src={homeState === 'home' ? homeLogoOn : homeLogoOff} alt='img'></img>
                            Home
                        </button>


                        <button style={{ color: homeState === 'clientes' ? '#DA0175' : '#343447', marginTop: 81, marginBottom: 81, borderRight: homeState === 'clientes' ? ' 2px solid #DA0175' : 'none' }} onClick={handleClientesState}>
                            <img src={homeState === 'clientes' ? clientesLogoOn : clientesLogoOff} alt='img'></img>
                            Clientes
                        </button>

                        <button style={{ color: homeState === 'cobrancas' ? '#DA0175' : '#343447', marginLeft: -9, borderRight: homeState === 'cobrancas' ? ' 2px solid #DA0175' : 'none' }} onClick={handleCobrancasState}>
                            <img src={homeState === 'cobrancas' ? cobrancasLogoOn : cobrancasLogoOff} alt='img'></img>
                            Cobranças
                        </button>

                    </div>

                </div>


                <div className='container2-home'>

                    <Header
                    ></Header>

                    <div className='clientes-title-btn-input'>

                        <div className={!paginaCliente ? 'logo-title' : 'logo-title-cliente'}>

                            <img src={clientesLogoOff} alt='clientes-icone'></img>{!paginaCliente ? <h2 className='cliente-title'>Clientes</h2> : <h1 className='cliente-selecionado-title'>{clienteSelecionadoState.cliente}</h1>
                            }
                        </div>

                        {!paginaCliente && <div className='btn-input'>

                            <ModalCadastro
                            ></ModalCadastro>

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
                        }

                    </div>


                    <div className='container-tabelas-clientes'>

                        <div className='tabelas2-container'>

                            <div className='tabela-container2'>

                                {!paginaCliente ? <TabelaClientes
                                    rows={rows}
                                >
                                </TabelaClientes>
                                    : <CardCliente
                                    ></CardCliente>
                                }

                            </div>

                        </div>
                    </div>
                    {modalSucessoCliente &&
                        <div className='modal-sucesso-cadastro-cliente'>
                            <img src={checkedCliente} alt='checked'></img>
                            {modalClienteState === 'cadastro' ? <p>Cadastro concluído com sucesso</p> : <p>Edições concluídas com sucesso</p>}
                            
                            <img src={closed} alt='close' className='close-cliente'
                                onClick={handleModalSucessoCliente}>

                            </img>

                        </div>
                    }
                    {modalSucessoCobranca &&
                        <div className='modal-sucesso-cadastro-cliente'>
                            <img src={checkedCliente} alt='checked'
                            ></img>
                        
                            <p>Cobrança cadastrada com sucesso</p>
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

export default Clientes;