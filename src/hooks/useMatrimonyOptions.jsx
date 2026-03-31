import { useState, useEffect } from 'react';

// Default options for matrimony fields
const defaultOptions = {
  religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'],
  caste: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Other'],
  education: ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Diploma', 'Other'],
  occupation: ['Software Engineer', 'Doctor', 'Teacher', 'Business', 'Government Job', 'Student', 'Other'],
  maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'],
  state: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Punjab', 'Other'],
  city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Other'],
  complexion: ['Fair', 'Wheatish', 'Dark'],
  bodyType: ['Slim', 'Athletic', 'Average', 'Heavy'],
  diet: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian'],
  smoking: ['No', 'Occasionally', 'Regularly'],
  drinking: ['No', 'Occasionally', 'Regularly'],
  motherTongue: ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Gujarati', 'Other'],
};

export const useMatrimonyOptions = () => {
  const [customOptions, setCustomOptions] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('matrimonyCustomOptions');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever customOptions changes
  useEffect(() => {
    localStorage.setItem('matrimonyCustomOptions', JSON.stringify(customOptions));
  }, [customOptions]);

  const getOptions = (fieldType) => {
    const defaults = defaultOptions[fieldType] || [];
    const customs = customOptions[fieldType] || [];
    return [...defaults, ...customs];
  };

  const addCustomOption = (fieldType, newOption) => {
    setCustomOptions(prev => ({
      ...prev,
      [fieldType]: [...(prev[fieldType] || []), newOption]
    }));
  };

  return {
    getOptions,
    addCustomOption,
  };
};