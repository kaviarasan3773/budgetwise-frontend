import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const saveRegister = (e) => {
        e.preventDefault();
        if(userName.trim() === ""){
            toast.error("User Name is required");
            return;
        }
        if(email.trim() === ""){
            toast.error("Email is required");
            return;
        }
        if(password.trim() === ""){
            toast.error("Password is required");
            return;
        }
        if(password.length < 4){
            toast.error("Password must be at least 4 characters");
            return;
        }

        const registerDetails = {
            userName,
            email,
            password
        };

        axios.post("http://localhost:8080/api/auth/register", registerDetails)
            .then(response => {
                localStorage.setItem("token", response.data);
                toast.success("Registration Successful");
                navigate("/dashboard",{ replace: true });
            })
            .catch(error => {
                if(error.response){
                    toast.error(error.response.data);
                }
                else if(error.request){
                    toast.error("Unable to connect to server.");
                }
                else{
                    toast.error("Something went wrong.");
                }
            });  
    };

    return (

        <div className="registerPage">
            <h2>Register</h2>
            <form onSubmit={saveRegister}>
                <label>User Name :</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br /><br />

                <label>Email :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />

                <label>Password :</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <button type="submit">
                    Register
                </button>
            </form>
            <br />

            <div>
                Already have an account?{" "}
                <Link to="/">Login here</Link>
            </div>

        </div>

    );

};

export default Register;