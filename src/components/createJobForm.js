import { useState } from "react";
import api from "../api/api";

export default function CreateJobForm({ onJobCreated }) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/jobs", {
                title,
                company,
                description
            });

            alert("Job created successfully!");

            setTitle("");
            setCompany("");
            setDescription("");

            // refresh job list in dashboard
            if (onJobCreated) {
                onJobCreated(res.data.data);
            }

        } catch (err) {
            alert(err.response?.data?.message || "Error creating job");
        }
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h3>Create Job</h3>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />

                <input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />

                <button type="submit">Create Job</button>
            </form>
        </div>
    );
}