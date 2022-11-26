import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import clienteFiltro from '../../assets/images/clienteFiltro.svg';
import contaPaga from '../../assets/modalCadastroImagens/contaPaga.svg';
import contaPendente from '../../assets/modalCadastroImagens/contaPendente.svg';
import contaVencida from '../../assets/modalCadastroImagens/contaVencida.svg';
import formatarData from '../../utils/formatarData.js';
import ModalDeletarCobranca from '../ModalDeletarCobranca';
import ModalEditarCobranca from '../ModalEditarCobranca';
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







export default function TabelaCobrancaClientes({ rows }) {
  console.log(rows)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1116,borderRadius:30  }} aria-label="customized table">
        <TableHead sx={{borderRadius: 30}}>
          <TableRow sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: 16,
            lineHeight: 24,
            
          }}>
            <StyledTableCell align="left"><img src={clienteFiltro} alt='cliente-filtro' style={{marginLeft:'5px', marginRight:'5px'}} ></img>ID Cob.</StyledTableCell>      <StyledTableCell align="left"><img src={clienteFiltro} alt='cliente-filtro' style={{marginLeft:'5px', marginRight:'5px'}} ></img>Data de venc.</StyledTableCell>
            <StyledTableCell align="left">Valor</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Descrição</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}
            
            >
              <StyledTableCell align="left">{row.id}</StyledTableCell>
           
              <StyledTableCell align="left">{formatarData(row.dataVencimento)}</StyledTableCell>
              <StyledTableCell align="left">R$ {(row.valor/100).toFixed(2)}</StyledTableCell>
              <StyledTableCell
                align="left">{row.descricao}</StyledTableCell>
              <StyledTableCell align="left"><img src={row.status_cobranca === "paga" ? contaPaga : row.status_cobranca === "pendente" ? contaPendente : contaVencida} alt='conta-status'></img></StyledTableCell>
              <StyledTableCell
                align="left"><ModalDeletarCobranca
                cobrancaId={row.id}
                cobrancaStatus={row.status_cobranca}
                ></ModalDeletarCobranca></StyledTableCell>
                 <StyledTableCell
                align="left"><ModalEditarCobranca
                cobrancaId={row.id}
                row={row}
                cobrancaStatus={row.status_cobranca}
                
                ></ModalEditarCobranca></StyledTableCell>
            </StyledTableRow>
            
            
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}