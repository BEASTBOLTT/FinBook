import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Transactions = ({ transactions, addTransaction, editTransaction, deleteTransaction, isAdmin }) => {

    function handleExportCSV() {
        if (transactions.length === 0) {
            alert("No transactions to export");
            return;
        }

        const headers = ["Title", "Amount", "Category", "Type", "Date"];

        const rows = transactions.map(transaction => [
            transaction.title,
            transaction.amount,
            transaction.category,
            transaction.type,
            transaction.date
        ]);

        const csvContent =
            [headers, ...rows]
                .map(row => row.join(","))
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        link.click();
    }

    function handleExportJSON() {
        if (transactions.length === 0) {
            alert("No transactions to export");
            return;
        }

        const blob = new Blob(
            [JSON.stringify(transactions, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.json";
        link.click();
    }

    const [editingT, setEditingT] = useState(null);
    const [formData, setFormData] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newT, setNewT] = useState({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: ""
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [showExportMenu, setShowExportMenu] = useState(false);

    const displayTransactions = transactions.filter(transaction => {
        if (filterType === "all") return true;
        return transaction.type === filterType;
    }).filter(transaction => {
        return (
            transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

  return (
    <div className='bg-[#0A0A0A] border-l border-[#666B74] h-screen w-full'>
        
        <div className='flex'>
            <div>
                <h1 className='text-white text-4xl font-bold m-3 mb-1 w-fit'>Transactions</h1>
                  <p className="text-[#666B74] pl-3">Manage and track all your transactions</p>
            </div>
            
            <div className='place-content-center absolute right-0 ml-5 flex'>
                  
                  {isAdmin && (
                      <button
                          onClick={() => setShowAddModal(true)}
                          className="bg-[#D4AF37] text-black px-3 py-1 rounded-lg m-5 mr-1 hover:bg-[#a98e35]"
                      >
                          + Add Transaction
                      </button>
                  )}
                  <div>
                      <button
                          onClick={() => setShowExportMenu(prev => !prev)}
                          className="bg-[#D4AF37] text-black px-3 py-1 rounded-lg m-5 mr-1 ml-1 hover:bg-[#a98e35]">
                          Export
                      </button>
                      {showExportMenu && (
                          <div className="absolute right-0 mt-2 w-36 bg-[#111111] border border-[#2a2a2a] rounded-lg shadow-lg z-10">

                              <button
                                  onClick={() => {
                                      handleExportCSV();
                                      setShowExportMenu(false);
                                  }}
                                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1a1a1a]"
                              >
                                  Export CSV
                              </button>

                              <button
                                  onClick={() => {
                                      handleExportJSON();
                                      setShowExportMenu(false);
                                  }}
                                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1a1a1a]"
                              >
                                  Export JSON
                              </button>
                          </div>
                      )}
                  </div>
            </div>
            
        </div>
          <div className="flex items-center justify-between px-4 mt-4 mb-3">

              <input
                  type="text"
                  placeholder=" Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111111] border border-[#2a2a2a] text-white px-3 py-2 rounded-lg outline-none w-full mr-2"
              />

              <div className="flex gap-2">

                  <button
                      onClick={() => setFilterType("all")}
                      className={`px-3 py-1 rounded-lg text-sm ${filterType === "all"
                          ? "bg-[#D4AF37] text-black"
                          : "bg-[#111111] text-gray-400"
                          }`}
                  >
                      All
                  </button>

                  <button
                      onClick={() => setFilterType("income")}
                      className={`px-3 py-1 rounded-lg text-sm ${filterType === "income"
                          ? "bg-green-500 text-black"
                          : "bg-[#111111] text-gray-400"
                          }`}
                  >
                      Income
                  </button>

                  <button
                      onClick={() => setFilterType("expense")}
                      className={`px-3 py-1 rounded-lg text-sm ${filterType === "expense"
                          ? "bg-red-500 text-black"
                          : "bg-[#111111] text-gray-400"
                          }`}
                  >
                      Expense
                  </button>

              </div>

          </div>
        <div className="border border-[#666B74] rounded-2xl m-3 p-3">
              <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] text-gray-400 px-4 py-2 text-sm border-b border-[#2a2a2a]">
                  <p>Transaction</p>
                  <p>Category</p>
                  <p> Date</p>
                  <p> Status</p>
                  <p className="text-right">Amount</p>
              </div>
              <div className='mt-5 overflow-y-auto no-scrollbar' style={{ maxHeight: "65vh" }}>
                  {
                      displayTransactions.length === 0
                          ? (<p className='text-[#666B74] mt-0 pl-5'>No transactions found.</p>)
                          : (
                              displayTransactions.map(
                                  transaction => (
                                      <div key={transaction.id}
                                          className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] items-center bg-[#111111] p-4 rounded-xl mb-3 border border-[#2a2a2a] hover:bg-[#1a1a1a] transition">

                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" ><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8" /></g></svg>
                                              </div>

                                              <div>
                                                  <p className="text-white font-semibold text-sm">{transaction.title}</p>
                                              </div>
                                          </div>

                                          <p className="text-gray-400 text-sm">{transaction.category}</p>

                                          <p className="text-gray-400">{transaction.date}</p>

                                          <p className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full w-fit text-xs">
                                              Completed
                                          </p>

                                          <div className="text-right">
                                              <p className={`font-semibold text-sm ${transaction.type === "income" ? "text-green-400" : "text-red-400"
                                                  }`}>
                                                  {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                                              </p>

                                              <p className="text-xs text-gray-400">
                                                  {transaction.type}
                                              </p>

                                              {isAdmin && (
                                                  <button
                                                      onClick={() => {
                                                          setEditingT(transaction);
                                                          setFormData({ ...transaction });
                                                      }}
                                                      className="text-xs text-gray-500 hover:text-white mt-1">
                                                      Edit
                                                  </button>
                                              )}
                                          </div>

                                      </div>
                                  )
                              )
                          )
                  }
              </div>
        </div>
        
        {editingT && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                <div className="bg-[#111111] p-6 rounded-xl w-96">
                    <h2 className="text-white text-xl mb-4">Edit Transaction</h2>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, title: e.target.value }))
                        }
                        className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
                    />

                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))
                        }
                        className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => {
                                deleteTransaction(editingT.id);
                                setEditingT(null);
                                setFormData(null);
                            }}
                            className="text-red-500">
                            Delete
                        </button>

                        
                        <button
                            onClick={() => {
                                editTransaction(formData);
                                setEditingT(null);
                                setFormData(null);
                            }}
                            className="text-green-500">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}
        {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-[#111111] p-6 rounded-xl w-96">
                    <h2 className="text-white text-xl mb-4">Add Transaction</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
                        value={newT.title}
                        onChange={(e) =>
                            setNewT(prev => ({ ...prev, title: e.target.value }))
                        }/>

                    
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full mb-3 p-2 bg-black text-white border border-gray-600 rounded"
                        value={newT.amount}
                        onChange={(e) =>
                            setNewT(prev => ({ ...prev, amount: Number(e.target.value) }))
                        }/>

                    
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

export default Transactions
