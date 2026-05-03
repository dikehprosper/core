import { Link, useNavigate } from "react-router-dom";
import { BsDashLg } from "react-icons/bs";
import "./auth.css";
import { useEffect, useState } from "react";
import Footer from "../../components/organisms/footer";
import { useDispatch } from "react-redux";
import { updateClientData } from "../../redux/features/client";
import { APP_PAGES } from "../../utils/navigationRoutes";
import {
  isNameValid,
  isPasswordValid,
  isValidateEmail,
} from "../../utils/helpers";
import { useSignUpMutation } from "../../redux/services/auth";
import useGoogleAuth from "./GoogleAuth";

export default function Register() {
  const dispatch = useDispatch();

  // UI state: toggles password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Controlled form states (single source of truth for inputs)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  // Centralized error state for field + backend errors
  const [isError, setIsError] = useState({
    email: null,
    password: null,
    name: null,
    message: null,
    customMessage: null, // true when error comes from backend/API
  });

  // Error state for UI feedback on Google login failures
  const [isGoogleErrorMessage, setIsGoogleErrorMessage] = useState(null);

  // RTK Query mutation for sign up API call
  const [
    doSignUp,
    {
      data: signUpData,
      isSuccess: signUpSuccessful,
      isError: isSignUpError,
      error: signUpError,
      isLoading: signUpLoading,
    },
  ] = useSignUpMutation();

  // Handles side effects after API response (success or failure)
  useEffect(() => {

    // Handle API error response
    if (isSignUpError) {
      const statusCode = signUpError?.status;

      // Normalize backend message safely
      const errorMessage =
        signUpError?.data?.message ||
        signUpError?.error ||
        signUpError?.data?.error ||
        "Something went wrong while trying to sign up, please try again";

      if (statusCode === 400 || statusCode === 409) {
        setIsError({
          email: null,
          password: null,
          name: null,
          message: errorMessage,
          customMessage: true,
        });
      } else {
        setIsError({
          email: null,
          password: null,
          name: null,
          message:
            "Something went wrong while trying to sign up, please try again",
          customMessage: true,
        });
      }

      return;
    }

    // Handle successful signup
    if (signUpSuccessful) {
      // Store token for authentication persistence
      window.localStorage.setItem("Tkn", `${signUpData?.accessToken}`);

      // Save user data into Redux store
      dispatch(
        updateClientData({
          userData: signUpData?.data,
          isAuthChecked: true,
        }),
      );

      // Redirect user to dashboard after successful signup
      navigate(APP_PAGES.dashboard);
    }
  }, [
    signUpSuccessful,
    signUpData,
    navigate,
    isSignUpError,
    dispatch,
    signUpError,
  ]);

  // Handles form submission with client-side validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors before validation
    setIsError({
      email: null,
      password: null,
      name: null,
      message: "",
      customMessage: null,
    });

    // Validate name field
    const nameValidation = isNameValid(name);
    if (!nameValidation.isValid) {
      setIsError({
        email: null,
        password: null,
        name: true,
        message: nameValidation.message,
        customMessage: null,
      });
      return;
    }

    // Validate email format
    const emailValidation = isValidateEmail(email);
    if (!emailValidation.isValid) {
      setIsError({
        email: true,
        password: null,
        name: null,
        message: emailValidation.message,
        customMessage: null,
      });
      return;
    }

    // Validate password strength rules
    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.isValid) {
      setIsError({
        email: null,
        password: true,
        name: null,
        message: passwordValidation.message,
        customMessage: null,
      });
      return;
    }

    // Trigger API call for signup
    await doSignUp({
      email: email,
      password: password,
      name: name,
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
            Join Now
            <BsDashLg style={{ verticalAlign: "middle", margin: "0 3px" }} />
            It's free
          </h6>
        </div>

        <div className='auth-box-outer'>
          <form className='auth-box' onSubmit={handleSubmit}>

            {/* Name input field */}
            <div style={{ position: "relative", display: "flex", width: "100%" }}>
              <input
                className='auth-input'
                value={name}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />
              {isError.name && (
                <p className='error-text custom-error-text'>
                  {isError.message}
                </p>
              )}
            </div>

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
            <div style={{ position: "relative", display: "flex", width: "100%" }}>
              <input
                className='auth-input'
                value={password}
                placeholder='Password'
                style={isError.password ? { border: "1px solid red" } : {}}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                className='password-input-label'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </p>
              {isError.password && (
                <p className='error-text custom-error-text'>
                  {isError.message}
                </p>
              )}
            </div>

            {/* Submit button with loading state */}
            <button
              type='submit'
              className={`auth-button ${signUpLoading ? "isLoading" : ""}`}
              disabled={signUpLoading || authWithGoogleLoading}
            >
              {signUpLoading ? "Loading..." : "Sign Up"}

              {/* Backend/global error message */}
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

            {/* OAuth placeholder button (not yet implemented) */}
            <button type='button' className='gmail-button' onClick={handleAuthWithGoogle} disabled={authWithGoogleLoading || signUpLoading} style={{ opacity: authWithGoogleLoading ? "0.7" : "1" }}>
              <img
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Gmail'
                style={{ width: 22, height: 22, display: "inline-block" }}
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

          {/* Navigation link to login page */}
          <div className='auth-switch-container'>
            <p className='auth-switch'>
              Already have an account?{" "}
              <Link to='/login' style={{ textDecoration: "underline" }} onClick={(e) => {
                if (authWithGoogleLoading) {
                  e.preventDefault();
                }
              }}>
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