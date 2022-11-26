import React, { useContext, useEffect, useState } from 'react';
import closed from '../../assets/closed.svg';
import iconeModalRecusaCobranca from '../../assets/iconeModalRecusaCobranca.svg';
import checkedCliente from '../../assets/images/checkedCliente.svg';
import iconEditarVerde from '../../assets/modalCadastroImagens/iconEditarVerde.svg';
import redClosed from '../../assets/redClosed.svg';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import formataTelefone from '../../utils/formataTelefone';
import BotaoDinamico from '../BotaoDinamico';
import ModalCadastroCobranca from '../ModalCadastroCobranca';
import TabelaCobrancasCliente from '../TabelaCobrancasCliente';
import './style.css';

const CardCliente = () => {
    const { clienteSelecionadoState, handleModalSucessoCobranca, modalSucessoCobranca, abreModalFechaDetalhes, modalSucessoCliente, modalClienteState, handleModalSucessoCliente,  modalRecusaCobranca, handleModalRecusaCobranca,modalSucessoCobrancaEditada,  } = useContext(UserContext);

    const [ cobrancasClienteState, setCobrancasClienteState,  ] = useState([]);
 

    const createData = ( valor, dataVencimento, status_cobranca, descricao, id) => {
        return { valor, dataVencimento, status_cobranca, descricao , id };
    }
    const rows = [];
   



    const getCobrancasCliente = async () => {
        let localCobrancas = ''
        const cobrancas = await api.get('/cobranca');
        localCobrancas = cobrancas.data
        setCobrancasClienteState(localCobrancas);
     
     
        
    }

    cobrancasClienteState.map((cobranca) => {
        if( cobranca.nome_cliente === clienteSelecionadoState.cliente)
        return (
            rows.push(createData( cobranca.valor, cobranca.vencimento, cobranca.status_cobranca, cobranca.descricao, cobranca.id))
        )
        else return null
    })

    useEffect(() => {getCobrancasCliente()},[modalSucessoCliente,modalSucessoCobranca] )
    return (
        <div className='card-cliente-main-container'>
            <div className="card-cliente">
                <div className='main-cliente-info-container'>
                    <div className="card-cliente-titulo-btn-container">
                        <h2>Dados do cliente</h2>
            
                    </div>
                    <div className='dados-cliente-linha1' >
                        <div className='infos-linha-container-main'>
                            <div className='infos-linha-container' >
                                <span className='span-title'>E-mail</span>
                                <span className='span-value'>{clienteSelecionadoState.email}</span>
                            </div>
                            <div className='infos-linha-container'>
                            <span className='span-title'>Endereço</span>
                            <span className='span-value'>{clienteSelecionadoState.logradouro}</span>
                        </div>
                        </div>
                        <div className='infos-linha-container-main'>
                            <div className='infos-linha-container'>
                                <span className='span-title'>Telefone</span>
                                <span className='span-value'>{formataTelefone(clienteSelecionadoState.telefone)}</span>
                            </div>
                            <div className='infos-linha-container'>
                            <span className='span-title'>Bairro</span>
                            <span className='span-value'>{clienteSelecionadoState.bairro}</span>
                        </div>
                        </div>
                        <div className='infos-linha-container-main'>
                            <div className='infos-linha-container'>
                                <span className='span-title'>CPF</span>
                                <span className='span-value'>{clienteSelecionadoState.cpf}</span>
                            </div>
                            <div className='infos-linha-container'>
                            <span className='span-title'>Complemento</span>
                            <span className='span-value'>{clienteSelecionadoState.complemento}</span>
                        </div>
                        </div>
            
                    </div>
                </div>
            
                <div className='dados-cliente-linha2' >
            
              
                 
                      <BotaoDinamico
                      textoBotao={'Editar Cliente'}
                      img={iconEditarVerde}
                      bGcolor={'#F2F2F2'}
                      fontFamily={'Nunito'}
                      fontWeight={'400'}
                        fontSize={'18px'}
                        lineHeight={'25px'}
                        color={'#0E8750'}
                        onClick={() => abreModalFechaDetalhes()}
                      ></BotaoDinamico>
           
            
            
                   <div className='container-flex'>
                       <div className='infos-linha-container'>
                            <span className='span-title'>CEP</span>
                            <span className='span-value'>{clienteSelecionadoState.cep}</span>
                        </div>
                        <div className='infos-linha-container'>
                            <span className='span-title'>Cidade</span>
                            <span className='span-value'>{clienteSelecionadoState.cidade}</span>
                        </div>
                        <div className='infos-linha-container'>
                            <span className='span-title'>UF</span>
                            <span className='span-value'>{clienteSelecionadoState.uf}</span>
                        </div>
                        </div>
                   </div>
               
            </div>
            <div
            style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', padding: '10px', borderRadius: '30px', marginTop: '20px', flexDirection: 'column'}}
            ><div
            style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', padding: '10px', borderRadius: '30px', marginTop: '20px', }}
           
            >
                
                    <h6  className='titulo-cliente-tabela-cobrancas'>Cobranças do Cliente</h6>
                    <ModalCadastroCobranca
                    ></ModalCadastroCobranca>
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
                      {modalSucessoCliente &&
                        <div className='modal-sucesso-cadastro-cliente'>
                            <img src={checkedCliente} alt='checked'></img>
                            {modalClienteState === 'cadastro' ? <p>Cadastro concluído com sucesso</p> : <p>Edições concluídas com sucesso</p>}
                            
                            <img src={closed} alt='close' className='close-cliente'
                                onClick={handleModalSucessoCliente}>

                            </img>

                        </div>
                    }
                              { modalRecusaCobranca &&         <div className='modal-recusa-deletar-cobranca'
                              style={{zIndex: '1000'}}
                        >
                            <img src={iconeModalRecusaCobranca} alt='checked'
                            ></img>
                            <p>Esta cobranca não pode ser excluída!</p>

                            <img src={redClosed} alt='close' className='pointer'
                                onClick={handleModalRecusaCobranca}>

                            </img>

                        </div> }
            </div>
                  <TabelaCobrancasCliente
                rows={rows}
                />
            </div>
         
        </div>
    )
}

export default CardCliente