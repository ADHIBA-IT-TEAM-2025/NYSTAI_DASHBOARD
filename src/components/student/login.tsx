import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentLogin() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://your-backend.com/student/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, token }),
            });

            const data = await res.json();
            if (data.success) {
                navigate(`/student/certificate/${data.studentId}`);
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4">Student Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4 w-full rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
