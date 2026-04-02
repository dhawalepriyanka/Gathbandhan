import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import { useLoading } from "@/hooks/useLoading";
import MatrimonySelect from "@/components/MatrimonySelect";
import { useMatrimonyOptions } from "@/hooks/useMatrimonyOptions";
import { authAPI, masterDataAPI } from "@/services/api";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [religion, setReligion] = useState("");
  const [religionId, setReligionId] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    
    // Name validation
    if (!firstName.trim()) {
      errs.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters";
    }
    
    // Email validation
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address";
    }
    
    // Phone validation
    if (!phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = "Enter a valid phone number (10-15 digits)";
    }
    
    // Password validation
    if (!password.trim()) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    
    // Confirm password validation
    if (!confirmPassword.trim()) {
      errs.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    
    // Gender validation
    if (!gender) {
      errs.gender = "Please select gender";
    }
    
    // Date of birth validation
    if (!dob) {
      errs.dob = "Date of birth is required";
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (age < 18 || (age === 18 && monthDiff < 0)) {
        errs.dob = "You must be at least 18 years old";
      }
    }
    
    // Religion validation
    if (!religion) {
      errs.religion = "Please select religion";
    }
    
    return errs;
  };

  const handleRegister = async () => {
    const errs = validateForm();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      startLoading('Creating account...');
      
      try {
        // Prepare registration payload for backend
        const registrationData = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          password: password,
          gender: gender,
          dob: dob,
          religion_id: religionId || null, // Send ID if available, otherwise null
        };

        // API call to backend
        const response = await authAPI.register(registrationData);

        // Auto-login after successful registration
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        
        // Update auth context
        const userName = response.user?.first_name || `${firstName} ${lastName}`.trim() || firstName;
        login(userName);

        success("Registration successful! Welcome to Gathbandhan.");
        stopLoading();

        // Navigate to profile completion if needed, otherwise home
        const redirectPath = response.user?.profile_completed ? "/home" : "/profile/edit";
        navigate(redirectPath);
        
      } catch (err) {
        stopLoading();
        const errorMessage = err.message || "Registration failed. Please try again.";
        error(errorMessage);
        
        // Handle specific field errors from backend
        if (err.errors) {
          setErrors(err.errors);
        }
      }
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

          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
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
              onChange={(value) => {
                setReligion(value);
                // TODO: Map religion name to ID when master data is loaded
                // For now, we'll send the name and backend can map it
              }}
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
