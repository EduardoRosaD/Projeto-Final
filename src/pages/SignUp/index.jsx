import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Cadastro/Botao/index';
import Card from '../../components/Cadastro/Card';
import Card2 from '../../components/Cadastro/Card2';
import Card3 from '../../components/Cadastro/Card3';
import MedidorProgresso from '../../components/Cadastro/medidorProgresso/index';
import api from '../../services/api';
import validaNome from '../../utils/validaNome';
import './styles.css';
import useUser from '../../hooks/useUser';





function SignUp() {
    const { handleNextSignUp, forms } = useUser();
    const navigate = useNavigate();
    
    const [faseAtual, setFaseAtual] = React.useState('fundo1');
    const [btnText, setBtnText] = React.useState('Continuar');
    const [inps, setInps] = React.useState([]);
    const [confirmSenhaState, setConfirmSenhaState] = React.useState('');

    function handleChange(e) {
        setInps({ ...inps, [e.target.name]: e.target.value });
        console.log(inps)

    }
    function handleChange2(e) {
        setInps({ ...inps, [e.target.name]: e.target.value });
        console.log(inps)

    }
    function handleChange3(e) {
        console.log(confirmSenhaState)
        setConfirmSenhaState(e.target.value);

    }


    async function onSubmit(e) {
        e.preventDefault()
        if (inps.senha === undefined || confirmSenhaState === undefined) {
            return alert('Preencha todas as senhas')
        }
        if (inps.senha !== confirmSenhaState) {
            return alert('As senhas não conferem')
        }
        if (inps.senha.length < 6) {
            return alert('A senha deve ter no mínimo 6 caracteres')
        }
     
     

        try {

             await api.post('usuario', inps)

            alert('Usuário cadastrado com sucesso!')
            handleNextSignUp(2)
            setFaseAtual('fundo3');
            setBtnText('Ir para login');
        } catch (error) {
            console.log(error)
            return alert(error)

        }

    }

    const handleNavigate = () => {
        navigate('/signin')
    }

    const handleNext = async () => {

        if (inps.nome_usuario === undefined || inps.email === undefined || inps.nome_usuario === '' || inps.email === '') {
            return alert('Preencha email e nome!')

        }
        try {
           
            if ( validaNome(inps.nome_usuario) === false) {
                return alert('Nomes não podem conter algarismos')
            }
       
            const emailValido = await api.post('emailValidoCliente', { email: inps.email })
            if (!emailValido.data) {
                return alert('Insira um e-mail válido!')
            }
            const emailRepetido = await api.post('verificarEmail', {email : inps.email})
            
            if (emailRepetido.data) {
                return alert('E-mail já cadastrado!')
            }

           
         
        } catch (error) {
          return  console.log(error)
        }




        handleNextSignUp(1)

        setFaseAtual('fundo2');
        setBtnText('Finalizar cadastro');

    };




    return (
        <div className='main-container'>
            <div className='container1'>
                <Container>
                    <Grid>
                        <Grid item xs={1}>
                            <MedidorProgresso
                            ></MedidorProgresso>
                        </Grid>
                    </Grid>
                </Container>

            </div>


            <div className='container2'>
                <Container>
                    <Grid>
                        <Grid item xs={1}>
                            <form onSubmit={onSubmit}>
                                {faseAtual === 'fundo1' &&
                                    < Card forms={forms}
                                        handleChange={handleChange}
                                    />
                                }
                                {faseAtual === 'fundo2' &&
                                    < Card2 forms={forms}
                                        handleChange2={handleChange2}
                                        handleChange3={handleChange3}
                                        inps={inps}
                                        setInps={setInps}
                                        faseAtual={faseAtual}
                                        setFaseAtual={setFaseAtual}
                                        btnText={btnText}
                                        setBtnText={setBtnText}
                                    />
                                }
                                {faseAtual === 'fundo3' &&
                                    < Card3 forms={forms}
                                        faseAtual={faseAtual}
                                        setFaseAtual={setFaseAtual}
                                        btnText={btnText}
                                        setBtnText={setBtnText}
                                    />
                                }
                                <div className='btn_login_container'>
                                    {btnText === 'Finalizar cadastro'
                                        ?
                                        <Botao
                                            nome={btnText}
                                            type={'submit'}

                                        ></Botao>
                                        :
                                        <div className='botao'
                                            onClick={btnText === 'Continuar' ? handleNext : handleNavigate}>
                                            <span>{btnText}</span>
                                        </div>
                                    }



                                </div>




                            </form>
                            <div className='link-cadastro-container' style={{ display: btnText === 'Ir para login' ? 'none' : 'inline' }}>
                                <Typography variant='p' component='p' >  Já possui uma conta?   Faça seu <Link to='/signIn'>
                                    <span className='card2__link'>Login</span>
                                </Link> </Typography>
                            </div>
                        </Grid>
                    </Grid>


                </Container>

                <div className='progresso'>
                    <div className='fundo1'
                        style={{ backgroundColor: faseAtual === 'fundo1' ? '#0E8750' : '#DEDEE9' }}
                    ></div>
                    <div className='fundo2'
                        style={{ backgroundColor: faseAtual === 'fundo2' ? '#0E8750' : '#DEDEE9' }}
                    ></div>
                    <div className='fundo3'
                        style={{ backgroundColor: faseAtual === 'fundo3' ? '#0E8750' : '#DEDEE9' }}
                    ></div>
                </div>
            </div>

        </div>
       
    )
}

export default SignUp;