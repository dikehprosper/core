// import { useEffect, useState } from "react";
// import api from "../api/api";
// import CreateJobForm from "../components/CreateJobForm";
// import "./../styles/dashboard.css";

// export default function Dashboard() {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchJobs = async () => {
//         const res = await api.get("/jobs");
//         setJobs(res.data.data);
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     const handleDelete = async (id) => {
//         await api.delete(`/jobs/${id}`);
//         fetchJobs();
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.href = "/";
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="dashboard-container">
//             {/* Sidebar */}
//             <div className="sidebar">
//                 <h2>JobBoard</h2>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>

//             {/* Main */}
//             <div className="main">

//                 <div className="topbar">
//                     <h1>Dashboard</h1>
//                 </div>
//                 <CreateJobForm onJobCreated={fetchJobs} />
//                 <h3>Jobs</h3>
//                 <div className="jobs-grid">
//                     {jobs.map((job) => (
//                         <div className="job-card" key={job._id}>
//                             <h3>{job.title}</h3>
//                             <p>{job.company}</p>
//                             <p>{job.description}</p>

//                             <button className="btn btn-edit">
//                                 Edit
//                             </button>

//                             <button
//                                 className="btn btn-delete"
//                                 onClick={() => handleDelete(job._id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useState, useEffect } from "react";
import api from "../../api/api";
import DashboardNav from "../../components/dashboardNav/dashboardNav";
const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const res = await api.get("/jobs");
        setJobs(res.data.data);
        if (res.data.data.length > 0) {
            setSelectedJob(res.data.data[0]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="dashboard">
            <DashboardNav />
            <button onClick={handleLogout}>Logout</button>
            {/* SEARCH BAR */}
            <div className="search-wrapper">
                <div className="search-bar">
                    <input placeholder="Job title, keywords, or company" />
                    <input placeholder="City or remote" />
                    <button>Find Jobs</button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="dashboard-body">
                {/* LEFT - JOB LIST */}
                <div className="job-list">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="job-card"
                            onClick={() => setSelectedJob(job)}
                        >
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </div>
                    ))}
                </div>

                {/* RIGHT - JOB DETAILS */}
                <div className="job-details">
                    {selectedJob ? (
                        <>
                            <h2>{selectedJob.title}</h2>
                            <p>{selectedJob.company}</p>
                            <p>{selectedJob.description}</p>

                            <button className="apply-btn">Apply Now</button>
                        </>
                    ) : (
                        <p>Select a job to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


