import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Cadastro/Botao/index';
import Card from '../../components/Cadastro/Card';
import Card2 from '../../components/Cadastro/Card2';
import Card3 from '../../components/Cadastro/Card3';
import MedidorProgresso from '../../components/Cadastro/medidorProgresso/index';
import Progresso from '../../components/Cadastro/Progresso';
import useUser from '../../hooks/useUser';
import './styles.css';





function SignUp() {
    const { signUpState, handleNextStep, onSubmitSignUp, formsUserSignUp, handleButtonText, navigate } = useUser();
   
        

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
                            <form onSubmit={onSubmitSignUp}>
                                {signUpState.setlevel === 'fundo1' &&
                                    < Card 
                                    page='signUp'
                                    />
                                }
                                {signUpState.setlevel === 'fundo2' &&
                                    < Card2 forms={formsUserSignUp}
                                    />
                                }
                                {signUpState.setlevel === 'fundo3' &&
                                    < Card3 />
                                }
                                <div className='btn_login_container'>
                                    {signUpState.btnText === 'Finalizar cadastro'
                                        ?
                                        <Botao
                                            text={signUpState.btnText}
                                            type={'submit'}
                                            action={onSubmitSignUp}
                                        ></Botao>
                                        :
                                        <div className='botao'
                                            onClick={signUpState.btnText === 'Continuar'  ? handleNextStep : navigate('/signin')}>
                                            <span>{signUpState.btnText}</span>
                                        </div>
                                    }
                                </div>
                            </form>
                           
                            <div className='link-cadastro-container' style={{ display: signUpState.btnText === 'Ir para login' ? 'none' : 'inline' }}>
                                <Typography variant='p' component='p' >  Já possui uma conta?   Faça seu <Link onClick={handleButtonText} to='/signIn'>
                                    <span className='card2__link'>Login</span>
                                </Link> </Typography>
                              
                            </div>  
                        </Grid> 
                    </Grid>
                </Container>   
                <Progresso />
            </div>
        
        </div>
       
    )
}

export default SignUp;