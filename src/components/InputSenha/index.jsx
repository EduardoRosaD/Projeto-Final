import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import './styles.css';
import useUser from '../../hooks/useUser';

export default function InputAdornments({type}) {
  const {  formsUserSignUp, handleSignupData, handleConfirmSenha, signUpDataState  } = useUser();
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
          
          <label to='outlined-adornment-password'>{type === "confirm" ?'Repita a senha*' : 'Senha*' }</label>
          <OutlinedInput
          sx={{  minWidth: '275', background: 'white', borderRadius: '10px', border: '1px solid #E0E0E0', }}
            id={type === "confirm" ? 'confirmacaoSenha' : 'senha'}
            type={values.showPassword ? 'text' : 'password'}
            value={ signUpDataState.senha}
            onChange={type === "confirm" ? handleConfirmSenha : handleSignupData}
            placeholder={type === "confirm" ?'Repita a senha*' : 'Senha*' }
            name= {type === "confirm" ? 'confirmacaoSenha' : 'senha'}
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
