import styled from 'styled-components';

export default function TableFooter(){
    return (
        <Footer>
        <a href="https://fastidious-sunshine-2f5f35.netlify.app/">Ver todos</a>

    </Footer>
    )
}
const Footer = styled.div`
 text-align: center;
 font-family: 'Nunito';
 font-style: normal;
 font-weight: 400;
 font-size: 18px;
 line-height: 130%;
 background-color: white;
 border-bottom-left-radius: 20px;
 border-bottom-right-radius: 20px;
 border: 1px solid #EFF0F7;
 box-shadow: 0px 4px 4px rgba(172, 217, 197, 0.25);
 padding-top: 13px;
 padding-bottom: 12px;
 a{
    color: #DA0175;
    text-decoration: none;
 }
 `