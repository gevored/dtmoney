
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import {Dashboard} from  './components/Dashboard/index'
import {NewTransactionModal} from  './components/NewTransactionModal'
import { useState } from 'react';
import { TransactionsProvider } from './TransactionContext';

function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransacionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloeNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransacionModal= {handleOpenNewTransacionModal} />
      <Dashboard/>

      <NewTransactionModal 
        isOpen= {isNewTransactionModalOpen}
        onRequestClose ={handleCloeNewTransactionModal}
      />     
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

export default App;
