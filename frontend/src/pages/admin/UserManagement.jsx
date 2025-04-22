import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaUserShield, FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("access-token");

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to load users", error);
        }
    };

    const handlePromote = async (id) => {
        try {
            // 1. Promote user to admin
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/promote/${id}`);

            // 2. Get user email (to send to admin DB)
            const user = users.find((u) => u._id === id);

            // 3. Save admin email in /admin/create route
            await axios.post(
                `${import.meta.env.VITE_API_URL}/admin/create`,
                { email: user.email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("User promoted to admin");
            fetchUsers();
        } catch (error) {
            console.error("Promote failed", error);
            toast.error("Failed to promote user");
        }
    };


    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User deleted");
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete user");
        }
    };

   

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">User Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left border">Name</th>
                            <th className="px-4 py-2 text-left border">Email</th>
                            <th className="px-4 py-2 text-left border">Role</th>
                            <th className="px-4 py-2 text-left border">Status</th>
                            <th className="px-4 py-2 text-left border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border capitalize">{user.role}</td>
                                <td className="px-4 py-2 border capitalize">
                                    {user.status || "active"}
                                </td>
                                <td className="px-4 py-2 border flex gap-2">
                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() => handlePromote(user._id)}
                                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            title="Promote to Admin"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}
                                   
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Delete User"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
