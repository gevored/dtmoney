import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createServer, Model} from 'miragejs'

createServer({
  models:{
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id:1,
          title:'freela',
          type:'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id:2,
          title:'Compra',
          type:'withdraw',
          category: 'bolo',
          amount: 200,
          createdAt: new Date('2021-02-17 09:00:00'),
        },
      ]
    })
  },

  routes(){
    this.namespace= '/api';

    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })

    this.post("/transaction", (schema, request) => {
      const data = JSON.parse(request.requestBody)
    
      return schema.create('transaction',data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
