import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const saveLogin = (e) => {
        e.preventDefault();

        const loginDetails = {
            email,
            password
        };

        axios.post("http://localhost:8080/api/auth/login",loginDetails)
            .then(response =>{
              //  console.log(response.data);
                localStorage.setItem("token", response.data);
                toast.success("Login Successful");
                navigate("/dashboard",{ replace: true });
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    // Backend responded with an error (401, 403, 404...)
                    toast.error(error.response.data);
                } else if (error.request) {
                    // Request sent but no response received (server down)
                    toast.error("Unable to connect to the server. Please try again later.");
                } else {
                    // Some other error occurred while setting up the request
                    toast.error("Something went wrong. Please try again.");
                }
            });
    };

    return (
        <div className="loginPage">
            <form onSubmit={saveLogin}>
                <label>Email Id :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <label>Password :</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <button type="submit">Login</button>
            </form>
            <div>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login;