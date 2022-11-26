import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';





export default function CustomizedButtons({onClick, textoBotao, bGcolor, color,  minWidth, type, borderRadius, fontFamily, fontSize, fontWeight, lineHeight, img }) {

 
  const ColorButton = styled(Button)(() => ({
    textTransform: 'none',
    backgroundColor: bGcolor,
    minWidth: minWidth , 
    borderRadius: borderRadius,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    '&:hover': {
      background: bGcolor,
      backgroundColor: bGcolor,
      
    },
    color:  color,
  
  }));
  
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
    onClick={onClick}
    type={type}
      variant="contained">
        {img ? <div
        style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
        ><img src={img} alt='icon-verde'></img><span>{textoBotao}</span></div> : textoBotao}
         </ColorButton>
    </Stack>
  );
}
