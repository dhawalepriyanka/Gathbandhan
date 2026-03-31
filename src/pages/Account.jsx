import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import ProfileCompletionBar from "@/components/ProfileCompletionBar";
import PhotoGallery from "@/components/PhotoGallery";
import Navbar from "@/components/Navbar";
import profile1 from "@/assets/profile1.jpg";

const Account = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useAuth();
  const { profileData, loading } = useProfileData();

  // Redirect to login if not authenticated using useEffect
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const userDetails = {
    name: profileData.fullName || userName ? `${userName.charAt(0).toUpperCase()}${userName.slice(1)}` : "User",
    email: profileData.email || `${userName}@email.com`,
    phone: profileData.phone || "+91 98765 43210",
    city: profileData.city || "Mumbai",
    profession: profileData.occupation || "Software Engineer",
    education: profileData.education || "B.Tech Engineering",
    about: profileData.about || "Passionate about finding love and building meaningful connections.",
    memberSince: "December 2024",
    profileCompletion: 70,
    profilePhoto: profileData.profilePhoto || profile1,
    photos: [profileData.profilePhoto || profile1],
  };

  const profileCompletion = useProfileCompletion({
    fullName: userDetails.name,
    gender: "Female",
    dateOfBirth: "1998-05-15",
    religion: "Hindu",
    maritalStatus: "Single",
    highestEducation: userDetails.education,
    profession: userDetails.profession,
    city: userDetails.city,
    profilePhotoUrl: userDetails.profilePhoto,
    aboutMe: userDetails.about,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      {/* Header banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 text-center"
        style={{ background: "linear-gradient(135deg, hsl(270 60% 35%), hsl(290 55% 45%), hsl(270 50% 55%))" }}
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">My Account</h1>
        <p className="text-primary-foreground/70 text-sm">View and manage your profile</p>
      </motion.div>

      <div className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-8">
        <div className="grid gap-6">
          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Photo Gallery</h3>
            <PhotoGallery
              photos={userDetails.photos}
              mainImage={userDetails.profilePhoto}
            />
          </motion.div>
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl flex-shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">{userDetails.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">Member since {userDetails.memberSince}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-semibold">Free Member</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/settings")}
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Profile Completion */}
            <ProfileCompletionBar
              completionPercentage={profileCompletion.completionPercentage}
              message={profileCompletion.message}
            />
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <User className="h-4 w-4" />, label: "Name", value: userDetails.name },
                { icon: <Mail className="h-4 w-4" />, label: "Email", value: userDetails.email },
                { icon: <Phone className="h-4 w-4" />, label: "Phone", value: userDetails.phone },
                { icon: <MapPin className="h-4 w-4" />, label: "City", value: userDetails.city },
                { icon: <Briefcase className="h-4 w-4" />, label: "Profession", value: userDetails.profession },
                { icon: <GraduationCap className="h-4 w-4" />, label: "Education", value: userDetails.education },
              ].map((info) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    {info.icon}
                    {info.label}
                  </label>
                  <p className="text-foreground font-medium">{info.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              About Me
            </h3>
            <p className="text-foreground leading-relaxed">{userDetails.about}</p>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Account Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/settings"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-colors"
              >
                Edit Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-destructive/10 hover:bg-destructive/20 text-destructive font-semibold rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Account;
