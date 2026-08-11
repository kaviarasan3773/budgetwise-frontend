import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


const FinancialOverviewChart = ({ data }) => {


    if (!data || data.length === 0) {

        return (
            <div className="chart-empty">

                <div className="chart-icon">
                    📈
                </div>

                <h3>
                    No Financial Data
                </h3>

                <p>
                    No income, expense or investment
                    data found for the selected period.
                </p>

            </div>
        );
    }


    // =========================
    // FORMAT MONTH FOR DISPLAY
    // =========================

    const formatMonth = (monthKey) => {

        if (!monthKey) {
            return "";
        }

        const [year, month] =
            monthKey.split("-");

        const date = new Date(
            Number(year),
            Number(month) - 1
        );

        return `${date.toLocaleString("en-US", {
            month: "long"
        })}-${year}`;
    };


    // =========================
    // CHART DATA
    // =========================

    const chartData = data.map(item => ({
        ...item,

        displayMonth:
            formatMonth(item.month)
    }));


    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 10
                }}
            >

                <CartesianGrid
                    strokeDasharray="3 3"
                />


                {/* =========================
                    X AXIS
                   ========================= */}

                <XAxis
                    dataKey="displayMonth"
                />


                <YAxis />


                {/* =========================
                    TOOLTIP
                   ========================= */}

                <Tooltip
                    formatter={(value) =>
                        `₹${value}`
                    }
                />


                <Legend />


                {/* =========================
                    INCOME
                   ========================= */}

                <Bar
                    dataKey="income"
                    name="Income"
                    fill="#10B981"
                    radius={[
                        5,
                        5,
                        0,
                        0
                    ]}
                />


                {/* =========================
                    EXPENSE
                   ========================= */}

                <Bar
                    dataKey="expenses"
                    name="Expenses"
                    fill="#EF4444"
                    radius={[
                        5,
                        5,
                        0,
                        0
                    ]}
                />


                {/* =========================
                    INVESTMENTS
                   ========================= */}

                <Bar
                    dataKey="investments"
                    name="Investments"
                    fill="#4F46E5"
                    radius={[
                        5,
                        5,
                        0,
                        0
                    ]}
                />

            </BarChart>

        </ResponsiveContainer>
    );
};


export default FinancialOverviewChart;