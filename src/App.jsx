import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from "react-router-dom"
import Header from "./components/Header"
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Insights from "./components/Insights";
import Transactions from "./components/Transactions";

function App() {

  const [isAdmin, setAdmin] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  }
  );


  function switchAdmin() {
    setAdmin(prev => !prev);
  }



  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(newT) {
    setTransactions(prev => [
      ...prev,
      { ...newT, id: Date.now() }
    ]);
  }

  function editTransaction(updatedT) {
    setTransactions(prev =>
      prev.map(transaction => transaction.id === updatedT.id ? updatedT : transaction)
    );
  }

  function deleteTransaction(id) {
    setTransactions(prev =>
      prev.filter(transaction => transaction.id !== id)
    );
  }


  return (
    <div>
      <Header isAdmin={isAdmin} click={switchAdmin} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="flex">
              <Sidebar />
              <Dashboard
                isAdmin={isAdmin}
                transactions={transactions}
                addTransaction={addTransaction}
              />
            </div>
          } />
          <Route path="/Insights" element={
            <div className="flex">
              <Sidebar />
              <Insights 
              transactions = {transactions}/>
            </div>} />
          <Route path="/transactions" element={
            <div className="flex">
              <Sidebar />
              <Transactions
                isAdmin={isAdmin}
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
              />
            </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
