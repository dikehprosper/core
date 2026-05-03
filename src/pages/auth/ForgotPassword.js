import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import Footer from "../../components/organisms/footer";
import { useForgotPasswordMutation } from "../../redux/services/auth";
import { isValidateEmail } from "../../utils/helpers";

export default function ForgotPassword() {
  // Controlled form state for forgot password email input
  const [email, setEmail] = useState("");

  // Success message shown after reset link request is processed
  const [success, setSuccess] = useState("");

  // Centralized error state for UI feedback
  const [isError, setIsError] = useState({
    email: null,
    password: null,
    message: null,
    customMessage: null,
  });

  // RTK Query forgot password mutation hook
  const [
    doForgotPassword,
    {
      data: forgotPasswordData,
      isSuccess: forgotPasswordSuccessful,
      isError: isForgotPasswordError,
      error: forgotPasswordError,
      isLoading: ForgotPasswordLoading,
    },
  ] = useForgotPasswordMutation();

  // Handles forgot password side effects (success + error responses)
  useEffect(() => {
    // Handle forgot password error response from API
    if (isForgotPasswordError) {
      const statusCode = forgotPasswordError?.status;

      // Normalize backend error message safely across different API shapes
      const errorMessage =
        forgotPasswordError?.data?.message ||
        forgotPasswordError?.error ||
        forgotPasswordError?.data?.error ||
        "Something went wrong, please try again";

      // Handle known request/authentication errors
      if (statusCode === 400 || statusCode === 401) {
        setIsError({
          email: null,
          password: null,
          message: errorMessage,
          customMessage: true,
        });
      } else {
        // Fallback for unexpected server/network failures
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

    // Handle successful forgot password response
    if (forgotPasswordSuccessful) {
      // Security-safe message (does not reveal whether account exists)
      setSuccess(
        "A reset link will be sent if the account exists. Please check your email.",
      );
    }
  }, [
    forgotPasswordSuccessful,
    forgotPasswordData,
    isForgotPasswordError,
    forgotPasswordError,
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

    // Trigger forgot password API request
    await doForgotPassword({
      email: email,
    });
  };

  return (
    <div className='auth-page-outer'>
      {/* Top navigation */}
      <nav className='auth-nav'>
        <a href='/'>
          <h2>JobBoard</h2>
        </a>
      </nav>

      {/* Main forgot password page */}
      <div className='auth-page'>
        <div className='auth-page-header'>
          {/* Page title */}
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

          {/* Instructional text */}
          <p
            style={{
              fontSize: "15px",
              marginBottom: "14px",
              marginLeft: "8px",
              fontWeight: 100,
              opacity: 0.6,
              fontStyle: "italic",
            }}
          >
            Enter your email to receive a password reset link
          </p>

          {/* Success message after request */}
          {success && <p className='success-text'>{success}</p>}
        </div>

        {/* Forgot password form */}
        <form className='auth-box-outer' onSubmit={handleSubmit}>
          <div className='auth-box'>

            {/* Email input field */}
            <div style={{ position: "relative", display: "flex", width: "100%" }}>
              <input
                className='auth-input'
                value={email}
                style={isError.email ? { border: "1px solid red" } : {}}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Email validation error */}
              {isError.email && (
                <p className='error-text custom-error-text'>
                  {isError.message}
                </p>
              )}
            </div>

            {/* Submit button with loading state */}
            <button
              className={`auth-button custom-addition ${ForgotPasswordLoading ? "isLoading" : ""}`}
              disabled={ForgotPasswordLoading}
            >
              {ForgotPasswordLoading ? "Loading..." : "Send Email Reset Link"}

              {/* Global/backend error message */}
              {isError.customMessage && (
                <p className='error-text'>{isError.message}</p>
              )}
            </button>
          </div>

          {/* Redirect back to login page */}
          <div className='auth-switch-container'>
            <p className='auth-switch'>
              Remember your password?{" "}
              <Link to='/login' style={{ textDecoration: "underline" }}>
                SignIn
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
}