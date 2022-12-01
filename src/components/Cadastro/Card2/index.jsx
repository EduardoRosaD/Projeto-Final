import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import InputSenha from '../InputSenha';
import './styles.css';


export default function BasicCard() {

  return (
    <Card className='card2'
      sx={{ minWidth: 275 }}>
        <Typography className='card2__title' variant='h5' component={'h2'}>Escolha uma senha</Typography>
        <div className='input-container'>
          <InputSenha
           type='password'
          ></InputSenha>
          <InputSenha
            type='confirm'
          ></InputSenha>
        </div>
    </Card>
  );
}
