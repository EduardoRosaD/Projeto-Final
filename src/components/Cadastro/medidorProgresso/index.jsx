import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useUser from '../../../hooks/useUser';
import './styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    { title: 'Cadastre-se', subtitle: 'Por favor, escreva seu nome e e-mail' },
    { title: 'Escolha uma senha', subtitle: 'Escolha uma senha segura' },
    { title: 'Cadastro realizado com sucesso', subtitle: 'E-mail e senha cadastrados com sucesso' },
]

}


export default function VerticalLinearStepper() {
  const { activeStep } = useUser();
  const classes = useStyles();
  
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label.title}
         sx={{width: '100% !important'}}
         display={'flex !important'}
          >
            
              <StepLabel
              sx={{fontFamily: 'Montserrat', color:'red !important'}}
              >{label.title}
                <Typography
                >{label.subtitle}</Typography>
                </StepLabel>
              
           
        
           
          </Step>
        ))}
      </Stepper>
     
    </div>
  );
}
