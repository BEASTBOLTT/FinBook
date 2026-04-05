import CategoryPieChart from "./Charts/CategoryPieChart";
import IncomeExpenseChart from "./Charts/IncomeExpenseChart";
import SummaryCard from "./SummaryCard"


const Dashboard = ({isAdmin, openAddModal, transactions}) => {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  // Calculate summary values
  const totalBalance = transactions.reduce((sum, transaction) => {
    return sum + (transaction.type === "income" ? parseFloat(transaction.amount) : -parseFloat(transaction.amount));
  }, 0);

  const totalIncome = transactions
    .filter(txn => txn.type === "income")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const totalExpense = transactions
    .filter(txn => txn.type === "expense")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
  
  const thisMonthTransactions = transactions.filter(transaction => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const chartData = thisMonthTransactions.map(t => ({
    date: t.date,
    income: t.type === "income" ? t.amount : 0,
    expense: t.type === "expense" ? t.amount : 0
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const categoryMap = {};

  thisMonthTransactions.forEach(t => {
    if (t.type === "expense") {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));


  return (
    <div className='bg-[#0A0A0A] border-l border-[#666B74] h-screen w-full'>
      <div className='flex'>
        <h1 className='text-white text-4xl font-bold m-3 w-fit'>Dashboard</h1>
        {
            isAdmin ? <button onClick={openAddModal} className='bg-[#D4AF37] absolute right-0 text-black px-3 py-1 rounded-lg m-5'>+ Add Transaction</button>:null
        }
      </div>
      {/* General Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        <SummaryCard
          title="Total Balance"
          value={totalBalance}
          color="text-[#D4AF37]"
          bg="bg-yellow-500/20"
          subtext="Overall"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M5 19V5zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm7-2V9h-7v6zm-2.937-1.937q.437-.438.437-1.063t-.437-1.062T16 10.5t-1.062.438T14.5 12t.438 1.063T16 13.5t1.063-.437" /></svg>}
        />

        <SummaryCard
          title="Income"
          value={totalIncome}
          color="text-green-400"
          bg="bg-green-500/20"
          subtext="Overall"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" ><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path d="m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5" /></g></svg>}
        />

        <SummaryCard
          title="Expenses"
          value={totalExpense}
          color="text-red-400"
          bg="bg-red-500/20"
          subtext="Overall"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" ><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path d="m7 10l2.293 2.293a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 1 1.414 0L17 14m0 0v-2.5m0 2.5h-2.5" /></g></svg>}
        />

      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* INCOME VS EXPENSE */}
        <IncomeExpenseChart data={chartData} />

        {/* CATEGORY PIE */}
        <CategoryPieChart data={pieData} />

      </div>
    </div>
  )
}

export default Dashboard
