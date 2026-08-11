import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  MessageSquare,
  Bot,
  Shield,
  Bell,
  UserCheck,
  ChevronDown,
  Sparkles,
  LogOut,
  User
} from 'lucide-react';

export const Navbar = () => {
  const {
    user,
    switchRole,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationAsRead,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles = [
    { id: 'student', label: 'Student', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
    { id: 'teacher', label: 'Faculty / Teacher', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
    { id: 'mentor', label: 'Industry Mentor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { id: 'company', label: 'Company HR', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
    { id: 'admin', label: 'System Admin', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' }
  ];

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'lms', label: 'LMS Courses', icon: GraduationCap },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'career', label: 'Career Hub', icon: Building2 },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'ai_suite', label: 'AI Suite', icon: Bot },
    { id: 'admin', label: 'Admin Panel', icon: Shield, roleRequired: 'admin' }
  ];

  const currentRoleObj = roles.find(r => r.id === user.role) || roles[0];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <img src="/IQ LOGO.png" alt="Inquisitors Logo" className="w-7 h-7 object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              INQUISITORS <span className="text-cyan-400 font-light text-xs uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">Society</span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">3D Intelligent Educational Ecosystem</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Role Switcher, Notifications, Auth */}
        <div className="flex items-center gap-3">
          {/* Active Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${currentRoleObj.color}`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Role: {currentRoleObj.label}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl border border-slate-700/80 p-2 shadow-2xl z-50">
                <p className="text-[10px] text-slate-400 px-3 py-1 font-semibold uppercase tracking-wider">Switch System Role</p>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      user.role === r.id ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    {r.label}
                    {user.role === r.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-slate-700/80 p-3 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-white">Notifications</h4>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">{unreadCount} Unread</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        n.read ? 'bg-slate-900/40 border-slate-800/60 text-slate-400' : 'bg-slate-800/80 border-cyan-500/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-cyan-300">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] mt-1 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile / Auth Action */}
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-cyan-500/50 object-cover cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveTab('my_profile')}
            />
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 gradient-button px-3.5 py-1.5 rounded-xl text-xs"
            >
              <User className="w-3.5 h-3.5" />
              Sign In / Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
