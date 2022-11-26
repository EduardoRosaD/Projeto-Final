import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import './styles.css';

export default function InputAdornments({senhaPlaceholder, handleChange2, inps, nome}) {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
      <div className='senha_input'>
      
       
        <FormControl sx={{ m: 1, width: '360' }} variant="outlined"  focused={false}>
          
          <label to='outlined-adornment-password'>{senhaPlaceholder}</label>
          <OutlinedInput
          sx={{  minWidth: '275', background: 'white', borderRadius: '10px', border: '1px solid #E0E0E0', }}
            id={nome}
            type={values.showPassword ? 'text' : 'password'}
            value={ inps.senha}
            onChange={(e)=>handleChange2(e)}
            placeholder={senhaPlaceholder}
            name= {'senha'}
            focused={false}
            endAdornment={
              <InputAdornment
              position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              
            }
          />


        </FormControl>

        
      </div>
  );
}
