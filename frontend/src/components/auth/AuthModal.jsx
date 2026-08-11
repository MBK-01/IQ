import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Building, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setUser } = useApp();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Multi-step company fields (FR-01-006)
  const [companyName, setCompanyName] = useState('');
  const [regNo, setRegNo] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: name || (role === 'company' ? companyName : 'Registered User'),
      email: email || 'user@uet.edu.pk',
      role
    }));
    setIsAuthModalOpen(false);
    alert(`Successfully signed in as ${role.toUpperCase()}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <img src="/IQ LOGO.png" alt="Inquisitors Logo" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">
            {authMode === 'login' ? 'Welcome Back to Inquisitors' : 'Create Inquisitors Account'}
          </h3>
          <p className="text-xs text-slate-400">
            Enter your credentials to access your 3D learning portal.
          </p>
        </div>

        {/* Role Selector Tabs */}
        {authMode === 'register' && (
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Select Your Role</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 text-[10px] font-semibold">
              {['student', 'teacher', 'mentor', 'company', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-1.5 rounded-lg capitalize transition-colors ${
                    role === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'register' && role !== 'company' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ahmed Khan"
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>
          )}

          {/* Multi-step company registration fields (FR-01-006) */}
          {authMode === 'register' && role === 'company' && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Registered Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. TechCorp Solutions Ltd"
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Reg Number</label>
                <input
                  type="text"
                  required
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. REG-PK-98214"
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@uet.edu.pk"
              className="w-full p-3 rounded-xl glass-input"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-3 rounded-xl glass-input"
            />
          </div>

          <button type="submit" className="w-full gradient-button py-3 rounded-xl font-bold">
            {authMode === 'login' ? 'Sign In to Portal' : 'Register Account'}
          </button>
        </form>

        {/* OAuth Buttons */}
        <div className="pt-2 border-t border-slate-800 text-center space-y-3">
          <p className="text-[11px] text-slate-400">Or continue with Social SSO</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit({ preventDefault: () => {} })}
              className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Google OAuth
            </button>
            <button
              onClick={() => handleSubmit({ preventDefault: () => {} })}
              className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              GitHub OAuth
            </button>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-cyan-400 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
