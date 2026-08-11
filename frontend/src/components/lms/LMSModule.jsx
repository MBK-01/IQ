import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  PlayCircle,
  FileText,
  HelpCircle,
  Code,
  CheckCircle,
  Award,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  QrCode,
  Download,
  Share2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const LMSModule = () => {
  const { courses, myEnrollments, enrollCourse, user } = useApp();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const categories = ['All', 'Technology', 'Leadership & Exam Prep', 'Design', 'Business'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const generateCertificateQR = async (courseTitle) => {
    try {
      const code = `IQ-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const verifyUrl = `https://inquisitors.uet.edu.pk/verify?code=${code}`;
      const url = await QRCode.toDataURL(verifyUrl, { width: 200, margin: 2 });
      setQrDataUrl(url);
      setShowCertificateModal(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    }
  };

  // Detailed Course Viewer Page
  if (selectedCourse) {
    const isEnrolled = myEnrollments.includes(selectedCourse.id);
    const totalLessons = selectedCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = selectedCourse.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => l.isCompleted).length,
      0
    );
    const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

    return (
      <div className="space-y-6 py-4">
        {/* Top Back Nav */}
        <button
          onClick={() => {
            setSelectedCourse(null);
            setActiveLesson(null);
          }}
          className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to LMS Catalog
        </button>

        {/* Course Header Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedCourse.category} • {selectedCourse.level}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedCourse.title}</h1>
              <p className="text-xs sm:text-sm text-slate-300">{selectedCourse.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span>Instructor: <strong className="text-white">{selectedCourse.instructor}</strong></span>
                <span>Duration: <strong className="text-white">{selectedCourse.durationHours} Hours</strong></span>
                <span>Rating: <strong className="text-amber-400">★ {selectedCourse.rating}</strong></span>
              </div>
            </div>

            {/* Enrollment / Certificate Card Action */}
            <div className="w-full md:w-72 glass-panel p-5 rounded-2xl border border-slate-700/80 space-y-4 text-center">
              <div>
                <p className="text-xs text-slate-400">Course Progress</p>
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden mt-2 border border-slate-800">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-xs text-cyan-400 font-bold mt-1.5">{progressPercent}% Completed ({completedCount}/{totalLessons} Lessons)</p>
              </div>

              {!isEnrolled ? (
                <button
                  onClick={() => enrollCourse(selectedCourse.id)}
                  className="w-full gradient-button py-3 rounded-xl text-xs font-bold"
                >
                  Enroll in Course
                </button>
              ) : progressPercent >= 100 ? (
                <button
                  onClick={() => generateCertificateQR(selectedCourse.title)}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Award className="w-4 h-4" /> Claim Certificate with QR
                </button>
              ) : (
                <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                  Complete all lessons to generate verified certificate.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modules & Lesson Player Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module List Sidebar */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Course Curriculum</h3>
            {selectedCourse.modules.map((mod) => (
              <div key={mod.id} className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-900/80 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-300">{mod.title}</h4>
                </div>
                <div className="p-2 space-y-1">
                  {mod.lessons.map((les) => {
                    const isSelected = activeLesson?.id === les.id;
                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLesson(les)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {les.type === 'video' && <PlayCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                          {les.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                          {les.type === 'assignment' && <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          {les.type === 'coding_lab' && <Code className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          <span className="truncate">{les.title}</span>
                        </div>
                        {les.isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Lesson Main View Area */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 lg:col-span-2 space-y-6">
            {activeLesson ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Active Lesson</span>
                    <h3 className="text-lg font-bold text-white">{activeLesson.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeLesson.duration} Mins
                  </span>
                </div>

                {/* Content Renderer based on type */}
                {activeLesson.type === 'video' && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center relative group">
                    <img src={selectedCourse.thumbnail} alt="Video poster" className="w-full h-full object-cover opacity-40" />
                    <button
                      onClick={() => alert(`Playing recorded HD lecture: ${activeLesson.title}`)}
                      className="absolute w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                    >
                      <PlayCircle className="w-8 h-8 fill-slate-950" />
                    </button>
                  </div>
                )}

                {activeLesson.type === 'quiz' && (
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-purple-300">Quiz Assessment: JavaScript Fundamentals</h4>
                    <p className="text-xs text-slate-300">Question 1 of 5: What is the output of `typeof NaN` in JavaScript?</p>
                    <div className="space-y-2 text-xs">
                      {['A) "number"', 'B) "NaN"', 'C) "undefined"', 'D) "object"'].map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-purple-500 cursor-pointer">
                          <input type="radio" name="quiz_opt" className="accent-purple-500" defaultChecked={idx === 0} />
                          <span className="text-slate-200">{opt}</span>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={() => alert('Quiz answer submitted! Score: 100%')}
                      className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-semibold"
                    >
                      Submit Quiz Answer
                    </button>
                  </div>
                )}

                {activeLesson.type === 'assignment' && (
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-amber-300">Assignment Submission Portal</h4>
                    <p className="text-xs text-slate-300">Upload your GitHub repository link and PDF report for evaluation.</p>
                    <input
                      type="text"
                      placeholder="https://github.com/username/project-repo"
                      className="w-full p-3 rounded-xl glass-input text-xs"
                    />
                    <button
                      onClick={() => alert('Assignment successfully submitted to instructor for grading!')}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-xs font-semibold"
                    >
                      Submit Assignment
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-72 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
                <PlayCircle className="w-12 h-12 text-slate-600 animate-pulse" />
                <p className="text-xs">Select any lesson from the curriculum sidebar to begin learning.</p>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-amber-500/40 text-center space-y-4 relative">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Course Completion Certificate</h3>
              <p className="text-xs text-slate-300">This certifies that <strong className="text-amber-400">{user.name}</strong> has successfully completed all requirements for:</p>
              <p className="text-sm font-bold text-cyan-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">{selectedCourse.title}</p>
              
              {/* QR Code Embed */}
              <div className="p-4 bg-white rounded-2xl inline-block shadow-xl">
                {qrDataUrl && <img src={qrDataUrl} alt="Certificate QR Code" className="w-36 h-36 mx-auto" />}
              </div>
              <p className="text-[10px] text-slate-400">Scan QR Code to verify authenticity on Inquisitors Society Registry.</p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => alert('Certificate downloaded as PDF!')}
                  className="flex-1 gradient-button py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Course Catalog Main View
  return (
    <div className="space-y-8 py-4">
      {/* Search & Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-cyan-400" /> Learning Management System (LMS)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Explore society courses, recorded lectures, quizzes, coding labs, and earn QR-verified certificates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl glass-input text-xs w-60"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((crs) => {
          const isEnrolled = myEnrollments.includes(crs.id);
          return (
            <div
              key={crs.id}
              className="glass-panel-interactive rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={crs.thumbnail} alt={crs.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {crs.category}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {crs.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{crs.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{crs.durationHours} Hours • {crs.level}</span>
                  <span className="text-amber-400 font-bold">★ {crs.rating}</span>
                </div>

                <button
                  onClick={() => setSelectedCourse(crs)}
                  className="w-full gradient-button py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  {isEnrolled ? 'Open Enrolled Course' : 'View Details & Enroll'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
