import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Insights from "./components/Insights";
import Transactions from "./components/Transactions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';



function App() {

  const [isAdmin, setAdmin] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  }
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newT, setNewT] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: ""
  });


  function switchAdmin() {
    setAdmin(prev => !prev);
    isAdmin ? toast("Switched to Viewer Mode") : toast("Switched to Admin Mode");
  }



  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(newT) {
    setTransactions(prev => [
      ...prev,
      { ...newT, id: Date.now() }
    ]);

    setShowAddModal(false);

    setNewT({
      title: "",
      amount: "",
      category: "",
      type: "expense",
      date: ""
    });
    toast.success("Transaction added successfully!");
  }

  function editTransaction(updatedT) {
    setTransactions(prev =>
      prev.map(transaction => transaction.id === updatedT.id ? updatedT : transaction)
    );
    toast.success("Transaction updated successfully!");
  }

  function deleteTransaction(id) {
    setTransactions(prev =>
      prev.filter(transaction => transaction.id !== id)
    );
    toast.success("Transaction deleted successfully!");
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
                    openAddModal={() => setShowAddModal(true)}
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
                    editTransaction={editTransaction}
                    deleteTransaction={deleteTransaction}
                    openAddModal={() => setShowAddModal(true)}
                  />
                </div>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      {/* Adding Transaction */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-xl w-96">
            <h2 className="text-white text-xl mb-4">Add Transaction</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
              value={newT.title}
              onChange={(e) =>
                setNewT(prev => ({ ...prev, title: e.target.value }))
              } />


            <input
              type="number"
              placeholder="Amount"
              className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
              value={newT.amount}
              onChange={(e) =>
                setNewT(prev => ({ ...prev, amount: Number(e.target.value) }))
              } />


            <input
              type="text"
              placeholder="Category"
              className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
              value={newT.category}
              onChange={(e) =>
                setNewT(prev => ({ ...prev, category: e.target.value }))
              } />


            <select
              className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
              value={newT.type}
              onChange={(e) =>
                setNewT(prev => ({ ...prev, type: e.target.value }))
              }>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <DatePicker
              selected={newT.date ? new Date(newT.date) : null}
              onChange={(date) =>
                setNewT(prev => ({
                  ...prev,
                  date: date.toISOString().split("T")[0]
                }))
              }
              placeholderText="Select date"
              className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
            />


            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400">
                Cancel
              </button>

              <button
                onClick={() => {
                  addTransaction(newT);
                  setShowAddModal(false);
                  setNewT({
                    title: "",
                    amount: "",
                    category: "",
                    type: "expense",
                    date: ""
                  });
                }}
                className="text-green-500">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
