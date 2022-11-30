import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import './styles.css';
import useUser from '../../../hooks/useUser';

export default function BasicCard({page}) {
    const {  formsUserSignUp, handleSignUpData, formsUserSignIn} = useUser();

  return (
    <Card className='card'
      sx={{ minWidth: 275 }}>
        
      <div className='card-container'>

        <Typography className='card__title' variant='p' component={'h1'}>{ page === "signUp" ? formsUserSignUp.title : formsUserSignIn.title}</Typography>
    { page === 'signUp' ?    formsUserSignUp.inputs.map((item) => (
          <div className='card-container'>
            <div className='labelSenha-container'>
              <label className='card__label' to={item.placeHolder}
              >
                {item.label }
              </label>
              {item.label === 'Senha*' && 
               <a href='https://fastidious-sunshine-2f5f35.netlify.app/signIn'>Esqueceu a senha?</a>
              }
             
            </div>
            <TextField className='card__input'
              id={item.placeHolder} variant="outlined"
              placeholder={item.placeHolder}
              type={item.type}
              name={item.name}
              sx={{borderRadius: '10px',border: '1px solid #D0D5DD', height: '46px' }}
              onChange={(e)=>handleSignUpData(e)}
              focused={false}
            />
          
          </div>
        )) :  formsUserSignIn.inputs.map((item) => (
          <div className='card-container'>
            <div className='labelSenha-container'>
              <label className='card__label' to={item.placeHolder}
              >
                {item.label }
              </label>
              {item.label === 'Senha*' && 
               <a href='https://fastidious-sunshine-2f5f35.netlify.app/signIn'>Esqueceu a senha?</a>
              }
             
            </div>
            <TextField className='card__input'
              id={item.placeHolder} variant="outlined"
              placeholder={item.placeHolder}
              type={item.type}
              name={item.name}
              sx={{borderRadius: '10px',border: '1px solid #D0D5DD', height: '46px' }}
              onChange={(e)=>handleSignUpData(e)}
              focused={false}
            />
          
          </div>
        ))}
      

      </div>
   
    </Card>
  );
}
