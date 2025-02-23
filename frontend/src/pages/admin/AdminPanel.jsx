import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/special-category/set", {
                category,
                startDate,
                endDate
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error setting special category:", error);
            alert("Failed to set special category.");
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold">Set Special Event Category</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
                <input
                    type="text"
                    placeholder="Enter special category (e.g., Vesak, Christmas)"
                    className="p-2 border rounded text-black"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className="p-2 border rounded text-black"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className="p-2 border rounded text-black"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Set Category</button>
            </form>
        </div>
    );
};

export default AdminPanel;
