import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { TransactionContext } from '../../TransactionsContext';

import closeImg from '../../assets/closebutton.svg';
import incomes from "../../assets/incomes.svg";
import expenses from "../../assets/expenses.svg";

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionContext);
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [type, setType] = useState('deposit');
    const [category, setCategory] = useState('');
    
    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        createTransaction({
            title,
            value,
            category,
            type,
        })

    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button type='button' onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Cancelar" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input placeholder='Título' onChange={event => setTitle(event.target.value)}/>
                <input type="number" placeholder='Valor' onChange={event => setValue(+event.target.value)}/>
                
                <TransactionTypeContainer>
                    <RadioBox 
                        type='button'
                        onClick={() => { setType('deposit')}}
                        isActive={type==='deposit'}
                        activeColor="green"
                    >
                        <img src={incomes} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type='button' 
                        onClick={() => { setType('withdraw')}}
                        isActive={type==='withdraw'}
                        activeColor="red"
                    > 
                        <img src={expenses} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input placeholder='Categoria' onChange={event => setCategory(event.target.value)}/>
                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )
}