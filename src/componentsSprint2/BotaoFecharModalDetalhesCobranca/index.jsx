import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useContext } from 'react';
import closed from '../../assets/closed.svg';
import UserContext from '../../context/UserContext';
import './styles.css';



const ColorButton = styled(Button)(() => ({
  backgroundColor: 'white !important',
  textTransform: 'none',
  width: '10px !important',
  marginTop: '10px  !important',
  fontFamily: 'Nunito',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 18,
  height: 18,
  boxShadow: 'none',
  position: 'absolute',
  top: '30px',
  right: '30px',
  zIndex: '4 !important',
 
  

  '&:hover': {
    width: '18px !important',
    background: 'white!important',
    backgroundColor: '#white !important',
    boxShadow: 'none',

  },
}));

export default function CustomizedButtons() {

  const { handleClose}  = useContext(UserContext)
 
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        onClick={()=> handleClose()}
        disableRipple
        variant="contained"
        type={'buton'}
      >
       <img src={closed} alt='icon-verde'></img> </ColorButton>
    </Stack>
  );
}
