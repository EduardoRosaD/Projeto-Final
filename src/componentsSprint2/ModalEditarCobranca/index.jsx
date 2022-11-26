import { Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import bolaCinza from '../../assets/images/bolaCinza.svg';
import checkedCobranca from '../../assets/images/checkedCobranca.svg';
import papelIcon from '../../assets/images/papelIcon.svg';
import botaoEditarCobranca from '../../assets/modalCadastroImagens/botaoEditarCobranca.svg';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import formatarDataModal from '../../utils/formatarDataParaModal';
import validaNome from '../../utils/validaNome';
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



export default function ModalEditarCobranca({  cobrancaId,    row }) {

  const { getCobrancas, handleModalSucessoCobranca,  handleTipoModalSucessoCobranca, modalRecusaCobranca,  setModalRecusaState, clienteSelecionadoState } = useContext(UserContext)


  const [openCobrancaModalEditar, setOpenCobrancaModalEditar] = React.useState(false);

  const [errorNome, setErrorNome ] = React.useState(false)
  const [errorDescricao, setErrorDescricao] = React.useState(false)
  const [errorVencimento, setErrorVencimento] = React.useState(false)
  const [errorValor, setErrorValor] = React.useState(false)
 

  const [cobrancaEstado, setCobrancaEstado] = React.useState('paga')
  const handleOpen = () => {
    setOpenCobrancaModalEditar(true)
    if ( modalRecusaCobranca === true){
      setModalRecusaState(!modalRecusaCobranca)
  }
  }
  const handleClose = () => {
    setOpenCobrancaModalEditar(false)
  }

  const [modalFormCadastro, setModalForm] = React.useState({
    nome_cliente: clienteSelecionadoState !== undefined ? clienteSelecionadoState.cliente : row.nome_cliente,
    descricao: row !== undefined ? row.descricao : '',
    vencimento:  row !== undefined ? formatarDataModal(row.dataVencimento) : '',
    valor: row !== undefined ? (row.valor/100).toFixed(2)  : '',
    status_cobranca: 'paga',
    cliente_id: clienteSelecionadoState !== undefined ? clienteSelecionadoState.id :  '',

  });

  const [formErrors, setFormErros] = React.useState({
    errorNome: '',
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
    if ( e.target.name === 'nome_cliente') setErrorNome(false)
    if (e.target.name === 'descricao') setErrorDescricao(false)
    if (e.target.name === 'vencimento') setErrorVencimento(false)
    if (e.target.name === 'valor') setErrorValor(false)


    setModalForm({ ...modalFormCadastro, [e.target.name]: e.target.value });

  }




  async function onSubmit(e) {
    console.log(modalFormCadastro)
    e.preventDefault()
    if (modalFormCadastro.nome_cliente === '') {
      setErrorNome(true)
      setFormErros({ ...formErrors, errorNome: 'Preencha o campo nome!' })
      return 
    }

    if ( modalFormCadastro.nome_cliente !== ''){
      if( validaNome(modalFormCadastro.nome_cliente) === false){
        setErrorNome(true)
        setFormErros({...formErrors, errorNome: 'Nomes não podem conter algarismos'})
        return
      }
    }



    if (modalFormCadastro.descricao === '' || modalFormCadastro.descricao === undefined) {
      setErrorDescricao(true)
      setFormErros({ ...formErrors, errorDescricao: 'Preencha o campo descrição' })
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



      await api.put(`cobranca/${cobrancaId}`, {...modalFormCadastro,
      valor: modalFormCadastro.valor.replace(',','.')*100})
    
     
      
      getCobrancas()
     handleTipoModalSucessoCobranca('editada')
     handleModalSucessoCobranca()
     handleClose()
      setModalForm({nome_cliente:clienteSelecionadoState.cliente, descricao: '', vencimento: '', valor: ''})
      
      
      
    


    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div >



      <img src={botaoEditarCobranca} alt='cobranca-icon'
        onClick={handleOpen}
        class='close'
        style={{ marginTop: '10px !important' }}
        ></img>

      <Modal
        open={openCobrancaModalEditar}
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
                Editar Cobrança
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
                name={'nome_cliente'}
                sx={{
                  border: errorNome ? '1px solid red' : '1px solid #D0D5DD', width: '440px', height: 53, borderRadius: 1.4, marginBottom: 1, '&:before': {
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
              {errorNome && <span className='errorMessage'>{formErrors.errorNome}</span>}
            

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
                  sx={{ height: 45, borderRadius: '10px', marginBottom: '15px', border: errorVencimento ? '1px solid red' : '1px solid #D0D5DD' }}
                ></TextField>
                {errorVencimento && <span className='errorMessage'>{formErrors.errorVencimento}</span>}

              </div>

              <div className='label-container'>
                <label to='valor' className='card__label'>Valor(R$):*</label>
                <TextField
                  placeholder='Digite o valor'
                  type='number'
                  onChange={(e) => handleChange(e)}
                  name={'valor'}
                  value={modalFormCadastro.valor}
                  focused={false}
                  sx={{ height: 45, borderRadius: '10px', marginBottom: '15px', border: errorValor ? '1px solid red' : '1px solid #D0D5DD' }}
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

