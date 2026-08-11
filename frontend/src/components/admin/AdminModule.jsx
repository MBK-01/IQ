import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  Activity,
  CheckCircle,
  XCircle,
  FileCheck,
  Server,
  TrendingUp,
  Award,
  BookOpen,
  DollarSign
} from 'lucide-react';

export const AdminModule = () => {
  const { systemAnalytics, user, switchRole } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('analytics'); // 'analytics', 'users', 'content', 'health'
  
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Ahmed Khan', email: 'ahmed@uet.edu.pk', role: 'student', status: 'Active' },
    { id: 'usr-2', name: 'Dr. Hassan Raza', email: 'hassan@uet.edu.pk', role: 'teacher', status: 'Active' },
    { id: 'usr-3', name: 'Fatima Noor', email: 'fatima@techcorp.com', role: 'mentor', status: 'Active' },
    { id: 'usr-4', name: 'TechCorp HR', email: 'hr@techcorp.com', role: 'company', status: 'Active' }
  ]);

  const [pendingContent, setPendingContent] = useState([
    { id: 'p-1', type: 'Course', title: 'Advanced Quantum Computing Fundamentals', submitter: 'Dr. Hassan Raza', date: '2026-08-08' },
    { id: 'p-2', type: 'Internship', title: 'Cybersecurity Analyst Intern', submitter: 'TechCorp Solutions', date: '2026-08-09' }
  ]);

  const handleApprove = (id) => {
    setPendingContent((prev) => prev.filter((p) => p.id !== id));
    alert('Content item approved and published live onto platform!');
  };

  const handleRoleChange = (id, newRole) => {
    setUsersList((prev) => prev.map((u) => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" /> Platform Operations & Admin Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry analytics, role-based access control, content approvals, and system health metrics.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Analytics Dashboard
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'users' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            User Management ({usersList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('content')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'content' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Approvals ({pendingContent.length})
          </button>
          <button
            onClick={() => setActiveSubTab('health')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'health' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Server Telemetry
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: ANALYTICS DASHBOARD */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Total Registered Users</span>
              <h3 className="text-2xl font-black text-white">{systemAnalytics.totalUsers.toLocaleString()}</h3>
              <p className="text-[10px] text-emerald-400 font-semibold">+12% Growth this month</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Active Course Enrollments</span>
              <h3 className="text-2xl font-black text-white">4,890</h3>
              <p className="text-[10px] text-cyan-400 font-semibold">Across 34 Courses</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Certificates Issued</span>
              <h3 className="text-2xl font-black text-white">{systemAnalytics.certificatesIssued.toLocaleString()}</h3>
              <p className="text-[10px] text-amber-400 font-semibold">100% QR Verified</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Internships Placed</span>
              <h3 className="text-2xl font-black text-white">{systemAnalytics.internshipsPlaced}</h3>
              <p className="text-[10px] text-emerald-400 font-semibold">88 Partner Companies</p>
            </div>
          </div>

          {/* Graphical Analytics Mock Visualizer */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Platform Engagement & Active Session Traffic
            </h3>
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 bg-slate-950/60 rounded-2xl border border-slate-900">
              {[45, 65, 80, 55, 90, 75, 100, 85, 95, 110, 125, 140].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg transition-all duration-500 hover:brightness-125"
                    style={{ height: `${h}px` }}
                  />
                  <span className="text-[9px] text-slate-500">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: USER MANAGEMENT & RBAC */}
      {activeSubTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> User Directory & Role Assignment (RBAC)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3 text-slate-400">{u.email}</td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg p-1 text-xs"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="mentor">Mentor</option>
                        <option value="company">Company</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">{u.status}</td>
                    <td className="p-3">
                      <button
                        onClick={() => alert(`User account settings updated for ${u.name}`)}
                        className="text-[10px] font-bold text-amber-400 hover:underline"
                      >
                        Update Permissions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CONTENT APPROVAL WORKFLOW */}
      {activeSubTab === 'content' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" /> Pending Content Approval Queue
          </h3>

          <div className="space-y-3">
            {pendingContent.length > 0 ? (
              pendingContent.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.type} Submission
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                    <p className="text-slate-400">Submitted by: {item.submitter} on {item.date}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => setPendingContent(prev => prev.filter(p => p.id !== item.id))}
                      className="bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1 border border-red-500/40"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">All pending content submissions have been reviewed!</p>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SERVER TELEMETRY */}
      {activeSubTab === 'health' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" /> Infrastructure Telemetry & Node Health
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Database Uptime</span>
              <p className="text-xl font-bold text-emerald-400">{systemAnalytics.serverUptime}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Average API Latency</span>
              <p className="text-xl font-bold text-cyan-400">{systemAnalytics.apiResponseTimeMs} ms</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Redis Cache Hit Ratio</span>
              <p className="text-xl font-bold text-purple-400">98.4%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
