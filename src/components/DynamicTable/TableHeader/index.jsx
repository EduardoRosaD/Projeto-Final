import paidBill from '../../../assets/mainImages/cobrancaPaga.svg';
import expectedBill from '../../../assets/mainImages/cobrancaPrevista.svg';
import overdueBill from '../../../assets/mainImages/cobrancaVencida.svg';
import upToDateCustumer from '../../../assets/mainImages/clienteEmDia.svg';
import defaultingCustomer from '../../../assets/mainImages/clienteInadimplente.svg';
import styled from 'styled-components';

function colorSelect1(billType) {
    if (billType === 'Previstas') {
        return '#FCF6DC'
    } else if (billType === 'Vencidas') {
        return '#FFEFEF'
    } else {
        return '#EEF6F6'
    }
}
function colorSelect2(billType) {
    if (billType === 'Previstas') {
        return '#C5A605'
    } else if (billType === 'Vencidas') {
        return '#971D1D'
    } else {
        return '#1FA7AF'
    }
}
function logoSelect(billType) {
    if (billType === 'Previstas') {
        return expectedBill
    } else if (billType === 'Vencidas') {
        return overdueBill
    } else {
        return paidBill
    }
}
function customerLogoSelect(customerStatus) {
    if (customerStatus === 'Em dia') {
        return upToDateCustumer
    } else {
        return defaultingCustomer
    }
}
export default function TableHeader({ bill, customer }) {

    return (
        <>
            {!customer ? <>
                <TopContainer
                    bill={bill}
                >
                    <img src={logoSelect(bill.type)} alt='cobranca-paga'></img>
                    <div>
                        <p>Cobranças {bill.type}</p>
                        <p>R$ {bill.total}</p>
                    </div>
                </TopContainer>
                <TableTop
                    bill={bill}
                >
                    <h3>Cobranças {bill.type}</h3>
                    <span>05</span>
                </TableTop>
            </> :
                <TableTop
                    bill={bill}
                    customer={customer}
                >
                    <img src={customerLogoSelect(customer.status)} alt='cliente-inadiplente'></img>
                    <h3>Clientes {customer.status}</h3>
                    <span>{customer.total}</span>
                </TableTop>
            }

        </>
    )
}


const TopContainer = styled.div`
width: 360px;
height: 111px;
background-color:${(props) => colorSelect1(props.bill.type)};
border-radius: 30px;
display: flex;
align-items: center;
justify-content: center;
gap: 54px;
font-family: 'Montserrat';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 130%;
div:nth-child(2){
    display: flex;
    gap: 11px;
    flex-direction: column;
    align-items: center;
},
p:nth-child(2){
    font-size: 24px;
}

`

const TableTop = styled.div`
    display: flex;
    justify-content: space-between;
    height: 58px;
    align-items: center;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-left: 56px;
    padding-right: 24px;
    border: 1px solid #EFF0F7;
    margin-top: 24px;
    h3{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: #3F3F55;  
    };
   span{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 130%;
        color: ${(props) => colorSelect2(props.bill.type)};
        background: ${(props) => colorSelect1(props.bill.type)};
        border-radius: 8px;
        width: 52px;
        height: 21px;
        text-align: center;
        margin-left: ${(props) => props.customer? '240px' : '0px'};
    }
    img{
        margin-right: 5px;
    }
`