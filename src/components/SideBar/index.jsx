import useUser from '../../hooks/useUser';
import homeLogoOn from '../../assets/images/homeLogoOn.svg';
import homeLogoOff from '../../assets/images/homeLogoOff.svg';
import clientesLogoOn from '../../assets/images/clientesLogoOn.svg';
import clientesLogoOff from '../../assets/images/clientesLogoOff.svg';
import cobrancasLogoOn from '../../assets/images/cobrancasLogoOn.svg';
import cobrancasLogoOff from '../../assets/images/cobrancasLogoOff.svg';
import styled from 'styled-components';



export default function SideBar() {
   const { homeState, handlePageState} = useUser();
  
    return (
        <SideBarContainer>

        <ButtonSideBar page={homeState.home}  onClick={()=>handlePageState('home')}>
            <img src={homeState.home   ? homeLogoOn : homeLogoOff} alt='img'></img>
            Home
        </ButtonSideBar>

        <ButtonSideBar page={homeState.clientes} onClick={()=>handlePageState('clientes')}>
        <img src={homeState.clientes ? clientesLogoOn : clientesLogoOff}alt='img'></img>
        Clientes
       </ButtonSideBar>

      <ButtonSideBar page={homeState.cobrancas}  onClick={()=>handlePageState('cobrancas')}>
        <img src={homeState.cobrancas ? cobrancasLogoOn : cobrancasLogoOff}alt='img'></img>
        Cobranças
      </ButtonSideBar>
      
</SideBarContainer>
    )
}

const SideBarContainer = styled.div`
  width: 108px;
  background: #F0F0F5;
  padding-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: right;
  min-height: 100%;
  gap: 60px;
`
const ButtonSideBar = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: none;
    border-right: ${props => props.page ? '2px solid #DA0175 !important' : 'none'};
    color: ${props => props.page ? '#DA0175' : '#343447'};
    `