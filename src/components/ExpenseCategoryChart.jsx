import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
    "#F97316",
    "#6366F1"
];


const ExpenseCategoryChart = ({ data }) => {

    if (!data || data.length === 0) {

        return (
            <div className="chart-empty">

                <div className="chart-icon">
                    📊
                </div>

                <h3>
                    No Expense Data
                </h3>

                <p>
                    No expenses found for the
                    selected period.
                </p>

            </div>
        );
    }


    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="45%"
                    outerRadius={105}
                    innerRadius={60}
                    paddingAngle={2}
                    label
                >

                    {data.map(
                        (entry, index) => (

                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        )
                    )}

                </Pie>


                <Tooltip
                    formatter={(value) =>
                        `₹${value}`
                    }
                />


                <Legend />

            </PieChart>

        </ResponsiveContainer>
    );
};

export default ExpenseCategoryChart;