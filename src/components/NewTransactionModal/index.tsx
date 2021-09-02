import Modal from 'react-modal'
import {Container , TransactionTypeContainer, RadioBox} from './styles'
import closeImg from  '../../assets/close.svg'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState , useContext } from 'react'
import { api } from '../../services/api'
import { TransactionsContext } from '../../TransactionContext'


Modal.setAppElement('#root')

interface NewTransactionModalProps{
    isOpen:boolean;
    onRequestClose: () => void
}

export function NewTransactionModal({isOpen,onRequestClose } : NewTransactionModalProps){    
  
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')


  const { createTransaction} = useContext(TransactionsContext)

 async function handleCreateNewTransaction(event : FormEvent){
    event.preventDefault()

    await createTransaction(
      {
        title,
        amount,
        category,
        type
      }
    )

    
    onRequestClose()

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('Deposit')
  }
    return(
        <Modal
        isOpen= {isOpen}
        onRequestClose = {onRequestClose}
        overlayClassName = "react-modal-overlay"
        className = "react-modal-content"
      >
        <button 
        className = "react-modal-close"
        type= "button"
        onClick = {onRequestClose}
        >
          <img src={closeImg} alt="fechar nova transação" />
        </button>

        <Container onSubmit = {handleCreateNewTransaction }>
          <h2>Cadastrar transação</h2>
          <input 
           value= {title}
            onChange = {(e)=> setTitle(e.target.value)}
            placeholder = "Título" 
          />

           <input
            onChange = {(e)=> setAmount(Number(e.target.value))}
            value = {amount}
            type="number" 
            placeholder = "Valor" 
          />

          <TransactionTypeContainer>
            <RadioBox
            type= "button"
            isActive = {type==='deposit'}
            onClick={()=>{setType('deposit')}}
            activeColor = "green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
            type= "button"
            isActive = {type==='withdraw'}
            activeColor = "red"
            onClick={()=>{setType('withdraw')}}
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            onChange = {(e)=> setCategory(e.target.value)}
            placeholder = "Categoria" 
            value= {category}
          />

          <button type="submit">
            Cadastrar
          </button>
        </Container>
      </Modal>
    )
}