import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Sparkles,
  Send,
  FileSearch,
  Compass,
  Award,
  AlertCircle,
  CheckCircle2,
  Brain,
  Globe
} from 'lucide-react';

export const AIModule = () => {
  const { user } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('chatbot'); // 'chatbot', 'resume_analyzer', 'career_advisor'

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: `Assalam-o-Alaikum ${user.name}! I am the Inquisitors AI Assistant. How can I guide you today regarding LMS courses, internship applications, or society events? (Supports English & Urdu queries)`, time: '10:00 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Resume Analyzer State
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Simulated AI Chat Bot Responses
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, userMsg]);
    const textLower = chatInput.toLowerCase();
    setChatInput('');

    setTimeout(() => {
      let botReply = "I am analyzing your query with the Inquisitors Knowledge Base. You can explore courses, apply for internships, or check the event calendar!";

      if (textLower.includes('course') || textLower.includes('lms')) {
        botReply = "We currently have 34+ active courses including 'Full-Stack Web Development Mastery (React & WebGL)' and 'AI Machine Learning Pipeline'. You can enroll with a single click in the LMS tab!";
      } else if (textLower.includes('internship') || textLower.includes('job')) {
        botReply = "TechCorp Solutions and InnovateAI Labs are currently recruiting for 3D Web Engineers and NLP Interns. Stipends range up to PKR 50,000/Month!";
      } else if (textLower.includes('event') || textLower.includes('hackathon')) {
        botReply = "The Inquisitors National Hackathon 2026 is scheduled for Sept 10 at UET Auditorium Complex. One-click registration with QR ticketing is open now.";
      } else if (textLower.includes('urdu') || textLower.includes('سلام')) {
        botReply = "وعلیکم السلام! انکوائزیٹرز سوسائٹی میں خوش آمدید۔ آپ کس کورس یا انٹرن شپ کے بارے میں معلومات حاصل کرنا چاہتے ہیں؟";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 600);
  };

  const handleAnalyzeResume = () => {
    if (!resumeText.trim()) return;
    setAnalysisResult({
      score: 88,
      matchGrade: 'A (Strong Applicant)',
      missingKeywords: ['Docker', 'TypeScript', 'GraphQL', 'Jest'],
      strengths: [
        'Solid foundation in React & JavaScript ES6+',
        'Demonstrated WebGL & 3D rendering project work',
        'Strong academic record at UET Lahore'
      ],
      recommendations: [
        'Add quantitative metrics to your experience section (e.g. "Optimized 3D rendering by 40%").',
        'Include a direct link to your live Inquisitors Portfolio URL.'
      ]
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" /> AI Assistant & Career Intelligence Suite
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Multilingual AI assistant, instant resume ATS scorer, and intelligent career pathway advisor powered by Gemini & Claude.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('chatbot')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'chatbot' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Support Chatbot
          </button>
          <button
            onClick={() => setActiveSubTab('resume_analyzer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'resume_analyzer' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Resume Analyzer
          </button>
          <button
            onClick={() => setActiveSubTab('career_advisor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'career_advisor' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Skill Gap & Advisor
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: AI CHATBOT */}
      {activeSubTab === 'chatbot' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Inquisitors AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online • English & Urdu NLP
                </p>
              </div>
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="h-80 overflow-y-auto space-y-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-900">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs max-w-xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about courses, internships, or events (English or اردو)..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 rounded-xl glass-input text-xs"
            />
            <button type="submit" className="gradient-button px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 2: AI RESUME ANALYZER */}
      {activeSubTab === 'resume_analyzer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-cyan-400" /> Paste Resume Content for AI Analysis
            </h3>
            <textarea
              rows={10}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your CV text or summary here to run real-time ATS scoring against top tech job requirements..."
              className="w-full p-3 rounded-xl glass-input text-xs"
            />
            <button
              onClick={handleAnalyzeResume}
              className="w-full gradient-button py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Run AI Resume Audit
            </button>
          </div>

          {/* Analysis Report Output */}
          {analysisResult ? (
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">AI Audit Report</h3>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  ATS Score: {analysisResult.score}/100
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-300">Strengths:</h4>
                  <ul className="list-disc list-inside space-y-1 text-emerald-400 mt-1">
                    {analysisResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-300">Missing Industry Keywords:</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {analysisResult.missingKeywords.map((kw) => (
                      <span key={kw} className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-500/30">
                        + Add {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-300">AI Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1">
                    {analysisResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
              <Brain className="w-12 h-12 text-slate-600 animate-bounce" />
              <p className="text-xs">Paste CV text on the left and click "Run AI Resume Audit" to view instant feedback.</p>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: AI CAREER & SKILL GAP ADVISOR */}
      {activeSubTab === 'career_advisor' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-purple-400" /> AI Skill Gap Analysis & Recommended Roadmap
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-cyan-400">Current Profile Proficiency</h4>
              <p className="text-slate-300">React, JavaScript, Python, Data Structures</p>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Level: Intermediate</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-400">Target Role: AI Full-Stack Lead</h4>
              <p className="text-slate-300">Target Market Salary: PKR 180,000 / Month</p>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded">Demand: Very High</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400">Recommended LMS Action</h4>
              <p className="text-slate-300">Enroll in "Artificial Intelligence & Machine Learning Pipeline"</p>
              <button
                onClick={() => alert('Redirected to AI Course enrollment!')}
                className="text-[10px] font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-lg mt-1"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
