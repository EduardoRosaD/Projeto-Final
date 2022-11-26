import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import './styles.css'




const ColorButton = styled(Button)(() => ({
  backgroundColor: '#DA0175 !important',
  textTransform: 'none',
  minWidth: '165px !important',
  '&:hover': {
    background: '#DA0175!important',
    backgroundColor: '#DA0175 !important',
    
  },
}));

export default function CustomizedButtons({handleNext, nome, type, width, handleOpen ,marginTop }) {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
      onClick={nome === '+ Adicionar cliente' ? handleOpen : handleNext}
      disableRipple
      variant="contained"
      type={type}
      style={{width: width, marginTop: '40px'}}
      >
      { nome} </ColorButton>
    </Stack>
  );
}
