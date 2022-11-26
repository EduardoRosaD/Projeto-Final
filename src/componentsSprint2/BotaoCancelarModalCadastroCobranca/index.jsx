import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import './styles.css';



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

export default function CustomizedButtons({  handleClose  }) {
 
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        onClick={()=> handleClose()}
        disableRipple
        variant="contained"
        type={'buton'}
      >
       Cancelar  </ColorButton>
    </Stack>
  );
}
