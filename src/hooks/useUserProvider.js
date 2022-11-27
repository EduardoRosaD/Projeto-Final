import { useState } from 'react';
import React from 'react';
import validaNome from '../utils/validaNome';
import api from '../services/api';

function useUserProvider(){
   // CADASTRO USUARIO //
const [ signUpState, setSignUpState] = useState({ // Estado manipulador  componentes exibidos  Cadastro usuario
    setlevel: "fundo1",
    btnText: "Continuar",
});
const [activeStep, setActiveStep] = React.useState(0); // Estado manipulador  stepper cadastro usuario

function handleNextSignUp(stepIncrement) {
    setActiveStep((prevActiveStep) => prevActiveStep + stepIncrement); // funcao manipuladora  stepper
}

const  [ signUpDataState, setSignUpDataState] = useState({ })// Estado manipulador dados cadastro usuario
const handleSignUpData = (e) => { // funcao manipuladora dos dados do cadastro
    setSignUpDataState({ ...signUpDataState, [e.target.name]: e.target.value }); 
}
const [confirmSenhaState, setConfirmSenhaState] = React.useState('');
const handleConfirmSenha = (event) => {
    setConfirmSenhaState(event.target.value);
};

async function onSubmit(e) {
    e.preventDefault()
    if (signUpDataState.senha === undefined || confirmSenhaState === undefined) {
        return alert('Preencha todas as senhas')
    }
    if (signUpDataState.senha !== confirmSenhaState) {
        return alert('As senhas não conferem')
    }
    if (signUpDataState.senha.length < 6) {
        return alert('A senha deve ter no mínimo 6 caracteres')
    }
    try {
         await api.post('usuario', signUpDataState)

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
        { placeHolder: 'Digite seu nome', type: 'text', name: 'nome_usuario', label: 'Nome'},
        { placeHolder: 'Digite seu e-mail', type: 'text', name: 'email', label: 'E-mail' },
    ],
    onSubmit: onSubmit
}


return {
    signUpState, // Estado manipulador  componentes  Cadastro
    setSignUpState, // Funcao manipuladora Cadastro
    activeStep, // Estado manipulador stepper Cadastro
    setActiveStep, // Funcao manipuladora stepper Cadastro
    handleNextSignUp, // Funcao manipuladora stepper Cadastro
    signUpDataState, // Estado manipulador dados Cadastro
    setSignUpDataState, // Funcao manipuladora dados Cadastro
    handleSignUpData, // Funcao manipuladora dados Cadastro
    formsUserSignUp, // Formulario Cadastro
    confirmSenhaState, // Estado manipulador confirmar senha
    handleConfirmSenha, // Funcao manipuladora confirmar senha
}
}

export default useUserProvider;