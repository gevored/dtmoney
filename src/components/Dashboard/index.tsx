import { Container } from "./style";
import {Summary} from '../Summary/index'
import { TransactionTable } from "../TransactionTable";

export function Dashboard(){
    return(
        <Container>
            <Summary></Summary>
            <TransactionTable/>
        </Container>
    )
}