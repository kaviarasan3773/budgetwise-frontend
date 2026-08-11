import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {

    return (

        <Router>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                   ========================= */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />


                {/* =========================
                    PROTECTED PAGES
                   ========================= */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<MainLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/income"
                            element={<Income />}
                        />

                        <Route
                            path="/expenses"
                            element={<Expenses />}
                        />

                        <Route
                            path="/investments"
                            element={<Investments />}
                        />

                        <Route
                            path="/reports"
                            element={<Reports />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                    </Route>

                </Route>

            </Routes>


            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />

        </Router>
    );
}

export default App;