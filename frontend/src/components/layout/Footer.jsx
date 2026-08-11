import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full glass-panel border-t border-slate-800/80 mt-16 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <img src="/IQ LOGO.png" alt="Inquisitors Logo" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">INQUISITORS SOCIETY</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            3D Intelligent Learning & Career Development Platform. Empowering students at University of Engineering & Technology (UET) Lahore with futuristic digital transformation.
          </p>
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Built per SRS Specification v1.0</span>
          </div>
        </div>

        {/* Modules Nav */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform Modules</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('lms')} className="hover:text-cyan-400 transition-colors">Learning Management System</button></li>
            <li><button onClick={() => setActiveTab('internships')} className="hover:text-cyan-400 transition-colors">Internship Management</button></li>
            <li><button onClick={() => setActiveTab('events')} className="hover:text-cyan-400 transition-colors">Event & Workshop Tickets</button></li>
            <li><button onClick={() => setActiveTab('career')} className="hover:text-cyan-400 transition-colors">Career Hub & Job Board</button></li>
            <li><button onClick={() => setActiveTab('community')} className="hover:text-cyan-400 transition-colors">Community & Q&A Forum</button></li>
            <li><button onClick={() => setActiveTab('ai_suite')} className="hover:text-cyan-400 transition-colors">AI Advisor & Resume Analyzer</button></li>
          </ul>
        </div>

        {/* Society Team */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">SRS Project Team</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• Ubaidullah Shahid (Intern No.27)</li>
            <li>• Usman (Intern No.284)</li>
            <li>• Ilsa Javed (Intern No.45)</li>
            <li>• Tayyeba Qamar (Intern No.27)</li>
            <li>• Muhammad Tayyab (Intern No.27)</li>
            <li>• Muhammad Umar (Intern No.27)</li>
            <li className="pt-1 text-cyan-300 font-semibold">• Submitted to: Sir Burhan</li>
          </ul>
        </div>

        {/* University Info */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Institution</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            University of Engineering and Technology (UET) Lahore, GT Road, Lahore, Punjab, Pakistan.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-white">Compliance:</span> HEC Standards, OWASP Top 10, WCAG 2.1 AA.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Inquisitors Society UET Lahore. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for technical excellence.
        </p>
      </div>
    </footer>
  );
};
