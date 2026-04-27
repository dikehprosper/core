import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import {BsDashLg} from "react-icons/bs";
import api from "../../api/api";
import Footer from "../../components/footer";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const formData = { email, password };
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
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
              marginBottom: "20px",
              marginLeft: "8px",
              fontWeight: 300,
            }}
          >
            Welcome Back
            <BsDashLg style={{verticalAlign: "middle", margin: "0 3px"}} />
            Sign In
          </h6>
        </div>
        <div className='auth-box-outer'>
          <div className='auth-box'>
            <input
              className='auth-input'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{position: "relative", display: "flex", width: "100%"}}>
              <input
                className='auth-input'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                className="password-input-label"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </p>
              <Link to='/forgotpassword' className="password-forgot-password" style={{ textDecoration: "underline" }}>Forgot Password?</Link>
            </div>
            <button className={`auth-button ${loading ? 'isLoading' : ''}`} onClick={handleLogin} disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
              {error && <p className="error-text">{error}</p>} 
            </button>
          
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 0 10px 0",
              }}
            >
              <div className='auth-button-dashes' />
              <span className='auth-button-dashes-span'>OR</span>
              <div className='auth-button-dashes' />
            </div>
            <button className='gmail-button'>
              <img
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Gmail'
                style={{width: 22, height: 22, display: "inline-block"}}
              />
              Continue with Gmail
            </button>
          </div>
          <div className='auth-switch-container'>
            <p className='auth-switch'>
              Don't have an account? <Link to='/register' style={{ textDecoration: "underline"}}>Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
