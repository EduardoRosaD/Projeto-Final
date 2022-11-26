import { Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import bolaCinza from '../../assets/images/bolaCinza.svg';
import checkedCobranca from '../../assets/images/checkedCobranca.svg';
import criarCobrancaIcon from '../../assets/images/criarCobrancaIcon.svg';
import papelIcon from '../../assets/images/papelIcon.svg';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import BotaoDinamico from '../BotaoDinamico';
import './styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 770,
  bgcolor: 'background.paper',
  border: '0px solid #ffff',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  display: 'flex',
  padding:  10,
}



export default function ModalCadastrarCobranca({  nome_cliente , tipoTabela, row }) {

const { setModalSucessoCobrancaEditada, clienteSelecionadoState, handleModalSucessoCobranca  } = useContext(UserContext)

  const [openCobrancaModal, setOpenCobrancaModal] = React.useState(false);

 
  const [errorDescricao, setErrorDescricao] = React.useState(false)
  const [errorVencimento, setErrorVencimento] = React.useState(false)
  const [errorValor, setErrorValor] = React.useState(false)
  const [cobrancaEstado, setCobrancaEstado] = React.useState('paga')
  const handleOpen = () => {
    setOpenCobrancaModal(true)
    
   
  }
  const handleClose = () => {
    setOpenCobrancaModal(false)
  }
  const localCliente = clienteSelecionadoState
  console.log(localCliente)
  const [modalFormCadastro, setModalForm] = React.useState({
    nome_cliente: clienteSelecionadoState !== undefined ? clienteSelecionadoState.cliente : row.cliente,
    descricao: '',
    vencimento: '',
    valor: '',
    status_cobranca: cobrancaEstado,
    cliente_id: localCliente.id,

  });
  console.log(clienteSelecionadoState)
  const [formErrors, setFormErros] = React.useState({
    errorDescricao: '',
    errorVencimento: '',
    errorValor: '',

  })
  const handleCobrancaEstado = ()=>{
    if(cobrancaEstado === 'paga'){
      setCobrancaEstado('pendente')
     setModalForm({...modalFormCadastro, status_cobranca: 'pendente'})
    
    }else{
      setCobrancaEstado('paga')
       setModalForm({...modalFormCadastro, status_cobranca: 'paga'})
       
    }
 }

  function handleChange(e) {
   
    if (e.target.name === 'descricao') setErrorDescricao(false)
    if (e.target.name === 'vencimento') setErrorVencimento(false)
    if (e.target.name === 'valor') setErrorValor(false)


    setModalForm({ ...modalFormCadastro, [e.target.name]: e.target.value });

  }




  async function onSubmit(e) {

    e.preventDefault()

   console.log(modalFormCadastro)


    if (modalFormCadastro.descricao === '' || modalFormCadastro.descricao === undefined) {
      setErrorDescricao(true)
      setFormErros({ ...formErrors, errorDescricao: 'Preencha o campo descricao' })
      return
    }
    if (modalFormCadastro.vencimento === '' || modalFormCadastro.vencimento === undefined) {
      setErrorVencimento(true)
      setFormErros({ ...formErrors, errorVencimento: 'Preencha o campo vencimento' })
      return
    }

    if (modalFormCadastro.valor === '' || modalFormCadastro.valor === undefined) {
      setErrorValor(true)
      setFormErros({ ...formErrors, errorValor: 'Preencha o campo valor' })
      return
    }


    try {

  

       await api.post('cobranca', modalFormCadastro)
      



      setModalForm({nome_cliente: nome_cliente, descricao: '', vencimento: '', valor: ''})
      handleClose()
      handleModalSucessoCobranca()
      setModalSucessoCobrancaEditada('cadastrada')



    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div >

      { tipoTabela === 'todosClientes' ?   <img src={criarCobrancaIcon} alt='cobranca-icon'
        onClick={handleOpen}
        class='close'></img>
        : <BotaoDinamico onClick={handleOpen} textoBotao='+ Nova Cobrança'
        bGcolor = { '#DA0175 !important'}
        minWidth = { '165px !important' }
        color= { '#F8F8F9 !important' }
        fontSize = { '14px !important' }
        fontWeight = { '400 !important' }
        fontFamily = { 'Nunito !important' }
        />}
      

    

      <Modal
        open={openCobrancaModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <form onSubmit={onSubmit}
            className='form-modal'>
          
            <div className='title-logo-container'>
              <Typography id="modal-modal-title-cobranca" variant="h4" component="h1"
              style={{marginBottom: 60}}>
                Cadastro de Cobrança
              </Typography>
              <img className='cadastro-icon' src={papelIcon} alt='clientes-logo'></img>
            </div>
            <div>
              <label to='modalipt1' className='card__label'>Nome*</label>
              <Input
                id='modalipt1'
                className='modalipt'
                type='text'
                value={modalFormCadastro.nome_cliente}
                onChange={handleChange}
                name={'nome_cliente'}
                sx={{
                  border:  '1px solid #D0D5DD', width: '440px', height: 53, borderRadius: 1.4, marginBottom: 1, '&:before': {
                    borderBottom: 'none !important'
                  }, '&:after': {
                    borderBottom: 'none !important'
                  },
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  padding: '10px 14px',
                }}
                focused={false}


              >
              </Input>
            

            </div>

            <div>
              <label to='modalipt2' className='card__label '
              >Descrição*</label>
              <Input
                id='modalipt2'
                className='modalipt'
                type='text'
                placeholder='Digite a descrição'
                onChange={(e) => handleChange(e)}
                name={'descricao'}
                value={modalFormCadastro.descricao}
                sx={{
                  border: errorDescricao ? '1px solid red' : '1px solid #D0D5DD', height: 120, width: '440px', borderRadius: 1.4, '&:before': {
                    borderBottom: 'none !important'
                  }, '&:after': {
                    borderBottom: 'none !important'
                  },
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  padding: '0px 14px 80px 14px', marginBottom: '10px'
                }}
                focused={false}
              >
              </Input>
              {errorDescricao && <span className='errorMessage'>{formErrors.errorDescricao}</span>}


            </div>
            <div className='modal-edt-container'>

              <div className='label-container'>
                <label to='vencimento' className='card__label'>Vencimento:*</label>
                <TextField
                  placeholder='Digite a data de vencimento'
                  className='modalipt'
                  type='date'
                  value={modalFormCadastro.vencimento}
                  onChange={(e) => handleChange(e)}
                  name={'vencimento'}
                  focused={false}
                  sx={{ height: 45, borderRadius: '10px',  marginBottom: '15px', border : errorVencimento ? '1px solid red' : '1px solid #D0D5DD', }}
                ></TextField>
                {errorVencimento && <span className='errorMessage'>{formErrors.errorVencimento}</span>}

              </div>

              <div className='label-container'>
                <label to='valor' className='card__label'>Valor (R$):*</label>
                <TextField
                  placeholder='Digite o valor'
                  type='number'
                  onChange={(e) => handleChange(e)}
                  name={'valor'}
                  focused={false}
                  value={modalFormCadastro.valor}
                  sx={{ height: 45, marginBottom: '15px', border : errorValor ? '1px solid red' : '1px solid #D0D5DD', borderRadius: '10px', }}
                ></TextField>
                {errorValor && <span className='errorMessage'>{formErrors.errorValor}</span>}
              </div>

            </div>

                <div className='cadastro-modal-container'>
                  <label className='card__label'>Status:*</label>
                  <div className='cobrancaStatus close'><img alt='cobranca-status' src={cobrancaEstado === 'paga' ? checkedCobranca : bolaCinza }
                  onClick={handleCobrancaEstado}
                  ></img><span>Cobrança Paga</span></div>
                  <div className='cobrancaStatus close'><img alt='cobranca-status' src={cobrancaEstado !== 'paga' ? checkedCobranca : bolaCinza }
                  onClick={handleCobrancaEstado}
                  ></img><span>Cobrança Pendente</span></div>
                </div>



            <div className='btns-cadastro-cobranca-container'>
           
              <BotaoDinamico
              bGcolor = {'#F5F5F5'}
              color={'#0E8750'}
              onClick={handleClose}
              textoBotao={'Cancelar'}        
              minWidth={'168px !important'}
              borderRadius={'10px'}
              fontFamily={'Nunito !important'}
              fontSize={'16px !important'}
              fontWeight={'400 !important'}
              lineHeight={'25px !important'}
              >
              </BotaoDinamico>

             
              <BotaoDinamico
              type={'submit'}
              textoBotao={'Aplicar'}
              bGcolor={'#DA0175'}
              minWidth={'168px !important'}
              borderRadius={'10px'}
              fontFamily={'Nunito !important'}
              fontSize={'16px !important'}
              fontWeight={'400 !important'}
              lineHeight={'25px !important'}
            
              >
              </BotaoDinamico>

            </div>


          </form>






        </Box>
      </Modal>
    </div>
  );
}

