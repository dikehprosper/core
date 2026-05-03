import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./auth.css";
import Footer from "../../components/organisms/footer";
import { isPasswordValid } from "../../utils/helpers";
import { useResetPasswordMutation } from "../../redux/services/auth";

export default function ResetPassword() {
    // Controlled form state for new password input
    const [password, setPassword] = useState("");

    // Controlled form state for confirm password input
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI state for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    // React Router navigation hook for redirecting after success
    const navigate = useNavigate();

    // Extract reset token from URL params (/reset/:token)
    const { token } = useParams();

    // Success message state after password reset
    const [success, setSuccess] = useState("");

    // Centralized error state for validation + backend feedback
    const [isError, setIsError] = useState({
        password: null,
        message: null,
        customMessage: null,
    });

    // RTK Query reset password mutation hook
    const [
        doResetPassword,
        {
            data: resetPasswordData,
            isSuccess: resetPasswordSuccessful,
            isError: isResetPasswordError,
            error: resetPasswordError,
            isLoading: ResetPasswordLoading,
        },
    ] = useResetPasswordMutation();

    // Handles reset password side effects (success + error responses)
    useEffect(() => {
        // Handle API error response
        if (isResetPasswordError) {
            const statusCode = resetPasswordError?.status;

            // Normalize backend error message safely
            const errorMessage =
                resetPasswordError?.data?.message ||
                resetPasswordError?.error ||
                resetPasswordError?.data?.error ||
                "Something went wrong, please try again";

            // Handle known validation/authentication errors
            if (statusCode === 400 || statusCode === 401) {
                setIsError({
                    password: null,
                    message: errorMessage,
                    customMessage: true,
                });
            } else {
                // Fallback for unexpected server/network errors
                setIsError({
                    password: null,
                    message:
                        "Something went wrong while trying to reset your password, please try again",
                    customMessage: true,
                });
            }

            return;
        }

        // Handle successful password reset
        if (resetPasswordSuccessful) {
            // Show success feedback
            setSuccess(
                "Your password has been reset successfully. Please login with your new password.",
            );

            // Redirect user back to login page after short delay
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }, [
        resetPasswordSuccessful,
        resetPasswordData,
        isResetPasswordError,
        resetPasswordError,
        navigate,
    ]);

    // Handles form submission with validation before API call
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors before validation cycle
        setIsError({
            password: null,
            message: "",
            customMessage: null,
        });

        // Validate password syntax/rules
        const passwordValidation = isPasswordValid(password);

        if (!passwordValidation.isValid) {
            setIsError({
                password: true,
                message: passwordValidation.message,
                customMessage: null,
            });
            return;
        }

        // Validate password confirmation match
        if (password !== confirmPassword) {
            setIsError({
                password: null,
                message: "Passwords do not match.",
                customMessage: true,
            });
            return;
        }

        // Trigger reset password API request
        await doResetPassword({
            token: token,
            password,
            confirmPassword,
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

            {/* Main reset password page */}
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
                        Reset Password
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
                        Enter your new Password and Confirm it to reset your password
                    </p>

                    {/* Success message */}
                    {success && <p className='success-text'>{success}</p>}
                </div>

                {/* Reset password form container */}
                <div className='auth-box-outer'>
                    <form className='auth-box' onSubmit={handleSubmit}>

                        {/* New password input field */}
                        <div style={{ position: "relative", display: "flex", width: "100%" }}>
                            <input
                                className='auth-input'
                                value={password}
                                type={showPassword ? "text" : "password"}
                                style={isError.password ? { border: "1px solid red" } : {}}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Password visibility toggle */}
                            <p
                                className='password-input-label'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </p>
                        </div>

                        {/* Confirm password input field */}
                        <input
                            className='auth-input'
                            value={confirmPassword}
                            type={showPassword ? "text" : "password"}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {/* Submit button with loading state */}
                        <button
                            className={`auth-button custom-addition ${ResetPasswordLoading ? "isLoading" : ""}`}
                            disabled={ResetPasswordLoading}
                        >
                            {ResetPasswordLoading ? "Loading..." : "Reset Password"}

                            {/* Global/backend error message */}
                            {isError.customMessage && (
                                <p className='error-text'>{isError.message}</p>
                            )}
                        </button>
                    </form>

                    {/* Redirect to login page */}
                    <div className='auth-switch-container'>
                        <p className='auth-switch'>
                            Remember your password?{" "}
                            <Link to='/login' style={{ textDecoration: "underline" }}>
                                SignIn
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer section */}
            <Footer />
        </div>
    );
}