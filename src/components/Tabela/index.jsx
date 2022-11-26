import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white ,
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

function createData(cliente, idCobranca, valor) {
  return { cliente, idCobranca, valor };
}

const rows = [
  createData('Sara Silva', '223456787', 'R$ 1000,00'),
  createData('Carlos Prado', '223456781','R$ 400,00'),
  createData('Lara Brito', '223456781', 'R$ 900,00'),
  createData('Soraia Neves', '223456787', 'R$ 700,00'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350, maxHeight: 290 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell align="left">ID da cob.</StyledTableCell>
            <StyledTableCell align="left">Valor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.idCobranca}>
              <StyledTableCell component="th" scope="row">
                {row.cliente}
              </StyledTableCell>
              <StyledTableCell align="center">{row.idCobranca}</StyledTableCell>
              <StyledTableCell align="center">{row.valor}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}