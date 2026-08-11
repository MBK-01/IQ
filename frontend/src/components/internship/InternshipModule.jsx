import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  CheckCircle,
  FileText,
  UserCheck,
  Send,
  X,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

export const InternshipModule = () => {
  const { internships, myApplications, applyInternship, user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'my_applications', 'mentor_eval'
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  const types = ['All', 'Paid', 'Unpaid', 'Academic Credit'];

  const filteredInternships = internships.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesQuery && matchesType;
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!selectedInternship) return;
    applyInternship(selectedInternship.id, coverLetter, cvUrl || 'https://inquisitors.uet.edu.pk/cv/student.pdf');
    setSelectedInternship(null);
    setCoverLetter('');
    setCvUrl('');
    alert('Application submitted successfully to company HR and assigned mentor!');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" /> Internship & Industry Recruitment Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified industry internships, apply with AI resume integration, track application pipelines, and receive mentor evaluation feedback.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'listings' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Available Listings ({internships.length})
          </button>
          <button
            onClick={() => setActiveTab('my_applications')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'my_applications' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            My Applications ({myApplications.length})
          </button>
          {(user.role === 'mentor' || user.role === 'admin' || user.role === 'company') && (
            <button
              onClick={() => setActiveTab('mentor_eval')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'mentor_eval' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mentor Evaluation Dashboard
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search internships or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl glass-input text-xs w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold ${
                    selectedType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Internship Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((int) => {
              const hasApplied = myApplications.some((a) => a.internshipId === int.id);
              return (
                <div
                  key={int.id}
                  className="glass-panel-interactive p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={int.companyLogo} alt={int.company} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{int.title}</h3>
                        <p className="text-xs font-semibold text-cyan-400 mt-0.5">{int.company}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{int.description}</p>

                    <div className="space-y-1.5 text-xs text-slate-400 pt-2">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {int.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> Duration: {int.duration}
                      </p>
                      <p className="flex items-center gap-2 font-bold text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" /> Stipend: {int.stipend}
                      </p>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {int.skills.map((s) => (
                        <span key={s} className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-0.5 rounded-md border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedInternship(int)}
                    disabled={hasApplied}
                    className={`w-full mt-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      hasApplied
                        ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                        : 'gradient-button'
                    }`}
                  >
                    {hasApplied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> Already Applied
                      </>
                    ) : (
                      <>
                        Apply for Internship <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MY APPLICATIONS STATUS PIPELINE */}
      {activeTab === 'my_applications' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Application Pipeline & Status</h3>
          <div className="space-y-4">
            {myApplications.map((app) => (
              <div key={app.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">{app.title}</h3>
                    <p className="text-xs text-cyan-400 font-semibold">{app.company} • Applied on {app.appliedDate}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase ${
                      app.status === 'Shortlisted'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : app.status === 'Under Review'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Mentor Feedback & Score */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4" /> Mentor: {app.mentor}
                    </span>
                    {app.score && (
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        Score: {app.score}/100
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 italic">"{app.mentorFeedback}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MENTOR EVALUATION DASHBOARD */}
      {activeTab === 'mentor_eval' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Candidate Evaluation Portal
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Review student applicant profiles, score skills, and shortlist candidates for company interview.</p>
            </div>
          </div>

          <div className="space-y-4">
            {myApplications.map((cand) => (
              <div key={cand.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Student Applicant: {user.name}</h4>
                    <p className="text-xs text-slate-400">Position: {cand.title} at {cand.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                    GPA: 3.82 • 3rd Year CS
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Skills:</strong> React, Three.js, JavaScript, Python, ML</p>
                  <p><strong>Cover Note:</strong> "Eager to apply 3D WebGL skills to enterprise industrial dashboards."</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => alert(`Candidate ${user.name} successfully Shortlisted for TechCorp final interview!`)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
                  >
                    Accept & Shortlist Candidate
                  </button>
                  <button
                    onClick={() => alert(`Requested updated resume from candidate.`)}
                    className="bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700"
                  >
                    Request More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATION MODAL */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-slate-700 space-y-4 relative">
            <button
              onClick={() => setSelectedInternship(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Apply for {selectedInternship.title}</h3>
              <p className="text-xs text-cyan-400 font-semibold">{selectedInternship.company}</p>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Letter / Statement of Purpose</label>
                <textarea
                  required
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you are a great candidate for this internship position..."
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">CV / Portfolio Link</label>
                <input
                  type="url"
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-resume.pdf"
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-white">Attached Student Profile:</p>
                <p>Name: {user.name} ({user.department})</p>
                <p>Email: {user.email}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 gradient-button py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
