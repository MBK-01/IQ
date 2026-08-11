import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  FileText,
  Briefcase,
  User,
  Sparkles,
  Download,
  ExternalLink,
  Plus,
  CheckCircle,
  Award
} from 'lucide-react';

export const CareerModule = () => {
  const { jobPostings, user } = useApp();
  const [activeTab, setActiveTab] = useState('job_board'); // 'job_board', 'portfolio', 'resume_builder'
  
  // Interactive Resume Builder State
  const [resumeData, setResumeData] = useState({
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    summary: 'Third-year Computer Science student passionate about full-stack web development, WebGL 3D graphics, and machine learning.',
    experience: 'Web Development Intern at Inquisitors Society (Built 3D learning platform).',
    skills: user.skills.join(', '),
    education: 'BS Computer Science, UET Lahore (2023 - 2027)'
  });

  const handleAISuggest = () => {
    setResumeData((prev) => ({
      ...prev,
      summary: 'Results-driven CS undergraduate at UET Lahore with expertise in React, Three.js, and Node.js microservices. Proven track record of developing high-throughput web apps and participating in competitive hackathons.'
    }));
    alert('AI Resume Optimizer updated your summary with impact keywords!');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-pink-400" /> Career Development & Job Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access job openings, showcase student project portfolios, and build ATS-friendly resumes with AI enhancement.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('job_board')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'job_board' ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Job Board ({jobPostings.length})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'portfolio' ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Project Portfolio Showcase
          </button>
          <button
            onClick={() => setActiveTab('resume_builder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'resume_builder' ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Resume Builder
          </button>
        </div>
      </div>

      {/* TAB 1: JOB BOARD */}
      {activeTab === 'job_board' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Full-Time & Graduate Hiring Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPostings.map((job) => (
              <div key={job.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/30">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500">{job.postedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{job.company} • {job.location}</p>
                  <p className="text-xs text-emerald-400 font-bold">{job.salary}</p>
                  <p className="text-xs text-slate-400">Experience Required: {job.experience}</p>
                </div>

                <button
                  onClick={() => alert(`Job application for ${job.title} at ${job.company} submitted!`)}
                  className="w-full gradient-button py-2.5 rounded-xl text-xs font-semibold"
                >
                  One-Click Apply with Profile CV
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO SHOWCASE */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Featured Student Projects & Portfolios</h3>
            <button
              onClick={() => alert('Add Project Modal opened!')}
              className="gradient-button px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Showcase New Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '3D Campus Digital Twin & Telemetry',
                student: user.name,
                tech: ['React', 'Three.js', 'WebGL', 'Tailwind'],
                img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
                desc: 'Interactive 3D campus web application built according to IEEE SRS specification.'
              },
              {
                title: 'Automated AI Resume & Skill Gap Classifier',
                student: 'Ayesha Siddiqui',
                tech: ['Python', 'PyTorch', 'FastAPI', 'React'],
                img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
                desc: 'Deep learning pipeline analyzing resumes against live tech job postings.'
              }
            ].map((proj, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="h-40 rounded-2xl overflow-hidden">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">By {proj.student}</p>
                  <p className="text-xs text-slate-300 mt-2">{proj.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="bg-slate-900 text-slate-300 text-[10px] px-2.5 py-0.5 rounded-md border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI RESUME BUILDER */}
      {activeTab === 'resume_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Controls */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-400" /> Resume Editor
              </h3>
              <button
                onClick={handleAISuggest}
                className="bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-pink-500/30"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Enhance Summary
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Professional Summary</label>
                <textarea
                  rows={4}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Technical Skills</label>
                <input
                  type="text"
                  value={resumeData.skills}
                  onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>
            </div>
          </div>

          {/* Live PDF-Style Resume Preview */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl space-y-4 font-sans text-xs">
            <div className="border-b border-slate-300 pb-4">
              <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">{resumeData.fullName}</h2>
              <p className="text-slate-600 font-semibold mt-1">{resumeData.email} • {resumeData.phone}</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">Professional Summary</h4>
              <p className="text-slate-700 leading-relaxed">{resumeData.summary}</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">Education</h4>
              <p className="font-bold text-slate-800">{resumeData.education}</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">Technical Skills</h4>
              <p className="text-slate-700">{resumeData.skills}</p>
            </div>

            <button
              onClick={() => alert('Resume exported as formatted PDF!')}
              className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> Export Resume (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
