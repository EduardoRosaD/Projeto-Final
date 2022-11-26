import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useContext } from 'react';
import clienteFiltro from '../../assets/images/clienteFiltro.svg';
import emDia from '../../assets/images/emDia.svg';
import inadimplente from '../../assets/images/inadimplente.svg';
import UserContext from '../../context/UserContext';
import formataCpf from '../../utils/formataCpf.js';
import formataTelefone from '../../utils/formataTelefone';
import ModalCadastroCobranca from '../ModalCadastroCobranca/index';
import './styles.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));







export default function CustomizedTables({ rows }) {
  const { handleModalSucessoCobranca, setClienteSelecionadoState,handlePaginaCliente, } = useContext(UserContext);

  const handleClienteSelecionado =   (cliente) => {
    setClienteSelecionadoState(cliente)
  
    handlePaginaCliente()
    

  }




  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1235,borderRadius:30, }} aria-label="customized table">
        <TableHead sx={{borderRadius: 30}}>
          <TableRow sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: 16,
            lineHeight: 24,
            
          }}>
            <StyledTableCell><img src={clienteFiltro} alt='cliente-filtro' style={{marginLeft:'5px', marginRight:'5px'}} ></img>Cliente</StyledTableCell>
            <StyledTableCell align="left">CPF</StyledTableCell>
            <StyledTableCell align="left">E-mail</StyledTableCell>
            <StyledTableCell align="left">Telefone</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Criar Cobrança</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}
           
            id={row.id}
         
            >
              <StyledTableCell component="th" scope="row"
              email = {row.email}
              className='pointer'
              onClick={()=>handleClienteSelecionado(row)}
              id={row.id}
              
              >
                {row.cliente}
              </StyledTableCell>
              <StyledTableCell align="left">{formataCpf(row.cpf)}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{formataTelefone(row.telefone)}</StyledTableCell>
              <StyledTableCell
                align="left"><img src={ row.status_cliente === 'Inadimplente' ? inadimplente : emDia} alt='cliente-status'></img></StyledTableCell>
              <StyledTableCell align="center">
              <ModalCadastroCobranca
              nome={row.cliente}
              handleModalSucessoCobranca={handleModalSucessoCobranca}
              cliente_id={row.id}
              row={row}
              tipoTabela={'todosClientes'}
              handleClienteSelecionado={handleClienteSelecionado}
              nome_cliente={row.cliente}
              ></ModalCadastroCobranca>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}