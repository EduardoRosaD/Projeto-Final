import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';




const ColorButton = styled(Button)(() => ({
  backgroundColor: '#DA0175 !important',
  minWidth: '165px !important',
  '&:hover': {
    background: '#DA0175!important',
    backgroundColor: '#DA0175 !important',
    
  },
}));

export default function CustomizedButtons(setBtnText) {
  return (
    <Stack spacing={2} direction="row">
    <Link to='/SignIn'>   <ColorButton
    onClick={()=>setBtnText('Entrar')}
      variant="contained">
      Login</ColorButton>
      </Link>
    </Stack>
  );
}
