import TableHeader from './TableHeader';
import TableLines from './TableLines';
import TableFooter from './TableFooter';

export default function TabelaDinamica({bill,rows, customer}){
    return (
        <div className='conteudo-tabela-container'>   
        <TableHeader bill={bill} customer={customer}/>
        <TableLines rows={rows} />
        <TableFooter />
    </div>
    )
}