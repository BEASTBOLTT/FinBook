import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import TransactionRows from "./TransactionRow";

const Transactions = ({ transactions, addTransaction, editTransaction, deleteTransaction, isAdmin, openAddModal }) => {

    // CSV Function
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
    // JSON Function
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
    // useStates
    const [editingT, setEditingT] = useState(null);
    const [formData, setFormData] = useState(null);
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
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className='bg-[#0A0A0A] border-l border-[#666B74] w-full'>
        {/* Sub Heading & Button */}
          <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-white text-4xl font-bold m-3 mb-1 w-fit'>Transactions</h1>
                  <p className="text-[#666B74] pl-3">Manage and track all your transactions</p>
            </div>
            
            <div className='place-content-center ml-5 flex'>
                  
                  {isAdmin && (
                      <button
                          onClick={openAddModal}
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
        {/* Search and Filter */}
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
        {/* Transactions List */}
        <TransactionRows
            transactions={displayTransactions}
            isAdmin={isAdmin}
            variant="full"
            onEdit={(transaction) => {
                setEditingT(transaction);
                setFormData({ ...transaction });
            }} />
        {/* Edit Transactions */}
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
        
    </div>
  )
}

export default Transactions
