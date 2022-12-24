import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
    models: {
        transaction: Model
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'Freelance de website',
                    value: 1500,
                    type: 'deposit',
                    category: 'Desenvolvimento',
                    createdAt: new Date('2021-01-02 09:00:00'),
                },
                {
                    id: 2,
                    title: 'Aluguel',
                    value: 1100,
                    type: 'withdraw',
                    category: 'Casa',
                    createdAt: new Date('2021-01-18 19:00:00'),
                }
            ]
        })
    },
    
    routes() {
        this.namespace = 'api'

        this.get('/transactions', () => {
            return this.schema.all('transaction');
        })

        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            return schema.create('transaction',data);
        })
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);