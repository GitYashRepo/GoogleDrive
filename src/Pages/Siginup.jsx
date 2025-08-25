import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // default role
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((s) => s.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(signup(form));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/user/login"); // redirect to login after signup
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
                <CardContent>
                    <div className="text-center mb-6">
                        <img
                            src="/google-drive-logo.png"
                            alt="Drive"
                            className="w-12 mx-auto mb-2"
                        />
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Create your account
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        {/* Email */}
                        <Input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />

                        {/* Password */}
                        <Input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />

                        {/* Role selection */}
                        <select
                            className="w-full border rounded-md p-2 text-sm"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="user">User</option>
                        </select>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                        </Button>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/user/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default Signup;
