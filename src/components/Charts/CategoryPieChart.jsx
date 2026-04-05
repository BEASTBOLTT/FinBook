import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CategoryPieChart = ({ data }) => {
    return (
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#2a2a2a] hover:border-[#D4AF37] transition-all duration-200">

            <h3 className="text-white text-lg mb-4">Expense Breakdown</h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Tooltip />
                    <Legend />

                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={["#22c55e", "#ef4444", "#facc15", "#3b82f6"][index % 4]}
                            />
                        ))}
                    </Pie>

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

export default CategoryPieChart;