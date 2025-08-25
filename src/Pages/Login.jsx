import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(form));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
                <CardContent>
                    <div className="text-center mb-6">
                        <img src="/google-drive-logo.png" alt="Drive" className="w-12 mx-auto mb-2" />
                        <h1 className="text-2xl font-semibold text-gray-800">Sign in</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <Link to="/user/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
