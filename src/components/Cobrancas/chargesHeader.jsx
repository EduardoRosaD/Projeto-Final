import clientesLogoOff from '../../assets/images/clientesLogoOff.svg'
import filterButton from '../../assets/mainImages/botaoFiltro.svg'
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import styled from 'styled-components';
const inputSx = {
    border: '1px solid #D0D5DD', width: '322px', borderRadius: 1.4, height: 33, '&:before': {
        borderBottom: 'none !important'
    }, '&:after': {
        borderBottom: 'none !important'
    },
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    padding: '7px 8px',
    backgroundColor: '#FFFFFF',
}

export default function ChargesHeader() {
    return (
        <HeaderContainer>

            <Container1>
                <img src={clientesLogoOff} alt='clientes-icone'></img>
                <h2>Cobrancas</h2>
            </Container1>

            <Container2>
          ''      <img src={filterButton} alt='botaoFiltro'></img>
                <Input
                    sx={inputSx}
                    focused={false}
                    placeholder={'Pesquisar'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                >
                </Input>

            </Container2>

        </HeaderContainer>
    )
}
const HeaderContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
padding: 0px 100px 0px 120px;
margin-bottom: 30px;
margin-right: 40px;
margin-top: 24px;
`

const Container1 = styled.div`
    display: flex;
    align-items: center;
    gap: 22px;
    h2{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 130%;
        color: #3F3F55;
    }
    `

const Container2 =  styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
