import { BrowserRouter, Route, Routes } from "react-router-dom"
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
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header isAdmin={isAdmin} click={switchAdmin} />
      <BrowserRouter>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          {/* Routing */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0A0A0A]">
            <Routes>
              <Route path="/" element={
                <div className="flex">
                  <Dashboard
                    isAdmin={isAdmin}
                    transactions={transactions}
                    addTransaction={addTransaction}
                  />
                </div>
              } />
              <Route path="/Insights" element={
                <div className="flex">
                  <Insights
                    transactions={transactions} />
                </div>} />
              <Route path="/transactions" element={
                <div className="flex">
                  <Transactions
                    isAdmin={isAdmin}
                    transactions={transactions}
                    addTransaction={addTransaction}
                    editTransaction={editTransaction}
                    deleteTransaction={deleteTransaction}
                  />
                </div>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
