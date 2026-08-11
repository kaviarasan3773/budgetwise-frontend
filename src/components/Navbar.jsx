import {
    BriefcaseBusiness,
    LayoutDashboard,
    Receipt,
    WalletCards,
    TrendingUp,
    FileText,
    User
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Navbar.css";


const Navbar = () => {

    const navigate = useNavigate();

    const location = useLocation();


    const logout = () => {

        localStorage.removeItem("token");

        toast.success(
            "Logged out successfully"
        );

        navigate("/", {
            replace: true
        });
    };


    const isActive = (path) => {

        return location.pathname === path
            ? "active"
            : "";
    };


    return (

        <nav className="navbar">


            {/* =========================
                LOGO
               ========================= */}

            <div className="navbar-logo">

                <Link to="/about">

                    <BriefcaseBusiness
                        className="navbar-icon"
                    />

                    <span>
                        BudgetWise
                    </span>

                </Link>

            </div>


            {/* =========================
                MENU
               ========================= */}

            <div className="navbar-menu">

                <Link
                    to="/dashboard"
                    className={isActive("/dashboard")}
                >

                    <LayoutDashboard
                        className="navbar-icon"
                    />

                    <span>
                        Dashboard
                    </span>

                </Link>


                <Link
                    to="/expenses"
                    className={isActive("/expenses")}
                >

                    <Receipt
                        className="navbar-icon"
                    />

                    <span>
                        Expenses
                    </span>

                </Link>


                <Link
                    to="/income"
                    className={isActive("/income")}
                >

                    <WalletCards
                        className="navbar-icon"
                    />

                    <span>
                        Income
                    </span>

                </Link>


                <Link
                    to="/investments"
                    className={isActive("/investments")}
                >

                    <TrendingUp
                        className="navbar-icon"
                    />

                    <span>
                        Investments
                    </span>

                </Link>


                <Link
                    to="/reports"
                    className={isActive("/reports")}
                >

                    <FileText
                        className="navbar-icon"
                    />

                    <span>
                        Reports
                    </span>

                </Link>

            </div>


            {/* =========================
                USER
               ========================= */}

            <div className="navbar-user">

                <Link
                    to="/profile"
                    className={isActive("/profile")}
                >

                    <User
                        className="navbar-icon"
                    />

                    <span>
                        Profile
                    </span>

                </Link>


                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


        </nav>
    );
};


export default Navbar;