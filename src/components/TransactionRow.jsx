

const TransactionRows = ({
    transactions,
    isAdmin,
    onEdit,
    variant = "full", 
    title
}) => {

   
    const displayData =
        variant === "recent"
            ? [...transactions]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
            : transactions;

    return (
        <div className="border border-[#666B74] rounded-2xl m-3 p-3 flex flex-col">

            {title && (
                <h2 className="text-white text-xl font-semibold mb-3 px-2">
                    {title}
                </h2>
            )}

            {variant === "full" && (
                <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] text-gray-400 px-4 py-2 text-sm border-b border-[#2a2a2a] sticky top-0 bg-[#0A0A0A] z-10">
                    <p>Transaction</p>
                    <p>Category</p>
                    <p>Date</p>
                    <p>Status</p>
                    <p className="text-right">Amount</p>
                </div>
            )}

            <div className="mt-3 overflow-y-auto no-scrollbar flex-1" style={{ maxHeight: "58vh" }}>

                {displayData.length === 0 ? (
                    <p className="text-[#666B74] mt-0 pl-5">No transactions found.</p>
                ) : (
                    displayData.map((transaction) => (

                        <div
                            key={transaction.id}
                            className="bg-[#111111] p-4 rounded-xl mb-3 border border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                        >

                            
                            <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] items-center">

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" ><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8" /></g></svg>
                                    </div>

                                    <p className="text-white font-semibold text-sm">
                                        {transaction.title}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-sm">
                                    {transaction.category}
                                </p>

                                <p className="text-gray-400">
                                    {transaction.date}
                                </p>

                                <p className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full w-fit text-xs">
                                    Completed
                                </p>

                                <div className="text-right">
                                    <p className={`font-semibold text-sm ${transaction.type === "income"
                                            ? "text-green-400"
                                            : "text-red-400"
                                        }`}>
                                        {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {transaction.type}
                                    </p>

                                    {isAdmin && (
                                        <button
                                            onClick={() => onEdit(transaction)}
                                            className="text-xs text-gray-500 hover:text-white mt-1"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>

                            </div>

                            
                            <div className="md:hidden flex flex-col gap-2">

                                
                                <div className="flex justify-between">
                                    <p className="text-white font-semibold">
                                        {transaction.title}
                                    </p>

                                    <p className={`font-semibold ${transaction.type === "income"
                                            ? "text-green-400"
                                            : "text-red-400"
                                        }`}>
                                        {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
                                    </p>
                                </div>

                               
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>{transaction.category}</span>
                                    <span>{transaction.date}</span>
                                </div>

                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 capitalize">
                                        {transaction.type}
                                    </span>

                                    {isAdmin && (
                                        <button
                                            onClick={() => onEdit(transaction)}
                                            className="text-xs text-[#D4AF37]"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>

                            </div>

                        </div>

                    ))
                )}

            </div>
        </div>
    );
};

export default TransactionRows;