import { Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import closed from '../../assets/closed.svg';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import Botao from '../../components/Cadastro/Botao';
import UserContext from '../../context/UserContext';
import api from '../../services/api';
import formatarCpf from '../../utils/formataCpf';
import formataTelefone from '../../utils/formataTelefone';
import validaNome from '../../utils/validaNome';
import verificaCpf from '../../utils/verificaCpf';
import BotaoDinamico from '../BotaoDinamico';
import './styles.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 491,
  height: '80%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  display: 'flex',
  justifyContent: 'center',
};



export default function ModalCadastroEditCliente() {


  const { handleModalSucessoCliente, handleOpen, open, handleClose, modalClienteState, clienteSelecionadoState } = useContext(UserContext);


  console.log(clienteSelecionadoState)

  const [errorNome, setErrorNome] = React.useState(false)
  const [errorEmail, setErrorEmail] = React.useState(false)
  const [errorCpf, setErrorCpf] = React.useState(false)
  const [errorTelefone, setErrorTelefone] = React.useState(false)
  
  
  
  const [modalFormCadastro, setModalForm] = React.useState({
    nome_cliente: clienteSelecionadoState !== null ? clienteSelecionadoState.cliente : '',
    email:  clienteSelecionadoState !== null ? clienteSelecionadoState.email : '',
    cpf:  clienteSelecionadoState !== null ? clienteSelecionadoState.cpf : '',
    telefone: clienteSelecionadoState !== null ? clienteSelecionadoState.telefone : '',
    complemento: clienteSelecionadoState !== null ? clienteSelecionadoState.complemento : '',
    cep:  clienteSelecionadoState !== null ? clienteSelecionadoState.cep : '',
    bairro: clienteSelecionadoState !== null ? clienteSelecionadoState.bairro : '',
    logradouro:  clienteSelecionadoState !== null ? clienteSelecionadoState.logradouro : '',
    cidade: clienteSelecionadoState !== null ? clienteSelecionadoState.cidade : '',
    estado: clienteSelecionadoState !== null ? clienteSelecionadoState.uf : '',
    usuario_id: localStorage.getItem('id'),
  });

  const [formErrors, setFormErros] = React.useState({
    errorNome: '',
    errorEmail: '',
    errorCpf: '',
    errorTelefone: '',
    
  })


  function handleChange(e) {
    
    if (e.target.name === 'nome_cliente') setErrorNome(false)
    if (e.target.name === 'email') setErrorEmail(false)
    if (e.target.name === 'cpf') setErrorCpf(false)
    if (e.target.name === 'telefone') setErrorTelefone(false)
    


    setModalForm({ ...modalFormCadastro, [e.target.name]: e.target.value });
    console.log(e.target.value)
  }




  async function onSubmit(e) {

    e.preventDefault()

 

    if (modalFormCadastro.email === '' || modalFormCadastro.email === undefined) {
      setErrorEmail(true)
      setFormErros({ ...formErrors, errorEmail: 'Preencha o campo email' })
      return
    }
    if (modalFormCadastro.nome_cliente === '' || modalFormCadastro.nome_cliente === undefined) {
      setErrorNome(true)
      setFormErros({ ...formErrors, errorNome: 'Preencha o campo nome' })
      return
    }
    if ( validaNome(modalFormCadastro.nome_cliente) === false ){
      setErrorNome(true)
      setFormErros({ ...formErrors, errorNome: 'Nomes não devem conter algarismos ' })
      return
    }
    if (modalFormCadastro.cpf === '' || modalFormCadastro.cpf === undefined) {
      setErrorCpf(true)
      setFormErros({ ...formErrors, errorCpf: 'Preencha o campo cpf' })
      return
    }
    if(modalFormCadastro.cpf.length > 0){
    if(verificaCpf(modalFormCadastro.cpf) === false){
      setErrorCpf(true)
      setFormErros({ ...formErrors, errorCpf: 'CPF inválido' })
      return 
    }
  }
    if (modalFormCadastro.telefone === '' || modalFormCadastro.telefone === undefined) {
      setErrorTelefone(true)
      setFormErros({ ...formErrors, errorTelefone: 'Preencha o campo telefone' })
      return
    }

    if ( modalFormCadastro.telefone.length < 15 ){
      setErrorTelefone(true)
      setFormErros({ ...formErrors, errorTelefone: 'Telefone inválido' })
      return
    }
 

    try {


      const cpfRepetido = await api.post('verificarCpfCliente', { cpf: modalFormCadastro.cpf })
      if (cpfRepetido.data) { 
        setErrorCpf(true)  
        setFormErros({ ...formErrors, errorCpf: 'CPF já cadastrado' })
          return 
        }
      const emailValido = await api.post('emailValidoCliente', { email: modalFormCadastro.email })

      if (!emailValido.data) {

        setErrorEmail(true)
        setFormErros({ ...formErrors, errorEmail: 'Email Inválido' })
        return
      }
      
      const emailRepetido = await api.post('verificarEmailCliente', { email: modalFormCadastro.email})

      if ( emailRepetido.data){
        setErrorEmail(true)
        setFormErros({ ...formErrors, errorEmail: 'Email já cadastrado' })
        return 
      }

        modalClienteState === 'cadastro' ? await api.post('cliente', modalFormCadastro) : await api.put(`cliente/${clienteSelecionadoState.id}`, modalFormCadastro) 

      setModalForm([])
      handleClose()
      handleModalSucessoCliente()


    } catch (error) {
      console.log(error)
     

    

    }

  }

  return (
    <div >
         <Botao
          handleOpen={handleOpen}
        width={'266px'}
        nome={'+ Adicionar cliente'}
      ></Botao>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <form onSubmit={onSubmit}
            className='form-modal'>
            <img className='closedImg-cadastro close' src={closed}
              onClick={handleClose} alt='fecharLogo' 
              ></img>
            <div className='title-logo-container-cliente'>
           
             { modalClienteState === 'cadastro' ?  <Typography id="modal-modal-title-cadastro" variant="h4" component="h1">
                Cadastro do Cliente
              </Typography> :  <Typography id="modal-modal-title-cadastro" variant="h4" component="h1">
                Editar Cliente
              </Typography>}
              <img className='clientes-icon' src={clientesLogoOff} alt='clientes-logo'></img>
            </div>
            <div>
              <label to='modalipt1' className='card__label'>Nome*</label>
              <Input
                id='modalipt1'
                className='modalipt'
                type='text'
                placeholder='Digite o nome'
                onChange={(e) => handleChange(e)}
                value={modalFormCadastro.nome_cliente}
                name={'nome_cliente'}
                sx={{
                  border: errorNome ? '1px solid red' : '1px solid #D0D5DD', width: '435px', height: 44, borderRadius: 1.4, marginBottom: 1, '&:before': {
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
              >E-mail*</label>
              <Input
                id='modalipt2'
                className='modalipt'
                type='text'
                placeholder='Digite o email'
                onChange={(e) => handleChange(e)}
                name={'email'}
                value={modalFormCadastro.email}
                sx={{
                  border: errorEmail ? '1px solid red' : '1px solid #D0D5DD', height: 44, width: '435px', borderRadius: 1.4, '&:before': {
                    borderBottom: 'none !important'
                  }, '&:after': {
                    borderBottom: 'none !important'
                  },
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  padding: '10px 14px', marginBottom: '10px'
                }}
                focused={false}
              >
              </Input>
              {errorEmail && <span className='errorMessage'>{formErrors.errorEmail}</span>}


            </div>
            <div className='modal-edt-container'>

              <div className='label-container'>
                <label to='cpf' className='card__label'>CPF*</label>
                <TextField
                  placeholder='Digite o CPF'
                  className='modalipt'
                  type='text'
                  value={formatarCpf(modalFormCadastro.cpf)}
                  onChange={(e) => handleChange(e)}
                  name={'cpf'}
                  focused={false}
                  sx={{ height: 44, borderRadius: '10px', marginBottom: '5px', border: errorCpf ?'1px solid red' : '1px solid #D0D5DD' }}
                ></TextField>
                {errorCpf && <span className='errorMessage'>{formErrors.errorCpf}</span>}

              </div>

              <div className='label-container'>
                <label to='telefone' className='card__label'>Telefone*</label>
                <TextField
                  placeholder='Digite o Telefone'
                  type='text'
                  onChange={(e) => handleChange(e)}
                  name={'telefone'}
                  focused={false}
                  value={formataTelefone(modalFormCadastro.telefone)}
                  sx={{ height: 44, borderRadius: '10px', marginBottom: '5px', border: errorTelefone ?'1px solid red' : '1px solid #D0D5DD' }}
                ></TextField>
                  {errorTelefone && <span className='errorMessage'>{formErrors.errorTelefone}</span>}

              </div>

            </div>

            <div className='input-senha-edt-container'>

              <div>
                <label to='endereco'>Endereço</label>

                <Input
                  id='endereco'
                  type={'text'}
                  name={'logradouro'}
                  value={modalFormCadastro.logradouro}
                  placeholder={'Digite o endereço'}
                  onChange={(e) => handleChange(e)}
                  sx={{
                    border: '1px solid #D0D5DD', width: '435px', borderRadius: 1.4, height: 44, '&:before': {
                      borderBottom: 'none !important'
                    }, '&:after': {
                      borderBottom: 'none !important'
                    },
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                    padding: '10px 14px',
                    marginTop: '10px',
                    marginBottom: '10px',

                  }}
                />

              </div>


              <label to='complemento'>Complemento</label>
              <Input
                id='complemento'
                type={'text'}
                name={'complemento'}
                value={modalFormCadastro.complemento}
                placeholder={'Digite o complemento'}
                onChange={(e) => handleChange(e)}
                focused={false}
                sx={{
                  border: '1px solid #D0D5DD', width: '435px', borderRadius: 1.4, height: 44, '&:before': {
                    borderBottom: 'none !important'
                  }, '&:after': {
                    borderBottom: 'none !important'
                  },
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  padding: '10px 14px',
                  marginTop: '5px',
                  marginBottom: '5px',

                }}
              />

              <div className='modal-edt-container-cliente'>

                <div className='label-container'>
                  <label to='cep' className='card__label'>CEP</label>
                  <TextField
                    placeholder='Digite o CEP'
                    className='modalipt altura8'
                    type='text'
                    value={modalFormCadastro.cep}
                    onChange={(e) => handleChange(e)}
                    name={'cep'}
                    focused={false}
                    sx={{ height: 44, borderRadius: '10px', border: '1px solid #D0D5DD', marginBottom: '20px' }}
                  ></TextField>

                </div>

                <div className='label-container'>
                  <label to='bairro' className='card__label'>Bairro</label>
                  <TextField
                    placeholder='Digite o Bairro'
                    type='text'
                    className='altura8'
                    value={modalFormCadastro.bairro}
                    onChange={(e) => handleChange(e)}
                    name={'bairro'}
                    focused={false}
                    sx={{ height: 44, borderRadius: '10px', marginBottom: '20px',  border: '1px solid #D0D5DD', }}
                  ></TextField>

                </div>
              </div>

              <div className='modal-edt-container-cliente'>

                <div className='label-container'>
                  <label to='cidade' className='card__label'>Cidade</label>
                  <TextField
                    placeholder='Digite a cidade'
                    className='modalipt altura8'
                    type='text'
                    value={modalFormCadastro.cidade}
                    onChange={(e) => handleChange(e)}
                    name={'cidade'}
                    focused={false}
                    sx={{ height: 40, borderRadius: '10px', marginBottom: '0px', width: 260,  border: '1px solid #D0D5DD',}}
                  ></TextField>

                </div>

                <div className='label-container'>
                  <label to='uf' className='card__label'>UF</label>
                  <TextField
                  className='altura8'
                    placeholder='Digite a UF'
                    type='text'
                    value={modalFormCadastro.estado}
                    onChange={(e) => handleChange(e)}
                    name={'estado'}
                    focused={false}
                    sx={{ height: 44, borderRadius: '10px', marginTop: '0px', width: '140px', border: '1px solid #D0D5DD', }}
                  ></TextField>

                </div>

              </div>
            </div>

            <div className='btns-cadastro-cliente-container'>
    
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

