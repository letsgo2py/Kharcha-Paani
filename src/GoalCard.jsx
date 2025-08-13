import React from 'react';
import { Car, IndianRupee, Dumbbell, Home, GraduationCap, Heart, Calendar, Target } from 'lucide-react';

const GoalCard = ({ goal }) => {
  const {
    title,
    targetAmt,
    currentAmt,
    deadline,
    category,
    icon,
    notes,
    unit
  } = goal;

  const progress = Math.round((currentAmt / targetAmt) * 100);

  const getIcon = (iconName) => {
    const iconProps = { className: "w-8 h-8", strokeWidth: 1.5 };
    switch (iconName) {
      case 'Car': return <Car {...iconProps} />;
      case 'RupeeSign':
      case 'IndianRupee': return <IndianRupee {...iconProps} />;
      case 'Dumbbell': return <Dumbbell {...iconProps} />;
      case 'Home': return <Home {...iconProps} />;
      case 'GraduationCap': return <GraduationCap {...iconProps} />;
      case 'Heart': return <Heart {...iconProps} />;
      default: return <Target {...iconProps} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'financial': return 'bg-green-500';
      case 'health': return 'bg-red-500';
      case 'career': return 'bg-blue-500';
      case 'personal': return 'bg-purple-500';
      case 'education': return 'bg-yellow-500';
      case 'lifestyle': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount, unit) => {
    if (unit?.toLowerCase() === 'rupees') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const displayNotes = notes && notes.trim() !== ''
    ? notes
    : 'No additional notes provided. Keep up the great work!';

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'No deadline set';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 w-full sm:w-[20rem] md:w-[22rem] min-h-[28rem] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-xl text-white ${getCategoryColor(category)}`}>
            {getIcon(icon)}
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-white text-gray-600 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{displayNotes}</p>
      </div>

      {/* Main content */}
      <div className="p-6 pt-4 flex flex-col justify-between flex-1">
        <div>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentAmt, unit)}
              </span>
              <span className="text-sm text-gray-500">
                of {formatCurrency(targetAmt, unit)}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${getCategoryColor(category)}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{progress}% Complete</span>
              <span className="text-gray-500">
                {formatCurrency(targetAmt - currentAmt, unit)} to go
              </span>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Target: <span className="font-medium">{formattedDeadline}</span>
            </span>
          </div>
        </div>

        {/* Action */}
        <button
          className={`w-full text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 ${getCategoryColor(category)} hover:opacity-90`}
        >
          Update Progress
        </button>
      </div>
    </div>
  );
};

export default GoalCard;

