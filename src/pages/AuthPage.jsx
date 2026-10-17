import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

export default function AuthPage({ defaultMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(defaultMode);
  const [role, setRole] = useState('driver');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: fullName || (email ? email.split('@')[0] : 'Demo User'),
      email: email || 'driver@parkease.com',
      role: role === 'driver' ? 'Motorist' : 'Space Host'
    };
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleDemoLogin = (demoRole) => {
    const demoUser = {
      name: demoRole === 'driver' ? 'Alex Rivera' : 'Downtown Host Co.',
      email: demoRole === 'driver' ? 'alex.rivera@example.com' : 'host@parkease.com',
      role: demoRole === 'driver' ? 'Motorist' : 'Space Host'
    };
    if (onLoginSuccess) {
      onLoginSuccess(demoUser);
    }
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center text-white relative">
          <div className="flex justify-center mb-3">
            <Logo variant="dark" />
          </div>
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Welcome Back to ParkEase' : 'Join ParkEase Today'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Access your parking reservations & vehicle assistance history'
              : 'Create an account to book spots or list your parking property'}
          </p>

          {/* Mode Switcher */}
          <div className="flex p-1 bg-slate-800 rounded-xl mt-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setIsSuccess(false); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setIsSuccess(false); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {!isSuccess ? (
            <div className="space-y-4">
              
              {/* Role Toggle */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('driver')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      role === 'driver'
                        ? 'border-sky-500 bg-sky-50 text-sky-800 font-bold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    🚗 Motorist
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('owner')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      role === 'owner'
                        ? 'border-sky-500 bg-sky-50 text-sky-800 font-bold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    🅿️ Space Host
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="driver@parkease.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-slate-700">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Password reset simulation link dispatched.')}
                        className="text-[11px] text-sky-600 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{mode === 'login' ? 'Sign In to ParkEase' : 'Create Verified Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Demo Sign-in */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400 block mb-2">Test with demo accounts:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('driver')}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                  >
                    Demo Driver
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('owner')}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                  >
                    Demo Space Host
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Success confirmation */
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {mode === 'login' ? 'Welcome Back!' : 'Account Created Successfully!'}
              </h4>
              <p className="text-xs text-slate-500">Redirecting to ParkEase homepage...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
