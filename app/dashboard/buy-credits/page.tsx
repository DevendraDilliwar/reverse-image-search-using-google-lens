'use client'
import React, { use } from 'react';
import { ShoppingCart, Clock, CheckCircle, Shield, TrendingUp, CreditCard } from 'lucide-react';

// Current Balance Component
const CurrentBalance = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Current Balance</h3>
        <CreditCard className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-blue-600 mb-1">150</div>
        <div className="text-sm text-blue-600">Credits Available</div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Usage Progress</span>
          <span>150/500</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-800 h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <div>
          <div className="text-2xl font-bold text-gray-800">350</div>
          <div className="text-gray-600">Used</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">150</div>
          <div className="text-gray-600">Remaining</div>
        </div>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { type: 'purchase', title: 'Purchased Pro Pack', time: '2 days ago', credits: '+500', amount: '$39.99', color: 'green' },
    { type: 'usage', title: 'AI Image Generation', time: '3 days ago', credits: '-25', color: 'blue' },
    { type: 'usage', title: 'Text Analysis', time: '5 days ago', credits: '-10', color: 'blue' },
    { type: 'purchase', title: 'Purchased Starter Pack', time: '1 week ago', credits: '+100', amount: '$9.99', color: 'green' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${activity.color === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <div>
                <div className="font-medium text-gray-800">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${activity.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
                {activity.credits}
              </div>
              {activity.amount && <div className="text-sm text-gray-500">{activity.amount}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan, isPopular = false }) => {
  const { title, subtitle, credits, price, pricePerCredit, features, buttonColor, buttonText } = plan;
  
  return (
    <div className={`relative bg-white border-2 rounded-xl p-6 ${isPopular ? 'border-purple-300 shadow-lg' : 'border-gray-200'}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            ⭐ Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <span className="text-yellow-500 mr-2">⚡</span>
          <span className="text-3xl font-bold text-gray-800">{credits}</span>
        </div>
        <div className="text-sm text-gray-600">AI Credits</div>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-800 mb-1">{price}</div>
        <div className="text-sm text-gray-600">{pricePerCredit}</div>
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
      
      <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${buttonColor}`}>
        <ShoppingCart className="w-4 h-4 inline mr-2" />
        {buttonText}
      </button>
    </div>
  );
};

// Info Cards Component
const InfoCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center mb-3">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="font-semibold text-green-800">How Credits Work</h4>
        </div>
        <p className="text-green-700 text-sm">
          Credits are consumed based on the AI services you use. Image generation costs 25 credits, 
          text analysis costs 10 credits, and document processing costs 15 credits.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center mb-3">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-800">Secure Payment</h4>
        </div>
        <p className="text-blue-700 text-sm">
          All payments are processed securely through Stripe. Your payment information is encrypted 
          and never stored on our servers.
        </p>
      </div>
    </div>
  );
};

// Main Buy Credits Component
const BuyCreditsPage = () => {
  const pricingPlans = [
    {
      title: 'Starter Pack',
      subtitle: 'Perfect for individuals',
      credits: '100',
      price: '$9.99',
      pricePerCredit: '$0.100 per credit',
      features: ['100 AI Credits', 'Basic Support', '30-day validity', 'Email notifications'],
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonText: 'Buy Now'
    },
    {
      title: 'Pro Pack',
      subtitle: 'Perfect for professionals',
      credits: '500',
      price: '$39.99',
      pricePerCredit: '$0.080 per credit',
      features: ['500 AI Credits', 'Priority Support', '90-day validity', 'Advanced analytics', 'API access'],
      buttonColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      buttonText: 'Buy Now'
    },
    {
      title: 'Enterprise Pack',
      subtitle: 'Perfect for teams',
      credits: '1,500',
      price: '$99.99',
      pricePerCredit: '$0.067 per credit',
      features: ['1500 AI Credits', '24/7 Premium Support', '1-year validity', 'Advanced analytics', 'Full API access', 'Custom integrations'],
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonText: 'Buy Now'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Buy Credits</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Power your AI projects with our flexible credit system. Choose the perfect plan for your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <CurrentBalance />
            <RecentActivity />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard 
                  key={index} 
                  plan={plan} 
                  isPopular={index === 1} 
                />
              ))}
            </div>

            {/* Info Cards */}
            <InfoCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsPage;