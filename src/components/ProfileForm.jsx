import { useState, useEffect } from "react";
import { Upload, X, Save } from "lucide-react";

/**
 * Reusable Profile Form Component
 * Can be used for both Create and Update profile scenarios
 * 
 * Props:
 * - initialData: Object with profile data to populate form
 * - onSave: Callback function when form is submitted
 * - onError: Callback function when validation fails
 * - isLoading: Boolean to show loading state
 * - showPhotoUpload: Boolean to show profile photo upload section (default: true)
 */
const ProfileForm = ({ 
  initialData = {}, 
  onSave, 
  onError,
  isLoading = false,
  showPhotoUpload = true 
}) => {
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
    
    // Physical Details
    height: "",
    weight: "",
    complexion: "",
    bodyType: "",
    
    // Education & Career
    highestEducation: "",
    profession: "",
    annualIncome: "",
    companyName: "",
    
    // Location
    country: "India",
    state: "",
    city: "",
    address: "",
    
    // Lifestyle
    diet: "",
    smoking: "",
    drinking: "",
    
    // Family Details
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblingsCount: "",
    
    // Partner Preferences
    preferredAgeMin: "",
    preferredAgeMax: "",
    preferredLocation: "",
    preferredEducation: "",
    otherExpectations: "",
    
    // Other
    aboutMe: "",
    email: "",
    phone: "",
    profilePhoto: null,
    profilePhotoUrl: "",
    
    ...initialData
  });

  // Auto-calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 0 ? age.toString() : "";
  };

  const handleInputChange = (field, value) => {
    if (field === "dateOfBirth") {
      const calculatedAge = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        dateOfBirth: value,
        age: calculatedAge
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onError && onError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError && onError("File size should be less than 5MB");
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file,
        profilePhotoUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeProfilePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      profilePhotoUrl: ""
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'gender', 'dateOfBirth', 'maritalStatus', 
      'religion', 'motherTongue', 'highestEducation', 'profession', 'city'
    ];
    
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        const fieldLabel = field.replace(/([A-Z])/g, ' $1').trim();
        onError && onError(`${fieldLabel} is required`);
        return false;
      }
    }

    if (!formData.email.includes("@")) {
      onError && onError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Remove File object before sending (can't serialize)
    const dataToSave = { ...formData };
    delete dataToSave.profilePhoto;
    
    onSave && onSave(dataToSave);
  };

  // Helper function to render form fields
  const renderField = (field) => {
    const { label, placeholder, type = "text", key, options } = field;
    
    if (type === "select") {
      return (
        <div key={key}>
          <label className="text-xs font-medium text-foreground mb-1 block">{label}</label>
          <select 
            value={formData[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={key}>
        <label className="text-xs font-medium text-foreground mb-1 block">{label}</label>
        <input 
          type={type} 
          value={formData[key]}
          onChange={(e) => handleInputChange(key, e.target.value)}
          placeholder={placeholder} 
          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo Upload */}
      {showPhotoUpload && (
        <div className="border border-dashed border-border rounded-lg p-4 bg-muted/30">
          <label className="text-sm font-medium text-foreground mb-3 block">Profile Photo</label>
          {formData.profilePhotoUrl ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
              <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeProfilePhoto}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ) : null}
          <label className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium cursor-pointer transition-colors inline-block">
            <Upload className="h-4 w-4" />
            {formData.profilePhotoUrl ? "Change Photo" : "Upload Photo"}
            <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} className="hidden" />
          </label>
        </div>
      )}

      {/* Personal Details Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Full Name", placeholder: "Your full name", key: "fullName" })}
          {renderField({ label: "Gender", key: "gender", type: "select", options: ["Male", "Female", "Other"] })}
          {renderField({ label: "Date of Birth", type: "date", key: "dateOfBirth" })}
          {renderField({ label: "Age", type: "number", key: "age", placeholder: "Auto-calculated" })}
          {renderField({ label: "Marital Status", key: "maritalStatus", type: "select", options: ["Single", "Divorced", "Widowed", "Married"] })}
          {renderField({ label: "Religion", key: "religion", type: "select", options: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Other"] })}
          {renderField({ label: "Caste", placeholder: "Your caste", key: "caste" })}
          {renderField({ label: "Sub-caste", placeholder: "Your sub-caste", key: "subCaste" })}
          {renderField({ label: "Mother Tongue", placeholder: "Your mother tongue", key: "motherTongue" })}
        </div>
      </div>

      {/* Physical Details Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Physical Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Height (cm)", type: "number", key: "height" })}
          {renderField({ label: "Weight (kg)", type: "number", key: "weight" })}
          {renderField({ label: "Complexion", key: "complexion", type: "select", options: ["Fair", "Wheatish", "Wheatish Brown", "Brown", "Dark"] })}
          {renderField({ label: "Body Type", key: "bodyType", type: "select", options: ["Slim", "Average", "Athletic", "Heavy"] })}
        </div>
      </div>

      {/* Education & Career Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Education & Career</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Highest Education", key: "highestEducation", type: "select", options: ["10th", "12th", "Bachelor's", "Master's", "PhD", "Professional Degree"] })}
          {renderField({ label: "Profession/Occupation", placeholder: "Your profession", key: "profession" })}
          {renderField({ label: "Annual Income", placeholder: "Your annual income", key: "annualIncome" })}
          {renderField({ label: "Company Name", placeholder: "Your company", key: "companyName" })}
        </div>
      </div>

      {/* Location Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Location Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Country", key: "country", type: "select", options: ["India", "USA", "UK", "Canada", "Australia"] })}
          {renderField({ label: "State/Province", placeholder: "Your state", key: "state" })}
          {renderField({ label: "City", placeholder: "Your city", key: "city" })}
          {renderField({ label: "Address", placeholder: "Your address", key: "address" })}
        </div>
      </div>

      {/* Lifestyle Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Lifestyle</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Diet", key: "diet", type: "select", options: ["Vegetarian", "Non-Vegetarian", "Vegan"] })}
          {renderField({ label: "Smoking", key: "smoking", type: "select", options: ["No", "Yes", "Occasionally"] })}
          {renderField({ label: "Drinking", key: "drinking", type: "select", options: ["No", "Yes", "Occasionally"] })}
        </div>
      </div>

      {/* Family Details Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Family Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Father's Name", placeholder: "Your father's name", key: "fatherName" })}
          {renderField({ label: "Father's Occupation", placeholder: "Your father's occupation", key: "fatherOccupation" })}
          {renderField({ label: "Mother's Name", placeholder: "Your mother's name", key: "motherName" })}
          {renderField({ label: "Mother's Occupation", placeholder: "Your mother's occupation", key: "motherOccupation" })}
          {renderField({ label: "Number of Siblings", type: "number", key: "siblingsCount" })}
        </div>
      </div>

      {/* Partner Preferences Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Partner Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Preferred Age (Min)", type: "number", key: "preferredAgeMin" })}
          {renderField({ label: "Preferred Age (Max)", type: "number", key: "preferredAgeMax" })}
          {renderField({ label: "Preferred Location", placeholder: "Preferred location", key: "preferredLocation" })}
          {renderField({ label: "Preferred Education", placeholder: "Preferred education", key: "preferredEducation" })}
        </div>
      </div>

      {/* Contact Information Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField({ label: "Email", type: "email", placeholder: "your@email.com", key: "email" })}
          {renderField({ label: "Phone", type: "tel", placeholder: "+91 98765 43210", key: "phone" })}
        </div>
      </div>

      {/* About Me Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">About Me</h3>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">About Me</label>
          <textarea 
            rows={4} 
            value={formData.aboutMe}
            onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            placeholder="Tell us about yourself, your interests, personality and what you are looking for..." 
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" 
          />
        </div>
      </div>

      {/* Other Expectations */}
      <div>
        <label className="text-xs font-medium text-foreground mb-1 block">Other Expectations</label>
        <textarea 
          rows={3} 
          value={formData.otherExpectations}
          onChange={(e) => handleInputChange("otherExpectations", e.target.value)}
          placeholder="Any other expectations or preferences..." 
          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" 
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
      >
        <Save className="h-4 w-4" /> 
        {isLoading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
