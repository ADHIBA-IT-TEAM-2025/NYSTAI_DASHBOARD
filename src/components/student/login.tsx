import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import nyslogo from "../../../public/images/logo/Nystai logo svg.svg";
import Input from "../form/input/InputField";
import Label from "../form/Label";

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
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/loginimg/loginimg.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative w-full max-w-6xl p-8 rounded-xl">
                <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
                    {/* Left Section */}
                    <div className="xl:col-span-3 p-6 sm:p-12 flex flex-col justify-center rounded-lg">
                        <div>
                            <img src={nyslogo} className="w-52 mx-auto" alt="logo" />
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="space-y-3 mx-auto">
                                <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-900">
                                    Welcome To NYST.AI
                                </h1>
                                <p className="text-base xl:text-lg font-medium text-gray-400 leading-relaxed max-w-xl ">
                                    Continue your learning journey. Sign in using your registered
                                    details to track your progress, download certificates, and
                                    more.
                                </p>
                            </div>

                            <form
                                onSubmit={handleLogin}
                                className="w-full flex-1 mt-6 mx-auto max-w-md flex flex-col justify-center"
                            >
                                <div className="mt-4">
                                    <Label>
                                        Certificate ID <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Certificate ID"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label>
                                        Aadhaar Number <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Aadhaar Number"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label>
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input type="password" placeholder="Enter Password" />
                                </div>

                                <div className="flex items-center justify-end mt-2">
                                    <Link
                                        to="/reset-password"
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-20 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden xl:flex xl:col-span-3">
                        <div
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{ backgroundImage: "url('/images/loginimg/rightimg.jpg')" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
