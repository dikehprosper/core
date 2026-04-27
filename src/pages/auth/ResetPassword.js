import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./auth.css";
import api from "../../api/api";
import Footer from "../../components/footer";
import { isPasswordValid } from "../../utils/helpers";


export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();


    const ResetPassword = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            if (isPasswordValid(password).isValid === false) {
                setError(isPasswordValid(password).generalFailureMessage);
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
          
            const formData = { password, confirmPassword };
            const res = await api.post(`/auth/reset/${token}`, formData);
            if (res.data.success) {
                setSuccess("Password reset was successful. Redirecting you to SignIn page...");
                setTimeout(() => {
                navigate("/login")
                }, 700)
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 
                "Something went wrong"
            );
        } finally {
            setLoading(false);
            setLoading(false);
        }
    };


    // const handleReset = async () => {
    //     try {
    //         setLoading(true);
    //         setMessage("");

    //         await axios.post(
    //             `http://localhost:5001/api/auth/reset-password/${token}`,
    //             { password }
    //         );

    //         setMessage("Password updated successfully");

    //         setTimeout(() => {
    //             navigate("/login");
    //         }, 2000);

    //     } catch (err) {
    //         setMessage(
    //             err.response?.data?.message || "Something went wrong"
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className='auth-page-outer'>
            <nav className='auth-nav'>
                <a href='/'>
                    <h2>JobBoard</h2>
                </a>
            </nav>
            <div className='auth-page'>
                <div className='auth-page-header'>
                    <h6
                        style={{
                            fontSize: "22px",
                            marginBottom: "2px",
                            marginLeft: "8px",
                            fontWeight: 300,
                        }}
                    >
                        Reset Password
                    </h6>
                    <p
                        style={{
                            fontSize: "15px",
                            marginBottom: "14px",
                            marginLeft: "8px",
                            fontWeight: 100,
                            opacity: 0.6,
                            fontStyle: "italic"
                        }}
                    >
                        Enter your new Password and Confirm it to reset your password
                    </p>
                    {success && <p className="success-text">{success}</p>}
                </div>
                <div className='auth-box-outer'>
                    <div className='auth-box'>
                        <div style={{ position: "relative", display: "flex", width: "100%" }}>
                            <input
                                className='auth-input'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="password-input-label" onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? 'HIDE' : 'SHOW'}
                            </p>
                        </div>
                        <input
                            className='auth-input'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className={`auth-button custom-addition ${loading ? 'isLoading' : ''}`} onClick={ResetPassword} disabled={loading}>
                            {loading ? "Loading..." : "Reset Password"}
                            {error && <p className="error-text">{error}</p>}
                        
                        </button>

                    </div>
                    <div className='auth-switch-container'>
                        <p className='auth-switch'>
                            Remember your password? <Link to='/login' style={{ textDecoration: "underline" }}>SignIn</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
