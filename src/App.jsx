import { useState, useEffect } from 'react'
import './App.css'
import BudgetChart from './components/BudgetChart';
import BudgetSpending from './components/BudgetSpending';

function App() {

  //load from the storage or create an empty array if the user enters for the first time
  const [incomes, setIncome] = useState(()=>{
    const saved_income = localStorage.getItem("incomes");
    return saved_income ? JSON.parse(saved_income) : [];
  });

  const [expenses, setExpense] = useState(()=>{
    const saved_expense = localStorage.getItem("expenses");
    return saved_expense ? JSON.parse(saved_expense) : [];
  });

  const [expenseCategory, setExpenseCategory] = useState("");

  //reading input values
  const [incomeName, setIncomeName] = useState("");
  const [incomeQuantity, setIncomeQuantity] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseQuantity, setExpenseQuantity] = useState("");

// add income function
  const addIncome = () =>{
    const text = incomeName.trim();
    const quantity = incomeQuantity.trim();
    if (text === "" || quantity === "") return;
    
    const newIncome = {
      id: crypto.randomUUID(),
      name: text,
      quantity: Number(quantity),
    };
    
    setIncome((prev)=>[...prev, newIncome]);
    setIncomeName("");
    setIncomeQuantity("");
  };

// add expense function
    const addExpense = () =>{
    const text = expenseName.trim();
    const quantity = expenseQuantity.trim();
    if (text === "" || quantity === "" || expenseCategory === "") return;
    
    const newExpense = {
      id: crypto.randomUUID(),
      name: text,
      quantity: Number(quantity),
      category: expenseCategory,
    };
    
    setExpense((prev)=>[...prev, newExpense]);
    setExpenseName("");
    setExpenseQuantity("");
    setExpenseCategory("");
  };
  //delete income
  const deleteIncome = (id) =>{
    setIncome((prev)=>prev.filter((income)=> income.id !== id))
  }

  //delete expense
  const deleteExpense = (id) =>{
    setExpense((prev)=>prev.filter((expense)=> expense.id !== id))
  }

 // save incomes and expenses whenever they change
  useEffect(()=>{
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className='container'>
      <h1>Revenues + Expenses Tracker ✅💵</h1>
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
          <select value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)}>
              <option value="">Select Category...</option>
              <option value="Needs">Needs</option>
              <option value="Wants">Wants</option>
              <option value="Savings">Savings</option>
          </select>
          <button onClick={addExpense}>Add Expense</button>
        </div>
      </div>
      <div className="tracker-block">
        {/* list of revenue  */}
        <ul>
          {incomes.map((income)=>(
            <li className='incomes-list' key={income.id}>
              <span>{income.name}</span>
              <span>{income.quantity}</span>
              <button onClick={() => deleteIncome(income.id)}>❌</button>
            </li>
          ))}
          <p>Total income: <span>{incomes.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
        </ul>
        {/* list of expenses  */}
        <ul>
          {expenses.map((expense)=>(
            <li className='expenses-list' key={expense.id}>
              <span>{expense.name}</span>
              <span>{expense.quantity}</span>
              <span className={`category-tag ${expense.category}`}>{expense.category}</span>
              <button onClick={() => deleteExpense(expense.id)}>❌</button>
            </li>
          ))}
          <p>Total expenses: <span>{expenses.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
        </ul>
      </div>
      <div className="summary-block">
          {(()=> {
          const total_expenses = expenses.reduce((acc, item) => acc + item.quantity, 0);
          const total_incomes = incomes.reduce((acc, item) => acc + item.quantity, 0);
          const total_left = total_incomes - total_expenses;
          const getTotalByCategory = (category) =>{
            return expenses.filter(exp => exp.category === category).reduce((acc, item) => acc + item.quantity, 0)
          }
          return (
            <>
               <h3>Total: <span className={total_left < 0 ? "negative" : total_left > 0 ? "positive" : "neutral"}>{total_left}</span></h3>
              {incomes.length > 0 
              ? <> 
                <h4>Expenses breakout:</h4><br/>
                {/* Budget Chart  */}
                <p>(This is how you should spend your budget according to 50/30/20)</p>
                <BudgetChart total_income={total_incomes} />
                </> : null}
               {expenses.length > 0 
               ? 
              <>
                <p>This is how you spend your budget</p>
                <BudgetSpending needs={getTotalByCategory("Needs")} wants={getTotalByCategory("Wants")} savings={getTotalByCategory("Savings")}/>
              </>
               :null}
            </>
          )
          })()}
      </div>
    </div>
  )
}

export default App;
