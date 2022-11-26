import React from 'react';
import { useNavigate } from 'react-router-dom';
import setaMenu from '../../assets/images/setaMenu.svg';
import sairLogo from '../../assets/mainImages/sairLogo.svg';
import ModalEditarDadosUsuario from '../../components/ModalEditarDadosUsuario/index';
import './styles.css';


const Header =  () => {
    const [open, setOpen] = React.useState(false);
    const [ openModalPerfil, setModalPerfilOpen ] = React.useState(false);
    const [modalEdtState, setModaEdtlState] = React.useState(true);
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
    }
    const usuario = localStorage.getItem('usuario');
    const iniciais = localStorage.getItem('iniciais');
 
    
    const handleClose = () => {
        if ( !modalEdtState){
            setModaEdtlState(true);
        }
        
        setOpen(false);
    }

    const logOut = ()=>{
     
        localStorage.clear()
        navigate('/')

    }
   


    return (
        <div className="header">
            <h1>Resumo das cobranças</h1>

            <div className="header-container">

                <div className="iniciais-container">
                    <span>{iniciais}</span>
                </div>

                <div className='nome-btn-container'>
                    <span>{usuario}</span>

          
                   <button
                   onClick={() => setModalPerfilOpen(!openModalPerfil)}
                   ><img src={setaMenu} className='setaMenu' alt='setaMenu'></img></button>
                { openModalPerfil && 
                <div className='modalMenor'>
                    <div className='orelinha'></div>
                    <ModalEditarDadosUsuario
                handleOpen={handleOpen}
                open={open}
                handleClose={handleClose}
                modalEdtState={modalEdtState}
                setModaEdtlState={setModaEdtlState}
                />
 
                
                            
                    <button>
                        <img className='pointer' alt='pointer' src={sairLogo}
                        onClick={()=> logOut() }
                        ></img>
                    </button>
                </div>
                }


                </div>

            </div>
        </div>
    );
}

export default Header;