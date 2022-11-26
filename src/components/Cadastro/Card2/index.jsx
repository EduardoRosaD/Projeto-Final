import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import InputConfirmacaoSenha from '../../InputConfirmacaoSenha';
import InputSenha from '../../InputSenha';
import './styles.css';


export default function BasicCard({ forms,  handleChange2,handleChange3, inps, setInps }) {



  return (
    <Card className='card2'
      sx={{ minWidth: 275 }}>
      

        <Typography className='card2__title' variant='h5' component={'h2'}>Escolha uma senha</Typography>

        <div className='input-container'>
          <InputSenha
            handleChange2={handleChange2}
            senhaPlaceholder={'Senha*'}
            inps={inps}
            setInps={setInps}
            name={'senha'}
           
          ></InputSenha>
          <InputConfirmacaoSenha
            handleChange3={handleChange3}
            senhaPlaceholder={'Repita a senha*'}
            inps={inps}
            setInps={setInps}     
            name={'confirmacaoSenha'}
          
          ></InputConfirmacaoSenha>
        </div>



    </Card>
  );
}
