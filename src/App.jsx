import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  //load from the storage or create an empty array if the user enters for the first time
  const [incomes, setIncome] = useState(()=>{
    const saved_income = localStorage.getItem("incomes");
    return saved_income ? JSON.parse(saved_income) : [];
  });

  const [expenses, setExpense] = useState(()=>{
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
    
    setIncome((prev)=>[...prev, newIncome]);
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
    
    setExpense((prev)=>[...prev, newExpense]);
    setExpenseName("");
    setExpenseQuantity("");
  };

  return (
    <>
      <h1>Revenue + Expenses Tracker ✅💵</h1>
      <div className="input-block">
        {/* revenue input  */}
        <p>Type your revenue here 👇🏽</p>
        <div className="revenue-input">
          <input type="text" placeholder='type the revenue name here...' value={incomeName} onChange={(e)=>{setIncomeName(e.target.value)}}/>
          <input type="number" min={0} placeholder='type the revenue amount here...' value={incomeQuantity} onChange={(e)=>{setIncomeQuantity(e.target.value)}}/>
          <button onClick={addIncome}>Add Income</button>
        </div>
         {/* expense input  */}
        <p>Type your expense here 👇🏽</p>
        <div className="expense-input">
          <input type="text" placeholder='type the expense name here...' value={expenseName} onChange={(e)=>{setExpenseName(e.target.value)}}/>
          <input type="number" min={0} placeholder='type the expense amount here...' value={expenseQuantity} onChange={(e)=>{setExpenseQuantity(e.target.value)}}/>
          <button onClick={addExpense}>Add Expense</button>
        </div>
      </div>
      <div className="tracker-block">
        {/* list of revenue  */}
        <ul>
          {incomes.map((income)=>(
            <li key={income.id}>
              <span>{income.name}</span>
              <span>{income.quantity}</span>
            </li>
          ))}
          <p>Total income: <span>{incomes.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
        </ul>
        {/* list of expenses  */}
        <ul>
          {expenses.map((expense)=>(
            <li key={expense.id}>
              <span>{expense.name}</span>
              <span>{expense.quantity}</span>
            </li>
          ))}
          <p>Total expenses: <span>{expenses.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
        </ul>
      </div>
    </>
  )
}

export default App
