import { Link, useNavigate } from "react-router-dom";
import { BsDashLg } from "react-icons/bs";
import "./auth.css";
import { useState } from "react";
import api from "../../api/api";
import Footer from "../../components/footer";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const formData = { email, password, name };
      const res = await api.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      if (res.data.success) {
        navigate("/dashboard");
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
              marginBottom: "20px",
              marginLeft: "8px",
              fontWeight: 300,
            }}
          >
            Join JobBoard Now
            <BsDashLg style={{ verticalAlign: "middle", margin: "0 3px" }} />
            It's free
          </h6>
        </div>
        <div className='auth-box-outer'>
          <div className='auth-box'>
            <input className='auth-input' placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input className='auth-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <div style={{ position: "relative", display: "flex", width: "100%" }}>
              <input
                className='auth-input'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="password-input-label" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 'HIDE' : 'SHOW'}
              </p>
            </div>

            <button className={`auth-button ${loading ? 'isLoading' : ''}`} onClick={handleRegister} disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
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
                style={{ width: 22, height: 22, display: "inline-block" }}
              />
              Continue with Gmail
            </button>
          </div>
          <div className='auth-switch-container'>
            <p className='auth-switch'>
              Already have an account?{" "}
              <Link to='/login' style={{ textDecoration: "underline" }}>
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
