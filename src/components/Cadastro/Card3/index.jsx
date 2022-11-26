import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import checked from '../../../assets/checked.svg';
import './styles.css';

export default function BasicCard({ forms }) {

  return (
    <Card className='card3'
      sx={{ minWidth: 275 }}>

      <div className='checkedImg_container'>

        <img src={checked} className='checked' alt='checked'></img>
        
        <Typography variant='h4'>Cadastro realizado com sucesso!</Typography>


      </div>

   </Card>
  );
}
