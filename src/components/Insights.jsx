import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend} from "recharts";

const Insights = ({transactions}) => {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthTransactions = transactions.filter(transaction => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  let totalIncome = 0;
  let totalExpense = 0;

  thisMonthTransactions.forEach(transaction => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  const netSavings = totalIncome - totalExpense;

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

  let topCategory = "N/A";
  let maxValue = 0;

  pieData.forEach(item => {
    if (item.value > maxValue) {
      maxValue = item.value;
      topCategory = item.name;
    }
  });

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return (
      date.getMonth() === lastMonth &&
      date.getFullYear() === lastMonthYear
    );
  });

  let lastMonthExpense = 0;

  lastMonthTransactions.forEach(t => {
    if (t.type === "expense") {
      lastMonthExpense += t.amount;
    }
  });
  let expenseChange = 0;

  if (lastMonthExpense > 0) {
    expenseChange = ((totalExpense - lastMonthExpense) / lastMonthExpense) * 100;
  }
  let spendingRatio = 0;

  if (totalIncome > 0) {
    spendingRatio = (totalExpense / totalIncome) * 100;
  }

  const savingsText = netSavings > 0
      ? `You saved ₹${netSavings} this month`
      : "You spent more than you earned";


  return (
    <div className='bg-[#0A0A0A] border-l border-[#666B74] w-full'>
      <h1 className='text-white text-4xl font-bold m-3 mb-1 w-fit'>Insights</h1>
      <p className="text-[#666B74] pl-3 mt-1">Smart analysis and recommendations for your finances</p>
      {/* General Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a] flex flex-col gap-4 hover:border-[#D4AF37] transition-all duration-200 ">

          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" ><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path  d="m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5" /></g></svg>
          </div>

          <p className="text-gray-400 text-sm">
            Monthly Income
          </p>

          <h2 className="text-white text-3xl font-bold tracking-tight">
            ₹{totalIncome}
          </h2>
          
          <p className="text-green-400 text-sm">
            This month
          </p>

        </div>

          
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a] flex flex-col gap-4 hover:border-[#D4AF37] transition-all duration-200">

          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" ><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path  d="m7 10l2.293 2.293a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 1 1.414 0L17 14m0 0v-2.5m0 2.5h-2.5" /></g></svg>
          </div>

          <p className="text-gray-400 text-sm">
            Monthly Expenses
          </p>

          <h2 className="text-white text-3xl font-bold tracking-tight">
            ₹{totalExpense}
          </h2>

          <p className="text-red-400 text-sm">
            This month
          </p>

          </div>

          
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a] flex flex-col gap-4 hover:border-[#D4AF37] transition-all duration-200">

          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M5.925 21q-.575 0-1.112-.4t-.713-.975q-.625-2.1-1.025-3.637t-.638-2.7t-.337-2.063T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.675-.9 1.713-1.45T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.55t-.138.6L19.825 7.5H21q.425 0 .713.288T22 8.5v5.25q0 .325-.187.575t-.513.375l-2.125.7l-1.25 4.175q-.2.65-.725 1.038T16 21h-2q-.825 0-1.412-.587T12 19h-2q0 .825-.587 1.413T8 21zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.975t.187-.925q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 1.025.525 3.513T6 19m10.713-8.287Q17 10.425 17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11t.713-.288M12 9q.425 0 .713-.288T13 8t-.288-.712T12 7H9q-.425 0-.712.288T8 8t.288.713T9 9zm0 2.55" /></svg>
          </div>

          <p className="text-gray-400 text-sm">
            Net Savings
          </p>

          <h2 className="text-white text-3xl font-bold tracking-tight">
            ₹{netSavings}
          </h2>

          <p className="text-yellow-400 text-sm">
            This month
          </p>

          </div>

      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

        {/* INCOME VS EXPENSE */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <h3 className="text-white text-lg mb-4">Income vs Expense</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <Legend />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />

              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY PIE */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <h3 className="text-white text-lg mb-4">Expense Breakdown</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>`${name}: ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={["#22c55e", "#ef4444", "#facc15", "#3b82f6"][index % 4]}
                  />
                ))}
              </Pie>
            </PieChart>
            
          </ResponsiveContainer>
        </div>

      </div>
      {/* Smart Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

        {/* TOP CATEGORY */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <p className="text-gray-400 text-sm">Top Spending Category</p>
          <h3 className="text-white text-xl mt-2 font-semibold">
            {topCategory}
          </h3>
        </div>

        {/* MONTHLY COMPARISON */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <p className="text-gray-400 text-sm">Monthly Comparison</p>
          <h3 className={`text-xl mt-2 font-semibold ${expenseChange > 0 ? "text-red-400" : "text-green-400"
            }`}>
            {expenseChange.toFixed(1)}%
          </h3>
          <p className="text-gray-500 text-sm">vs last month</p>
        </div>

        {/* SPENDING RATIO */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <p className="text-gray-400 text-sm">Spending Ratio</p>
          <h3 className="text-white text-xl mt-2 font-semibold">
            {spendingRatio.toFixed(0)}%
          </h3>
        </div>

        {/* SAVINGS */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a]hover:scale-[1.02] hover:border-[#D4AF37] transition-all duration-200">
          <p className="text-gray-400 text-sm">Savings Insight</p>
          <h3 className="text-white text-lg mt-2">
            {savingsText}
          </h3>
        </div>

      </div>
    </div>
  )
}

export default Insights
