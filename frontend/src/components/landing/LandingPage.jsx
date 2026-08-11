import React from 'react';
import { useApp } from '../../context/AppContext';
import { CampusCanvas } from '../3d/CampusCanvas';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Building,
  Bot,
  Zap
} from 'lucide-react';

export const LandingPage = () => {
  const {
    courses,
    events,
    internships,
    setActiveTab,
    enrollCourse,
    registerEvent,
    myEnrollments,
    myEventRegistrations
  } = useApp();

  return (
    <div className="space-y-16 py-4">
      {/* HERO SECTION WITH 3D CANVAS */}
      <section className="relative space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Next-Gen 3D Educational Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Elevate Engineering Learning with <span className="gradient-text">Inquisitors Society</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the official 3D Intelligent Learning & Career Development Platform. Explore interactive campus buildings, master modern technical courses, secure prestigious internships, and leverage AI career guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('lms')}
              className="gradient-button px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Explore LMS Courses
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('internships')}
              className="px-6 py-3 rounded-2xl glass-panel-interactive text-xs sm:text-sm font-semibold text-white flex items-center gap-2 border border-slate-700"
            >
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Browse Internships
            </button>
          </div>
        </div>

        {/* 3D WebGL Campus Interactive Container */}
        <div className="pt-4">
          <CampusCanvas />
        </div>
      </section>

      {/* SYSTEM STATS COUNTER */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {[
          { label: 'Active Students', val: '12,480+', icon: Users, color: 'text-cyan-400' },
          { label: 'LMS Courses & Labs', val: '34+', icon: GraduationCap, color: 'text-purple-400' },
          { label: 'Certificates Issued', val: '4,210+', icon: Award, color: 'text-amber-400' },
          { label: 'Partner Companies', val: '88+', icon: Building, color: 'text-emerald-400' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <div className={`w-10 h-10 mx-auto rounded-xl bg-slate-900 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">{stat.val}</h3>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* FEATURED ANIMATED 3D COURSE CARDS SECTION (FR-10-017) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Skill Excellence</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Featured LMS Courses</h2>
          </div>
          <button
            onClick={() => setActiveTab('lms')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            View All Courses ({courses.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((crs) => {
            const isEnrolled = myEnrollments.includes(crs.id);
            return (
              <div
                key={crs.id}
                className="glass-panel-interactive rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={crs.thumbnail}
                    alt={crs.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {crs.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    ★ {crs.rating}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {crs.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {crs.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Instructor: {crs.instructor}</span>
                    <span className="text-cyan-400 font-bold">{crs.price === 0 ? 'FREE' : `PKR ${crs.price}`}</span>
                  </div>

                  <button
                    onClick={() => enrollCourse(crs.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isEnrolled
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'gradient-button'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Enrolled - Continue Learning
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-4 h-4" /> Enroll Now (One Click)
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING SOCIETY EVENTS SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Society Activities</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Upcoming Events & Workshops</h2>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
          >
            View All Events ({events.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isReg = myEventRegistrations.includes(evt.id);
            return (
              <div key={evt.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-purple-500/20 backdrop-blur-md text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-purple-500/30">
                    {evt.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{evt.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>📅 {evt.date}</span> • <span>📍 {evt.venue}</span>
                  </p>
                </div>
                <button
                  onClick={() => registerEvent(evt.id)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                    isReg
                      ? 'bg-slate-800 text-purple-400 border border-purple-500/40'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  {isReg ? '✓ Registered - View QR Ticket' : 'Register & Get QR Ticket'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* TOP INTERNSHIPS & AI ADVISOR BANNER */}
      <section className="glass-panel p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Bot className="w-4 h-4" />
            <span>AI Resume & Career Guidance</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Land Your Dream Tech Internship with AI Assistance</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inquisitors Society connects UET students directly with verified industry recruiters. Upload your resume to our AI Resume Analyzer to identify missing keywords and get real-time scoring!
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ai_suite')}
              className="gradient-button px-5 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Launch AI Career Advisor
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700"
            >
              Browse 88+ Internships
            </button>
          </div>
        </div>

        <div className="w-full md:w-80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Internship</h4>
          {internships.slice(0, 1).map((int) => (
            <div key={int.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-3">
                <img src={int.companyLogo} alt={int.company} className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{int.title}</h4>
                  <p className="text-[10px] text-cyan-400">{int.company}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 font-semibold">{int.stipend}</p>
              <button
                onClick={() => setActiveTab('internships')}
                className="w-full py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold border border-cyan-500/30"
              >
                Apply via Student Portal
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
