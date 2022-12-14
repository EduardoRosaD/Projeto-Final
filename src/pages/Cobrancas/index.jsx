import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import closed from '../../assets/closed.svg';
import iconeModalRecusaCobranca from '../../assets/iconeModalRecusaCobranca.svg';
import checkedCliente from '../../assets/images/checkedCliente.svg';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import botaoFiltro from '../../assets/mainImages/botaoFiltro.svg';
import redClosed from '../../assets/redClosed.svg';
import Sidebar from '../../components/SideBar/index';
import Header from '../../componentsSprint2/Header/index';
import TabelaCobrancas from '../../componentsSprint2/TabelaCobrancas/index';
import ChargesHeader from '../../components/Cobrancas/chargesHeader';
import api from '../../services/api';
import './styles.css';

function Cobrancas() {
    const navigate = useNavigate();
    // const [homeState, setHomeState] = React.useState('cobrancas');

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
        if (modalRecusaCobranca === true) {
            setModalRecusaState(!modalRecusaCobranca)
        }
    }

    cobrancasState.map((cobranca) => {
        return (
            rows.push(createData(cobranca.nome_cliente, cobranca.valor, cobranca.vencimento, cobranca.status_cobranca, cobranca.descricao, cobranca.id))
        )
    })




    useEffect(() => { getCobrancas() }, [effectActivate])




    // const handleHomeState = () => {
    //     setHomeState('home')
    //     navigate('/home')
    // }
    // const handleClientesState = () => {
    //     setHomeState('clientes')
    //     navigate('/clientes')
    // }
    // const handleCobrancasState = () => {
    //     setHomeState('cobrancas')
    //     navigate('/cobrancas')
    // }
    const handleTipoModalSucessoCobranca = (tipo) => {
        setModalSucessoCobrancaEditada(tipo)
        console.log('teste edit')
    }

    return (

        <MainContainer>

            <Sidebar />

            <ContentContainer>

                <Header
                ></Header>

               <ChargesHeader/>


            </ContentContainer>

        </MainContainer >
    )
}

export default Cobrancas;

const MainContainer = styled.div`
   display: flex;
    min-height: 100%;
    height: 100vh;
`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
background-color: #F8F8F9;
`