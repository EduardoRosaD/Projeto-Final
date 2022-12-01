import { useState } from 'react';
import React from 'react';
import validaNome from '../utils/validaNome';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function useUserProvider(){
   
   // CADASTRO USUARIO //
const [ signUpState, setSignUpState] = useState({ // Estado manipulador  componentes exibidos  Cadastro usuario
    setlevel: "fundo1",
    btnText: "Entrar",
});
const [activeStep, setActiveStep] = React.useState(0); // Estado manipulador  stepper cadastro usuario

function handleNextSignUp(stepIncrement) {
    setActiveStep((prevActiveStep) => prevActiveStep + stepIncrement); // funcao manipuladora  stepper
}

const  [ userDataState, setUserDataState] = useState({ })// Estado manipulador dados cadastro usuario

const handleSignUpData = (e) => { // funcao manipuladora dos dados do cadastro
    setUserDataState({ ...userDataState, [e.target.name]: e.target.value }); 
}

const [confirmSenhaState, setConfirmSenhaState] = React.useState('');

const handleConfirmSenha = (event) => {
    setConfirmSenhaState(event.target.value);
   
};

async function onSubmitSignUp(e) {
    e.preventDefault()
    if (userDataState.senha === undefined || confirmSenhaState === undefined) {
        return alert('Preencha todas as senhas')
    }
    if (userDataState.senha !== confirmSenhaState) {
        return alert('As senhas não conferem')
    }
    if (userDataState.senha.length < 6) {
        return alert('A senha deve ter no mínimo 6 caracteres')
    }
    try {
         await api.post('usuario', userDataState)

        alert('Usuário cadastrado com sucesso!')
        handleNextSignUp(2)
        setSignUpState({setlevel:"fundo3", btnText:"Ir para Login"})
    } catch (error) {
        console.log(error)
        return alert(error)
    }
}

const formsUserSignUp = {
    title: 'Adicione seus dados',
    inputs: [
        { placeHolder:  "Digite seu Nome", type:  "text", name:  "nome_usuario", label:  "Nome*"},
         { placeHolder:  "Digite seu Email" , type: 'text', name: "email", label:"Email*"},
    ],
}

const handleNextStep = async () => {
    if (userDataState.nome_usuario === undefined || userDataState.email === undefined || userDataState.nome_usuario === '' || userDataState.email === '') {
        return alert('Preencha email e nome!')
    }
    try {
       
        if ( validaNome(userDataState.nome_usuario) === false) {
            return alert('Nomes não podem conter algarismos')
        }
        const emailValido = await api.post('emailValidoCliente', { email: userDataState.email })
        if (!emailValido.data) {
            return alert('Insira um e-mail válido!')
        }
        const emailRepetido = await api.post('verificarEmail', {email : userDataState.email})
        
        if (emailRepetido.data) {
            return alert('E-mail já cadastrado!')
        }
    } catch (error) {
      return  console.log(error)
    }
    handleNextSignUp(1)
    setSignUpState({setlevel:"fundo2", btnText:"Finalizar cadastro"})

};



   // --- LOGIN USUARIO --- //
const navigate = useNavigate();

function handleButtonText(){
    if(signUpState.btnText === 'Entrar'){
        setSignUpState({...signUpState, btnText: 'Continuar'})
        navigate('/signup')
        return
    }else{
        setSignUpState({...signUpState, btnText: 'Entrar'})
        navigate('/')
        return
    }
}

async function onSubmitLogin(e) {
    e.preventDefault()
    try { 
        const usuarioCadastrado = await api.post('login',userDataState)
        if (usuarioCadastrado) {
            if ( usuarioCadastrado.data.cpf){
                localStorage.setItem(usuarioCadastrado.data.cpf)
            }
            if ( usuarioCadastrado.data.telefone){
                localStorage.setItem(usuarioCadastrado.data.telefone)
            }
            localStorage.setItem('token', usuarioCadastrado.data.token)
            localStorage.setItem('id', usuarioCadastrado.data.usuario.id)
            localStorage.setItem('usuario', usuarioCadastrado.data.usuario.nome_usuario)
            localStorage.setItem('email', usuarioCadastrado.data.usuario.email)
            navigate('/home')
        } else {
            return alert('Usuário ou senha incorretos')
        }
    } catch (error) {       
    }
}

const formsUserSignIn = {
    title: 'Faça seu login',
    inputs: [
        { placeHolder: 'E-mail', type: 'text', name: 'email', label: 'E-mail' },
        { placeHolder: 'Senha', type: 'password', name: 'senha', label: 'Senha' },
    ]
}



return {
    // CADASTRO/LOGIN USUSARIO //
    signUpState,
    setSignUpState, 
    activeStep, 
    setActiveStep, 
    handleNextSignUp, 
    userDataState, 
    setUserDataState, 
    handleSignUpData, 
    formsUserSignUp, 
    formsUserSignIn,
    confirmSenhaState, 
    handleConfirmSenha, 
    handleNextStep, 
    onSubmitSignUp, 
    onSubmitLogin,
    handleButtonText

}
}

export default useUserProvider;