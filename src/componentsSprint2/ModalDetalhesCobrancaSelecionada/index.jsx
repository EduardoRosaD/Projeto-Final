import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import cobrancasLogoOff from '../../assets/images/cobrancasLogoOff.svg';
import UserContext from '../../context/UserContext';
import formatarData from '../../utils/formatarData';
import BotaoFecharModalDetalhes from '../BotaoFecharModalDetalhesCobranca';
import './styles.css';

import contaPaga from '../../assets/modalCadastroImagens/contaPaga.svg';
import contaPendente from '../../assets/modalCadastroImagens/contaPendente.svg';
import contaVencida from '../../assets/modalCadastroImagens/contaVencida.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalDetalhesCobrancaSelecionada({nome}) {


  const {  cobrancaSelecionadaState,  openCobrancaSelecionada, handleOpen, handleClose } = useContext(UserContext);

  console.log(cobrancaSelecionadaState)
  return (
    <div>
      <Button
      style={{fontFamily: 'Nunito',
      fontStyle: 'normal',
      fontHeight: 400,
      fontSize: '14px',
      lineHeight: '40px',
      color: '#6E6E85',
      textTransform: 'none',
     
      
    }}
      onClick={ handleOpen}>{nome}</Button> 


      <Modal
        open={openCobrancaSelecionada}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='logo-titulo-container'>
          <img src={cobrancasLogoOff} alt='cobrancaOff-logo'></img>
              <Typography id="modal-modal-title-cobranca" variant="h6" component="h1">
               Detalhes da Cobrança
              </Typography>
          </div>
          
         <BotaoFecharModalDetalhes
         handleClose={handleClose}
         ></BotaoFecharModalDetalhes>



          <div className='detalhes-cobranca-container'>

              <div className='titulo-valor-container'>
                <h2>Nome</h2>
                  <Typography variant='h6' component='h3'>
                    {cobrancaSelecionadaState.nome_cliente}
                  </Typography>
              </div>

                <div className='titulo-valor-container'>
                    <h2>Descrição</h2>
              <Typography id="modal-modal-description-cobranca" sx={{ mt: 2 }}>
               {cobrancaSelecionadaState.descricao}
              </Typography>
                </div>

                <div className='dupla-titulo-valor-container' >

                <div className='titulo-valor-container'>

                <h2>Vencimento</h2>
                  <Typography variant='h6' component='h3'>
                    {formatarData(cobrancaSelecionadaState.dataVencimento)}
                  </Typography>
              </div>
                <div className='titulo-valor-container'>
                    <h2>Valor</h2>
              <Typography id="modal-modal-description-cobranca" sx={{ mt: 2 }}>
               RS {(cobrancaSelecionadaState.valor/100).toFixed(2)}
              </Typography>
                </div>
                
                </div>

                

                <div className='dupla-titulo-valor-container'>
                    <div className='titulo-valor-container'>
                    <h2>ID Cobranças </h2>
                      <Typography variant='h6' component='h3'>
                        {cobrancaSelecionadaState.id}
                      </Typography>
                                  </div>
                    <div className='titulo-valor-container'>
                        <h2>Status</h2>
                                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                   <img src={cobrancaSelecionadaState.status_cobranca === "Paga" ? contaPaga : cobrancaSelecionadaState === "Prevista" ?contaPendente : contaVencida } alt='status-cobranca'></img>
                                  </Typography>
                    </div>
                </div>



          </div>
        </Box>
      </Modal>
    </div>
  );
}
