import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Cadastro/Botao/index';
import Card from '../../components/Cadastro/Card';
import api from '../../services/api';
import './styles.css';
import useUser from '../../hooks/useUser';




function SignIn() {
    const { onSubmitLogin, signUpState, handleButtonText } = useUser();
  
    return (
        <div className='main-container-login'>
 
            <div className='background'>
                <p>Gerencie todos os pagamentos da sua empresa em um só lugar. </p>   
            </div>

            <div className='container2'>
                <Container>

                    <Grid>
                        <Grid item xs={1}>
                            <form onSubmit={onSubmitLogin}>
                                < Card 
                                page='signIn'
                                />
                                <div className='btn_login_container'>
                                    <Botao
                                        text={signUpState.btnText}
                                        type={'submit'}
                                        action={onSubmitLogin}
                                    ></Botao>
                                    <Typography variant='p' component={'p'}> Ainda não possui uma conta?   <Link onClick={handleButtonText} className='card__link' to='/signUp'>
                                        Cadastre-se</Link> </Typography>
                                </div>

                            </form>
                        </Grid>
                    </Grid>
                    
                </Container>
            </div>
        </div>

    )
}

export default SignIn;