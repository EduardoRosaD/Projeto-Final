import React from 'react';


import DynamicTable from '../../components/DynamicTable/index';
import Header from '../../components/Header/index';
import SideBar from '../../components/SideBar/index';
import './styles.css';

import styled from 'styled-components';
import useUser from '../../hooks/useUser';


function Home() {

    const { expectedBills, expectedBillsTotal, overdueBills, overdueBillsTotal, paidBills, paidBillsTotal, defaultingCustomers, defaultingCustomersTotal, upToDateCustomers,upToDateCustomersTotal } = useUser();


    return (
        <MainContainer>

            <SideBar/>

            <ContentContainer>

                <Header/>

               <Container1>
                    <DynamicTable rows={expectedBills} bill={expectedBillsTotal}  />

                    <DynamicTable rows={overdueBills} bill={overdueBillsTotal} />

                    <DynamicTable rows={paidBills} bill={paidBillsTotal}  />
                </Container1>

                <Container2>
                   <DynamicTable rows={defaultingCustomers} customer={defaultingCustomersTotal} bill={overdueBillsTotal}/>
                    
                    <DynamicTable rows={upToDateCustomers} customer={upToDateCustomersTotal} bill={paidBillsTotal}/> 
                </Container2>

            </ContentContainer>

        </MainContainer>

    )
}

export default Home;

const MainContainer = styled.div`
display: flex;
    height: 100%;
`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
background-color: #F8F8F9;
`

const Container1 = styled.div`
display: flex;
align-items: center;
gap: 32px;
`

const Container2 = styled.div`
display: flex;
gap: 33.5px;
padding-bottom: 40px;
`