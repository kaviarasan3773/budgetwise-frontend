import { Link } from "react-router-dom";

const About = () => {

    return (
        <div className="about-page">

            {/* HERO */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <h1>
                        Take Control of Your Money
                    </h1>

                    <p>
                        BudgetWise helps you track your
                        income, expenses, savings and
                        investments in one place.
                    </p>

                    <div className="about-hero-buttons">

                        <Link
                            to="/dashboard"
                            className="about-primary-button"
                        >
                            Go to Dashboard
                        </Link>

                        <Link
                            to="/"
                            className="about-secondary-button"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </section>


            {/* WHAT IS BUDGETWISE */}

            <section className="about-section">

                <h2>
                    What is BudgetWise?
                </h2>

                <p>
                    BudgetWise is a personal finance management
                    application designed to help users understand
                    and manage their financial activities.
                </p>

                <p>
                    Users can record their income, track expenses,
                    manage investments and analyze their financial
                    progress through dashboards and reports.
                </p>

            </section>


            {/* FEATURES */}

            <section className="about-section">

                <h2>
                    BudgetWise Features
                </h2>


                <div className="about-feature-grid">

                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            💰
                        </div>

                        <h3>
                            Income Tracking
                        </h3>

                        <p>
                            Record salary and other income sources
                            and understand your total earnings.
                        </p>

                    </div>


                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            🧾
                        </div>

                        <h3>
                            Expense Tracking
                        </h3>

                        <p>
                            Record and categorize daily expenses
                            to understand where your money goes.
                        </p>

                    </div>


                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            📈
                        </div>

                        <h3>
                            Investment Tracking
                        </h3>

                        <p>
                            Track SIPs and other investments separately
                            from your regular expenses.
                        </p>

                    </div>


                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            📊
                        </div>

                        <h3>
                            Financial Dashboard
                        </h3>

                        <p>
                            View income, expenses, savings and
                            investments through a single dashboard.
                        </p>

                    </div>


                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            🔎
                        </div>

                        <h3>
                            Flexible Analysis
                        </h3>

                        <p>
                            Analyze your finances using today,
                            weekly, monthly, yearly and custom
                            date ranges.
                        </p>

                    </div>


                    <div className="about-feature-card">

                        <div className="about-feature-icon">
                            📋
                        </div>

                        <h3>
                            Reports
                        </h3>

                        <p>
                            Analyze financial trends and understand
                            your spending and saving patterns.
                        </p>

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}

            <section className="about-section">

                <h2>
                    How BudgetWise Works
                </h2>


                <div className="about-steps">

                    <div className="about-step">

                        <span>1</span>

                        <div>
                            <h3>
                                Add Your Income
                            </h3>

                            <p>
                                Record salary and other sources
                                of income.
                            </p>
                        </div>

                    </div>


                    <div className="about-step">

                        <span>2</span>

                        <div>
                            <h3>
                                Track Your Expenses
                            </h3>

                            <p>
                                Record your daily spending and
                                categorize each expense.
                            </p>
                        </div>

                    </div>


                    <div className="about-step">

                        <span>3</span>

                        <div>
                            <h3>
                                Record Investments
                            </h3>

                            <p>
                                Track SIPs and other investments
                                separately.
                            </p>
                        </div>

                    </div>


                    <div className="about-step">

                        <span>4</span>

                        <div>
                            <h3>
                                Analyze Your Finances
                            </h3>

                            <p>
                                Use the dashboard and reports to
                                understand your financial position.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="about-cta">

                <h2>
                    Start Managing Your Finances Better
                </h2>

                <p>
                    Keep your income, expenses and investments
                    organized with BudgetWise.
                </p>

                <Link
                    to="/dashboard"
                    className="about-primary-button"
                >
                    Go to Dashboard
                </Link>

            </section>

        </div>
    );
};

export default About;