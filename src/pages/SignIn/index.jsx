import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/index';
import Card from '../../components/Cadastro/Card';
import api from '../../services/api';
import './styles.css';




function SignIn() {
    const [inps2, setInps2] = React.useState([]);
    const navigate = useNavigate();

    const btnText = 'Entrar'



    async function onSubmit(e) {
        e.preventDefault()
        try {
            const usuarioCadastrado = await api.post('login', inps2)
            if (usuarioCadastrado) {
                localStorage.setItem('token', usuarioCadastrado.data.token)
                localStorage.setItem('usuario', usuarioCadastrado.data.usuario.nome_usuario)
                localStorage.setItem('cpf', usuarioCadastrado.data.usuario.cpf)
                localStorage.setItem('telefone', usuarioCadastrado.data.usuario.telefone)
                localStorage.setItem('email', usuarioCadastrado.data.usuario.email)
                localStorage.setItem('id', usuarioCadastrado.data.usuario.id)
                localStorage.setItem('iniciais', usuarioCadastrado.data.usuario.nome_usuario.substring(0, 1))
                navigate('/home')
            } else {
              return   alert('Usuario ou senha invalidos')
            }



          
        } catch (error) {
            alert(error.response.data)
        }
    }


    function handleChange(e) {
        setInps2({ ...inps2, [e.target.name]: e.target.value });
       

    }
    const forms = {
        title: 'Faça seu login!',
        inputs: [
            { placeHolder: 'E-mail', type: 'text', name: 'email', label: 'E-mail*' },
            { placeHolder: 'Senha', type: 'password', name: 'senha', label: 'Senha*' },
        ]
    }


    return (
        <div className='main-container-login'>

           
            <div className='background'>
                <p>Gerencie todos os pagamentos da sua empresa em um só lugar. </p>
                
            </div>




            <div className='container2'>
                <Container>
                    <Grid>
                        <Grid item xs={1}>
                            <form onSubmit={onSubmit}>
                                < Card forms={forms}
                                    handleChange={handleChange}
                                    btnText={btnText}

                                />
                                <div className='btn_login_container'>
                                    <Botao
                                        nome={btnText}
                                        type={'submit'}
                                    ></Botao>
                                    {btnText === 'Entrar' && <Typography variant='p' component={'p'}> Ainda não possui uma conta?   <Link className='card__link' to='/signUp'>
                                        Cadastre-se</Link> </Typography>
                                    }

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