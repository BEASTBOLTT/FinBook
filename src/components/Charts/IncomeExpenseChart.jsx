import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const IncomeExpenseChart = ({ data }) => {
    return (
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a] hover:border-[#D4AF37] transition-all duration-200">

            <h3 className="text-white text-lg mb-4">Income vs Expense</h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <Legend />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />

                    <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
};

export default IncomeExpenseChart;