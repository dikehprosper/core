import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { BsDashLg } from "react-icons/bs";
import Footer from "../../components/organisms/footer";
import {
  useLoginMutation,
  useLoginWithGoogleMutation,
} from "../../redux/services/auth";
import { isPasswordValid, isValidateEmail } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { updateClientData } from "../../redux/features/client";
import { APP_PAGES } from "../../utils/navigationRoutes";
import { useGoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "./GoogleAuth";

export default function Login() {
  const dispatch = useDispatch();

  // Controlled form state for login inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Centralized error state for UI feedback
  const [isError, setIsError] = useState({
    email: null,
    password: null,
    message: null,
    customMessage: null,
  });

  // Error state for UI feedback on Google login failures
  const [isGoogleErrorMessage, setIsGoogleErrorMessage] = useState(null);

  // RTK Query login mutation hook
  const [
    doLogin,
    {
      data: loginData,
      isSuccess: loginSuccessful,
      isError: isLoginError,
      error: loginError,
      isLoading: loginLoading,
    },
  ] = useLoginMutation();

  // Handles login side effects (success + error responses)
  useEffect(() => {
    // Handle login error response from API
    if (isLoginError) {
      const statusCode = loginError?.status;

      // Normalize backend error message safely across different API shapes
      const errorMessage =
        loginError?.data?.message ||
        loginError?.error ||
        loginError?.data?.error ||
        "Something went wrong while trying to sign in, please try again";

      // Handle known authentication errors
      if (statusCode === 400 || statusCode === 401) {
        setIsError({
          email: null,
          password: null,
          message: errorMessage,
          customMessage: true,
        });
      } else {
        // Fallback for unexpected server/network errors
        setIsError({
          email: null,
          password: null,
          message:
            "Something went wrong while trying to sign in, please try again",
          customMessage: true,
        });
      }

      return;
    }

    // Handle successful login response
    if (loginSuccessful) {
      // Store auth token for session persistence
      window.localStorage.setItem("Tkn", `${loginData?.accessToken}`);

      // Save authenticated user data into global state (Redux)
      dispatch(
        updateClientData({
          userData: loginData?.data,
          isAuthChecked: true,
        }),
      );

      // Redirect user to dashboard after successful login
      navigate(APP_PAGES.dashboard);
    }
  }, [
    loginSuccessful,
    loginData,
    navigate,
    isLoginError,
    dispatch,
    loginError,
  ]);

  // Handles form submission with validation before API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors before new validation cycle
    setIsError({
      email: null,
      password: null,
      message: "",
      customMessage: null,
    });

    // Validate email format before sending request
    const emailValidation = isValidateEmail(email);
    if (!emailValidation.isValid) {
      setIsError({
        email: true,
        password: null,
        message: emailValidation.message,
        customMessage: null,
      });
      return;
    }

    // Validate password rules before sending request
    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.isValid) {
      setIsError({
        email: null,
        password: true,
        message: passwordValidation.message,
        customMessage: null,
      });
      return;
    }

    // Trigger login API request
    await doLogin({
      email: email,
      password: password,
    });
  };

  const { googleLogin, isLoading: authWithGoogleLoading } =
    useGoogleAuth(() => navigate(APP_PAGES.dashboard), setIsGoogleErrorMessage);

  const handleAuthWithGoogle = () => {
    setIsGoogleErrorMessage(null);
    googleLogin();
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
          <form className='auth-box' onSubmit={handleSubmit}>
            {/* Email input field */}
            <div style={{ position: "relative", display: "flex", width: "100%" }}>
              <input
                className='auth-input'
                value={email}
                style={isError.email ? { border: "1px solid red" } : {}}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              {isError.email && (
                <p className='error-text custom-error-text'>
                  {isError.message}
                </p>
              )}
            </div>

            {/* Password input field with toggle visibility */}
            <div style={{position: "relative", display: "flex", width: "100%"}}>
              <input
                className='auth-input'
                value={password}
                style={isError.password ? { border: "1px solid red" } : {}}
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Toggle password visibility */}
              <p
                className='password-input-label'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </p>

              {/* Forgot password navigation link */}
              <Link
                to='/forgotpassword'
                className='password-forgot-password'
                style={{ textDecoration: "underline" }}
                onClick={(e) => {
                  if (authWithGoogleLoading) {
                    e.preventDefault();
                  }
                }}
              >
                Forgot Password?
              </Link>

              {isError.password && (
                <p className='error-text custom-error-text'>
                  {isError.message}
                </p>
              )}
            </div>

            {/* Submit button with loading state */}
            <button
              type='submit'
              className={`auth-button ${loginLoading ? "isLoading" : ""}`}
              disabled={loginLoading || authWithGoogleLoading}
              style={{ opacity: loginLoading ? "0.7" : "1" }}
            >
              {loginLoading ? "Loading..." : "Sign In"}

              {/* Global API error message */}
              {isError.customMessage && (
                <p className='error-text'>{isError.message}</p>
              )}
            </button>

            {/* Divider section */}
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

            {/* Google OAuth button (placeholder) */}
            <button
              type='button'
              className='gmail-button'
              style={{ opacity: authWithGoogleLoading ? "0.7" : "1" }}
              onClick={handleAuthWithGoogle}
              disabled={authWithGoogleLoading || loginLoading}
            >
              <img
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Gmail'
                style={{width: 22, height: 22, display: "inline-block"}}
              />
              {authWithGoogleLoading
                ? "Attempting with Gmail..."
                : "Continue with Gmail"}
              {isGoogleErrorMessage && (
                <p className='error-text custom-error-text-google'>
                  {isGoogleErrorMessage}
                </p>
              )}
            </button>
          </form>

          {/* Navigation to register page */}
          <div className='auth-switch-container'>
            <p className='auth-switch'>
              Don't have an account?{" "}
              <Link
                to='/register'
                style={{ textDecoration: "underline" }}
                onClick={(e) => {
                  if (authWithGoogleLoading) {
                    e.preventDefault();
                  }
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
