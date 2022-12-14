import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

const TableRowSx = {
  fontWeight: 800,
  fontFamily: 'Nunito',
  fontSize: 16,
}
export default function CustomizedTables({ rows }) {
  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 350, maxHeight: 290 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={TableRowSx} align="left">Cliente</StyledTableCell>
            <StyledTableCell sx={TableRowSx} align="left">{rows[0].idCobranca ? "Id da cob." : "Data de venc."}</StyledTableCell>
            <StyledTableCell sx={TableRowSx} align="left">Valor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.idCobranca}>
              <StyledTableCell align="left" component="th" scope="row">
                {row.cliente}
              </StyledTableCell>
              <StyledTableCell align="left">{row.idCobranca ? row.idCobranca : row.dataVenc}</StyledTableCell>
              <StyledTableCell align="left">{row.valor}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}