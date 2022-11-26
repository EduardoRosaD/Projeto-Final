import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import './styles.css'
import iconEditarVerde from '../../assets/modalCadastroImagens/iconEditarVerde.svg';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';



const ColorButton = styled(Button)(() => ({
  backgroundColor: '#F8F8F9 !important',
  textTransform: 'none',
  minWidth: '165px !important',
  color: '#0E8750 !important',
  marginTop: '10px  !important',
  fontFamily: 'Nunito',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 18,
  height: 36,
  

  '&:hover': {
    background: '#F8F8F9!important',
    backgroundColor: '#F8F8F9 !important',

  },
}));

export default function CustomizedButtons({  text  }) {
  const { abreModalFechaDetalhes, handleOpen, paginaCliente } = useContext(UserContext);
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        onClick={!paginaCliente ? ()=> handleOpen() : ()=> abreModalFechaDetalhes()}
        disableRipple
        variant="contained"
        type={'buton'}
      >
        {text === "Editar Cliente" ? <div><img src={iconEditarVerde} alt='icon-verde'></img><span>Editar Cliente</span></div> : 'Cancelar'} </ColorButton>
    </Stack>
  );
}
