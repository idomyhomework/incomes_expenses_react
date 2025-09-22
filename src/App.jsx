import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  //load from the storage or create an empty array if the user enters for the first time
  const [income, setIncome] = useState(()=>{
    const saved_income = localStorage.getItem("incomes");
    return saved_income ? JSON.parse(saved_income) : [];
  });

  const [expense, setExpense] = useState(()=>{
    const saved_expense = localStorage.getItem("expenses");
    return saved_expense ? JSON.parse(saved_expense) : [];
  })

  //reading input values
  const [incomeName, setIncomeName] = useState("");
  const [incomeQuantity, setIncomeQuantity] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseQuantity, setExpenseQuantity] = useState("");

  const addIncome = () =>{
    const text = incomeName.trim();
    const quantity = incomeQuantity.trim();
    if (text === "" || quantity === "") return;
    
    const newIncome = {
      id: crypto.randomUUID(),
      name: text,
      quantity: Number(quantity)
    };
    
    setIncome((prev)=>[[...prev, newIncome]])
    setIncomeName("");
    setIncomeQuantity("");
  };

    const addExpense = () =>{
    const text = expenseName.trim();
    const quantity = expenseQuantity.trim();
    if (text === "" || quantity === "") return;
    
    const newExpense = {
      id: crypto.randomUUID(),
      name: text,
      quantity: Number(quantity)
    };
    
    setExpense((prev)=>[[...prev, newExpense]])
    setExpenseName("");
    setExpenseQuantity("");
  };

  return (
    <>
      
    </>
  )
}

export default App
