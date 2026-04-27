import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PublicGuard({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                await axios.get("/auth/me")
                navigate("/dashboard", { replace: true });
            } catch (err) {
                localStorage.removeItem("token");
                setLoading(false);
            }
        };

        verifyUser();
    }, [navigate]);

    if (loading) return null;

    return children;
}