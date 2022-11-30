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

export default function CustomizedButtons({ text, type ,action }) {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
      onClick={action}
      disableRipple
      variant="contained"
      type={type}
      >
      { text} </ColorButton>
    </Stack>
  );
}
