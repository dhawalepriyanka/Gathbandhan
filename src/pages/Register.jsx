import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import { useLoading } from "@/hooks/useLoading";
import MatrimonySelect from "@/components/MatrimonySelect";
import { useMatrimonyOptions } from "@/hooks/useMatrimonyOptions";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error, warning } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { getOptions, addCustomOption } = useMatrimonyOptions();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [religion, setReligion] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!email.includes("@")) errs.email = "Enter a valid email";
    if (!phone.trim() || phone.length < 10) errs.phone = "Enter a valid phone number";
    if (password.length < 4) errs.password = "Password must be at least 4 characters";
    if (!gender) errs.gender = "Please select gender";
    if (!dob) errs.dob = "Date of birth is required";
    if (!religion) errs.religion = "Please select religion";
    return errs;
  };

  const handleRegister = async () => {
    const errs = validateForm();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      startLoading('Creating account...');
      // Simulate registration delay
      setTimeout(() => {
        login(`${firstName} ${lastName}`.trim() || firstName || "User");
        success("Registration successful! Welcome to Gathbandhan.");
        stopLoading();
        navigate("/home");
      }, 2000);
    } else {
      error("Please fill in all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(270 60% 35%), hsl(290 55% 45%), hsl(270 50% 55%))" }}>
      <Heart className="absolute top-12 left-[10%] h-5 w-5 text-pink-soft fill-pink-soft opacity-40 animate-float-heart" />
      <Heart className="absolute top-24 right-[20%] h-4 w-4 text-pink-soft fill-pink-soft opacity-30 animate-float-heart [animation-delay:1s]" />
      <Heart className="absolute bottom-20 left-[30%] h-6 w-6 text-pink-soft fill-pink-soft opacity-30 animate-float-heart [animation-delay:0.5s]" />

      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            <span className="text-2xl font-display font-bold text-foreground">Gathbandhan</span>
          </div>
          <p className="text-muted-foreground text-sm">Create your account</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="First Name" />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Last Name" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="your@email.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91 9876543210" />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Date of Birth</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Religion</label>
            <MatrimonySelect
              options={getOptions('religion')}
              value={religion}
              onChange={setReligion}
              placeholder="Select Religion"
              fieldType="religion"
              onAddCustom={addCustomOption}
            />
            {errors.religion && <p className="text-xs text-destructive mt-1">{errors.religion}</p>}
          </div>

          <button onClick={handleRegister} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-colors">
            Create Account
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
