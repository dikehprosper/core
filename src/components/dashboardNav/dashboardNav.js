import { FaBell, FaUser } from "react-icons/fa";
import "./dashboardNav.css";

const DashboardNav = () => {
    return (
        <div className="dash-nav">
            <div className="logo">JobBoard</div>

            <div className="nav-links">
                <span className="active">Home</span>
                <span>My Jobs</span>
            </div>

            <div className="nav-actions">
                <FaBell />
                <FaUser />
                <button className="post-btn">Post Job</button>
            </div>
        </div>
    );
};

export default DashboardNav;