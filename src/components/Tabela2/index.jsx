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

function createData(cliente, idCliente, cpf,) {
  return { cliente, idCliente, cpf, };
}

const rows = [
  createData(' Cameron Williamson', '223456787', '041.777.456-78'),
  createData('Savannah Nguyen','223456787', '041.777.456-78'),
  createData('Eclair', '223456781', '041.777.456-78'),
  createData('Cupcake', '223456781', '041.777.456-78'),
  createData('Gingerbread', '223456781', '041.777.456-78'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 556 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{fontFamily: 'Nunito',
fontStyle: 'normal',
fontWeight: 800,
fontSize: 16,
lineHeight: 50,}}>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell align="left">ID do clie.</StyledTableCell>
            <StyledTableCell align="left">Valor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.idCliente}>
              <StyledTableCell component="th" scope="row">
                {row.cliente}
              </StyledTableCell>
              <StyledTableCell align="center">{row.idCliente}</StyledTableCell>
              <StyledTableCell align="center">{row.cpf}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}