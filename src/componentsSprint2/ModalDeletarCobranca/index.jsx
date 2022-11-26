import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './styles.css';
import botaoExcluirCobranca from '../../assets/modalCadastroImagens/botaoExcluirCobranca.svg';
import closed from '../../assets/closed.svg';
import avisoDeletarCobranca from '../../assets/avisoDeletarCobranca.svg';
import naoBtn from '../../assets/naoBtn.svg';
import simBtn from '../../assets/simBtn.svg';
import api from '../../services/api';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: "100%",
  height: "55%",
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 0,
  p: 4,
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
};

export default function ModalDeletarCobranca({cobrancaId, cobrancaStatus}) {

    const { getCobrancas, setModalSucessoCobrancaEditada, handleModalSucessoCobranca, handleModalRecusaCobranca } = useContext(UserContext);

  const [openModalDeletarCobranca, setOpenModalDeletarCobranca] = React.useState(false);
  const handleOpen = (status) => {
    if( status !== 'pendente'){
     return  handleModalRecusaCobranca()
    }
    setOpenModalDeletarCobranca(true);
  }
  const handleClose = () => setOpenModalDeletarCobranca(false);

  const deletarCobranca = async (e) => {
    e.preventDefault();

    try {  await api.delete(`/cobranca/${cobrancaId}`)
    handleClose();
    getCobrancas()
    handleModalSucessoCobranca()
    setModalSucessoCobrancaEditada('deletada')

      
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div>
      <Button onClick={()=> handleOpen(cobrancaStatus)}><img src={botaoExcluirCobranca} alt='botao-excluir-cobranca'></img></Button>
      <Modal
        open={openModalDeletarCobranca}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <img src={closed} alt='close-icon'
            className='close pointer'
            onClick={handleClose}
            style={{position: 'absolute', top: 30, right: 30, margin: 10}}
            ></img>
            <img src={avisoDeletarCobranca}
            style={{width: '50%', height: '50%', }}
            alt='aviso-alerta'></img>
          <Typography id="modal-modal-title-deletar-cobranca" variant="h6" component="h2"
          >
          Tem certeza que deseja excluir esta cobrança?   
                 </Typography>
           <form onSubmit={deletarCobranca}
            className='botao-deletar-cobranca-container'>

           <Button
           onClick={handleClose}
           type={'button'}
           ><img src={naoBtn} alt='nao-botao'></img></Button>

           <Button
           type={'submit'}
           ><img src={simBtn} alt='sim-botao'></img></Button>
           </form>
      
        </Box>
      </Modal>
    </div>
  );
}
