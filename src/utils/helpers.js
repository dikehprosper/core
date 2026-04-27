export const validateEmail = (emailAddress) => {
    // Ensure input exists and is a string
    if (!emailAddress || typeof emailAddress !== "string") {
        return { isValid: false, message: "Email is required" };
    }

    // Basic email pattern
    const emailPattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/;

    if (!emailPattern.test(emailAddress)) {
        return { isValid: false, message: "Invalid email format" };
    }

    // Prevent consecutive dots
    if (emailAddress.includes("..")) {
        return { isValid: false, message: "Email cannot contain consecutive dots" };
    }

    const [local, domain] = emailAddress.split("@");

    // Prevent starting or ending with dot
    if (
        local.startsWith(".") ||
        local.endsWith(".") ||
        domain.startsWith(".") ||
        domain.endsWith(".")
    ) {
        return { isValid: false, message: "Email cannot start or end with a dot" };
    }

    return { isValid: true, message: "Valid email" };
};


export const isPasswordValid = (password) => {
    const generalFailureMessage =
        "Password must be at least 8 characters long and contain both letters and numbers";

    // Ensure password exists and is a string
    if (!password || typeof password !== "string") {
        return { isValid: false, message: "Password is required", generalFailureMessage: generalFailureMessage };
    }

    // 1. Minimum length
    if (password.length < 8) {
        return { isValid: false, message: "Password must be at least 8 characters", generalFailureMessage: generalFailureMessage };
    }

    // 2. At least one letter
    if (!/[a-zA-Z]/.test(password)) {
        return { isValid: false, message: "Password must include a letter", generalFailureMessage: generalFailureMessage };
    }

    // 3. At least one number
    if (!/\d/.test(password)) {
        return { isValid: false, message: "Password must include a number", generalFailureMessage: generalFailureMessage };
    }

    // 5. At least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { isValid: false, message: "Password must include a special character", generalFailureMessage: generalFailureMessage };
    }

    return { isValid: true, message: "Valid password" };
};