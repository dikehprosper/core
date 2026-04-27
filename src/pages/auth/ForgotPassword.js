import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./auth.css";
import Footer from "../../components/footer";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            const formData = { email };
            console.log(formData);
            const res = await api.post("/auth/forgot-password", formData);
            if (res.data.success) {
                setSuccess("A reset link will be sent if the account exists. Please check your email.");
            }
        } catch (err) {
            setError(
                // err.response?.data?.message || 
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    
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
                        Forgot Password?
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
                        Enter your email to receive a password reset link
                    </p>
                 {success && <p className="success-text">{success}</p>}                        
                </div>
                <div className='auth-box-outer'>
                    <div className='auth-box'>
                        <input
                            className='auth-input'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                     
                        <button className={`auth-button custom-addition ${loading ? 'isLoading' : ''}`} onClick={handleForgotPassword} disabled={loading}>
                            {loading ? "Loading..." : "Send Email Reset Link"}
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
