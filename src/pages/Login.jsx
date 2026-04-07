import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import { useLoading } from "@/hooks/useLoading";
import { authAPI } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const errs = {};

    // ✅ VALIDATION
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter valid email";
    }

    if (!password.trim()) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Min 6 characters";
    }

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      startLoading("Logging in...");

      try {
        // 🔥 ADMIN STATIC LOGIN (FRONTEND)
        if (
          email === "admin@gathbandhan.com" &&
          password === "admin123"
        ) {
          localStorage.setItem("role", "ADMIN");
          login("admin");
          success("Admin login successful");
          stopLoading();
          navigate("/admin");
          return;
        }

        // 🔥 BACKEND LOGIN
        const response = await authAPI.login({
          email: email.trim(),
          password,
          rememberMe,
        });

        const user = response.user;

        // SAVE USER
        login(user?.first_name || user?.email || email.split("@")[0]);

        // ROLE
        const role = user?.role || "USER";
        localStorage.setItem("role", role);

        success("Login successful!");
        stopLoading();

        // REDIRECT
        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      } catch (err) {
        stopLoading();
        error(err.message || "Login failed");

        if (err.field) {
          setErrors({ [err.field]: err.message });
        }
      }

    } else {
      error("Fix errors first");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(270 60% 35%), hsl(290 55% 45%), hsl(270 50% 55%))",
      }}
    >
      <Heart className="absolute top-12 left-[10%] h-5 w-5 text-pink-soft fill-pink-soft opacity-40 animate-float-heart" />
      <Heart className="absolute top-24 right-[20%] h-4 w-4 text-pink-soft fill-pink-soft opacity-30 animate-float-heart [animation-delay:1s]" />

      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            <span className="text-2xl font-display font-bold text-foreground">
              Gathbandhan
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Welcome back! Login to your account
          </p>
        </div>

        <div className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-xs font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 text-sm"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 text-sm"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* REMEMBER */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-xs">Remember me</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-2.5 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;