import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import checked from '../../assets/checked.svg';
import closed from '../../assets/closed.svg';
import editarLogo from '../../assets/mainImages/editarLogo.svg';
import BotaoSubmit from '../../componentsSprint2/BotaoDinamico';
import api from '../../services/api';
import verificaCpf from '../../utils/verificaCpf';
import './styles.css';
import validaTelefone from '../../utils/validaTelefone';
import validaNome from '../../utils/validaNome';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 491,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  display: 'flex',
};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  display: 'flex',
};

export default function ModalEditarDadosUsuario({ handleOpen, open, handleClose, modalEdtState, setModaEdtlState }) {


 
  
  
  const [errorNome, setErrorNome] = React.useState(false)
  const [errorEmail, setErrorEmail] = React.useState(false)
  const [errorSenha, setErrorSenha] = React.useState(false)
  const [errorConfirmacao, setErrorConfirmacao] = React.useState(false)
  const [errorCpf, setErrorCpf] = React.useState(false)
  const [errorTelefone, setErrorTelefone] = React.useState(false)

  const [senhaRepetida, setSenhaRepetida] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('password');
  const [passwordInput2, setPasswordInput2] = React.useState('password');

  const usuarioNome = localStorage.getItem('usuario')
  const usuarioEmail = localStorage.getItem('email')
  const usuarioCpf = localStorage.getItem('cpf')
  const usuarioTelefone = localStorage.getItem('telefone')


  const [modalForm, setModalForm] = React.useState({
    nome_usuario: usuarioNome,
    email: usuarioEmail,
    senha: '',
    cpf: usuarioCpf !== 'null' ? usuarioCpf : '',
    telefone: usuarioTelefone,
  });


  const [formErrors, setFormErros] = React.useState({
    errorNome: '',
    errorEmail: '',
    errorSenha: '',
    errorConfirmacao: '',
    errorCpf: '',
    errorTelefone: '',
  })



  function handleChange(e) {
    if (e.target.name === 'nome_usuario') setErrorNome(false)
    if (e.target.name === 'email') setErrorEmail(false)
    if (e.target.name === 'senha') setErrorSenha(false)
    if (e.target.name === 'confirmacao') setErrorConfirmacao(false)
    if (e.target.name === 'cpf') setErrorCpf(false)
    if (e.target.name === 'telefone') setErrorTelefone(false)

    setModalForm({ ...modalForm, [e.target.name]: e.target.value });
    console.log(modalForm)
  }


  const handleClickShowPassword = () => {
    setPasswordInput(passwordInput === 'password' ? 'text' : 'password');
  }

  const handleClickShowPassword2 = () => {
    setPasswordInput2(passwordInput2 === 'password' ? 'text' : 'password');
  }

  const handleSenhaRepetida = (e) => {
    if (e.target.name === 'confirmacaoSenha') setErrorConfirmacao(false)
    setSenhaRepetida(e.target.value);

    console.log(senhaRepetida)
  }




  async function onSubmit(e) {

    e.preventDefault()

    if (modalForm.email === '' || modalForm.email === undefined) {
      setErrorEmail(true)
      setFormErros({ ...formErrors, errorEmail: 'Preencha o campo email' })
      return
    }
    if (modalForm.nome_usuario === '' || modalForm.nome_usuario === undefined) {
      setErrorNome(true)
      setFormErros({ ...formErrors, errorNome: 'Preencha o campo nome' })
      return
    }
    if (modalForm.senha === '' || modalForm.senha === undefined) {
      setErrorSenha(true)
      setFormErros({ ...formErrors, errorSenha: 'Preencha o campo senha' })
      return
    }
    if (senhaRepetida === '' || senhaRepetida === undefined) {
      setErrorConfirmacao(true)
      setFormErros({ ...formErrors, errorConfirmacao: 'Preencha o campo confirmação de senha' })
      return
    }
    if (senhaRepetida !== modalForm.senha) {
      setErrorConfirmacao(true)
      setFormErros({ ...formErrors, errorConfirmacao: 'As senhas não conferem' })
      return
    }
    if (modalForm.senha.length < 6) {
      setErrorSenha(true)
      setFormErros({ ...formErrors, errorSenha: 'A senha deve ter no mínimo 6 caracteres' })
      return
    }
    if (modalForm.cpf.length > 0) {
      if (verificaCpf(modalForm.cpf) === false) {
        setErrorCpf(true)
        setFormErros({ ...formErrors, errorCpf: 'CPF inválido' })
        return
      }
    if ( !validaNome(modalForm.nome_usuario) ) {
      setErrorNome(true)
      setFormErros({ ...formErrors, errorNome: 'Nomes não podem conter algoritimos' })
      return
    }
    if ( modalForm.telefone.length > 0 ) {
    if ( !validaTelefone(modalForm.telefone) ) {
      setErrorTelefone(true)
      setFormErros({ ...formErrors, errorTelefone: 'Telefone inválido' })
      return
    }
  }
    }

    try {
      if(modalForm.email !== usuarioEmail){
        const emailValido = await api.post('emailValidoCliente', { email: modalForm.email })
        if (!emailValido.data) {
          setErrorEmail(true)
          setFormErros({ ...formErrors, errorEmail: 'Preencha o campo email corretamente' })
          return
        }
        const emailRepetido = await api.post('verificarEmail', { email: modalForm.email })


        if (emailRepetido.data) {
          setErrorEmail(true)
          setFormErros({ ...formErrors, errorEmail: 'Email já cadastrado' })
          return
        }
      }

 


 


      await api.put('usuario', modalForm)

      setFormErros({})
      setModaEdtlState(false)
      localStorage.setItem('usuario', modalForm.nome_usuario)
      localStorage.setItem('iniciais', modalForm.nome_usuario.substring(0, 1))
      localStorage.setItem('email', modalForm.email)
      localStorage.setItem('cpf', modalForm.cpf)


    } catch (error) {
      alert(error.response.data)
      if (error.response.data === 'email deve ser um email válido') {
        setErrorEmail(true)
        setFormErros({ ...formErrors, errorEmail: 'Preencha o campo email corretamente' })
      }
      console.log(error)
    }

  }

  return (
    <div >
      <Button onClick={handleOpen}
        style={{ minWidth: 0 }}
      ><img src={editarLogo} alt='editar-logo'
      ></img></Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalEdtState ? style : style2}>
          {modalEdtState ?
            <form onSubmit={onSubmit}
              className='form-modal'>
              <img className='closedImg' src={closed}
                onClick={handleClose} alt='fecharLogo'></img>
              <Typography id="modal-modal-title" variant="h4" component="h1">
                Edite seu cadastro
              </Typography>
              <div>
                <label to='modalipt1' className='card__label'>Nome*</label>
                <Input
                  id='modalipt1'
                  className='modalipt'
                  type='text'
                  placeholder='Digite seu nome'
                  onChange={(e) => handleChange(e)}
                  value={modalForm.nome_usuario}
                  name={'nome_usuario'}
                  sx={{
                    border: errorNome ? '1px solid red' : '1px solid #D0D5DD', width: '440px', height: 53, borderRadius: 1.4, marginBottom: 2, '&:before': {
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
                  placeholder='Digite seu email'
                  onChange={(e) => handleChange(e)}
                  name={'email'}
                  value={modalForm.email}
                  sx={{
                    border: errorEmail ? '1px solid red' : '1px solid #D0D5DD', height: 53, width: '440px', borderRadius: 1.4, '&:before': {
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
                  <label to='cpf' className='card__label'>CPF</label>
                  <TextField
                    placeholder='Digite seu CPF'
                    className='modalipt'
                    type='text'
                    value={modalForm.cpf}
                    onChange={(e) => handleChange(e)}
                    name={'cpf'}
                    focused={false}
                    sx={{ height: 40, borderRadius: '10px', marginBottom: '25px' }}
                  ></TextField>
                  {errorCpf && <span className='errorMessage'>{formErrors.errorCpf}</span>}

                </div>

                <div className='label-container'>
                  <label to='telefone' className='card__label'>Telefone</label>
                  <TextField
                    placeholder='Digite seu Telefone'
                    type='text'
                    onChange={(e) => handleChange(e)}
                    name={'telefone'}
                    focused={false}
                    sx={{ height: 40, borderRadius: 5, marginBottom: '25px' }}
                  ></TextField>
     {errorTelefone && <span className='errorMessage'>{formErrors.errorTelefone}</span>}
                </div>

              </div>

              <div className='input-senha-edt-container'>

                <div>   <label to='senha'>Nova senha*</label>

                  <Input
                    id='senha'
                    type={passwordInput}
                    name={'senha'}
                    value={modalForm.senha}
                    placeholder={'Digite sua senha'}
                    onChange={(e) => handleChange(e)}
                    sx={{
                      border: errorSenha ? '1px solid red' : '1px solid #D0D5DD', width: '440px', borderRadius: 1.4, height: 53, '&:before': {
                        borderBottom: 'none !important'
                      }, '&:after': {
                        borderBottom: 'none !important'
                      },
                      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                      padding: '10px 14px',
                      marginBottom: '0px'

                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility"
                          onClick={handleClickShowPassword} >
                          {passwordInput === 'text' ? <Visibility /> : <VisibilityOff />}

                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errorSenha && <span className='errorMessage'>{formErrors.errorSenha}</span>} </div>


                <label to='repitaSenha'>Confirmar senha*</label>
                <Input
                  id='repitaSenha'
                  type={passwordInput2}
                  name={'confirmacaoSenha'}
                  value={senhaRepetida}
                  placeholder={'Repita sua senha'}
                  onChange={(e) => handleSenhaRepetida(e)}
                  focused={false}
                  sx={{
                    border: errorConfirmacao ? '1px solid red' : '1px solid #D0D5DD', width: '440px', borderRadius: 1.4, height: 53, '&:before': {
                      borderBottom: 'none !important'
                    }, '&:after': {
                      borderBottom: 'none !important'
                    },
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                    padding: '10px 14px',

                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility"
                        onClick={(e) => handleClickShowPassword2(e)}   >
                        {passwordInput2 === 'text' ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errorConfirmacao ? <div> <span className='errorMessage'
                >{formErrors.errorConfirmacao}</span>
                  <div style={{ color: 'white' }}>.</div>
                  <div style={{ color: 'white' }}>.</div>
                </div> :
                  <div>
                    <div style={{ color: 'white' }}>.</div>
                    <div style={{ color: 'white' }}>.</div>
                    <div style={{ color: 'white', marginBottom: '40px' }}>.</div>
                  </div>
                }
              </div>


              <BotaoSubmit
              onClick={onSubmit}
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
              </BotaoSubmit>


            </form>
            :
            <div className='cadastro-alterado' >
              <img alt='checkedImg' className='checkedImg' src={checked}></img>
              <Typography id="modal-modal-title" variant="h4" component="h1">Cadastro alterado com sucesso!</Typography>

            </div>


          }


        </Box>
      </Modal>
    </div>
  );
}

