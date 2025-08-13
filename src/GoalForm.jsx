import React, { useState } from 'react';
import { Car, IndianRupee, Dumbbell, Home, GraduationCap, Heart, Briefcase, Book, MapPin, Camera, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoalForm = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    icon: '',
    targetAmt: '',
    currentAmt: 0,
    deadline: '',
    notes: '',
    unit: 'rupees'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { name: 'Financial', color: 'bg-green-500' },
    { name: 'Health', color: 'bg-red-500' },
    { name: 'Career', color: 'bg-blue-500' },
    { name: 'Education', color: 'bg-yellow-500' },
    { name: 'Personal', color: 'bg-purple-500' },
    { name: 'Lifestyle', color: 'bg-pink-500' },
    { name: 'Travel', color: 'bg-indigo-500' },
    { name: 'Hobbies', color: 'bg-orange-500' }
  ];

  const icons = [
    { name: 'Car', component: Car },
    { name: 'RupeeSign', component: IndianRupee },
    { name: 'Dumbbell', component: Dumbbell },
    { name: 'Home', component: Home },
    { name: 'GraduationCap', component: GraduationCap },
    { name: 'Heart', component: Heart },
    { name: 'Briefcase', component: Briefcase },
    { name: 'Book', component: Book },
    { name: 'MapPin', component: MapPin },
    { name: 'Camera', component: Camera }
  ];

  const units = [
    { value: 'rupees', label: 'Rupees (₹)', symbol: '₹' },
    { value: 'pounds', label: 'Pounds (lbs)', symbol: 'lbs' },
    { value: 'days', label: 'Days', symbol: 'days' },
    { value: 'hours', label: 'Hours', symbol: 'hrs' },
    { value: 'books', label: 'Books', symbol: 'books' },
    { value: 'miles', label: 'Miles', symbol: 'mi' },
    { value: 'percent', label: 'Percentage (%)', symbol: '%' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.icon) {
      newErrors.icon = 'Please select an icon';
    }
    
    if (!formData.targetAmt || formData.targetAmt <= 0) {
      newErrors.targetAmt = 'Target amount must be greater than 0';
    }
    
    if (parseFloat(formData.currentAmt) < 0) {
      newErrors.currentAmt = 'Current amount cannot be negative';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Please set a target deadline';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate <= today) {
        newErrors.deadline = 'Deadline must be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;   // true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Goal created:', formData);
      // Here you would typically send the data to your backend
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/add-goal`, formData, { withCredentials: true }); 
        } catch (error) {
            console.error('Error saving goal:', error);
        }
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          title: '',
          category: '',
          icon: '',
          targetAmt: '',
          currentAmt: '0',
          deadline: '',
          notes: '',
          unit: 'rupees'
        });
        navigate('/'); 
      }, 3000);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getIconComponent = (iconName) => {
    const icon = icons.find(i => i.name === iconName);
    return icon ? icon.component : Plus;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : 'bg-gray-500';
  };

  const getUnitSymbol = (unit) => {
    const unitObj = units.find(u => u.value === unit);
    return unitObj ? unitObj.symbol : '';
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Goal Created Successfully!</h2>
          <p className="text-green-600">Your goal "{formData.title}" has been added to your goal tracker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Create New Goal</h2>
          <p className="opacity-90">Set up a new personal goal to track your progress</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Goal Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Buy a new car, Lose 20 pounds, Save for vacation"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleInputChange('category', category.name)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.category === category.name
                      ? `${category.color} text-white border-transparent`
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Icon *
            </label>
            <div className="grid grid-cols-5 gap-3">
              {icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => handleInputChange('icon', icon.name)}
                    className={`p-3 rounded-lg border-2 transition-all border-transparent ${
                      formData.icon === icon.name
                        && `${getCategoryColor(formData.category)} text-white`
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto" />
                  </button>
                );
              })}
            </div>
            {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon}</p>}
          </div>

          {/* Target Amount and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.targetAmt}
                onChange={(e) => handleInputChange('targetAmt', e.target.value)}
                placeholder="25000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.targetAmt ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.targetAmt && <p className="mt-1 text-sm text-red-600">{errors.targetAmt}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Progress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Progress ({getUnitSymbol(formData.unit)})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.currentAmt}
              onChange={(e) => handleInputChange('currentAmt', e.target.value)}
              placeholder="0"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.currentAmt ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.currentAmt && <p className="mt-1 text-sm text-red-600">{errors.currentAmt}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Deadline *
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.deadline ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional details about your goal..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
            onClick={handleSubmit}
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Create Goal
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: '',
                  category: '',
                  icon: '',
                  targetAmount: '',
                  currentAmount: '0',
                  deadline: '',
                  notes: '',
                  unit: 'rupees'
                });
                setErrors({});
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalForm;