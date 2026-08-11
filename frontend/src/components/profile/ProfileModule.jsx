import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, Building, Award, Github, Linkedin, ExternalLink, Save, Sparkles } from 'lucide-react';

export const ProfileModule = () => {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);
  const [gpa, setGpa] = useState(user.gpa);
  const [github, setGithub] = useState(user.github);
  const [linkedin, setLinkedin] = useState(user.linkedin);

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      bio,
      gpa,
      github,
      linkedin
    }));
    alert('User Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-2 border-cyan-500 object-cover shadow-xl" />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">{user.role} Account • {user.department}</p>
            <p className="text-xs text-slate-400">{user.university}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Cumulative GPA</label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full p-3 rounded-xl glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Biography</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl glass-input"
            />
          </div>

          <button type="submit" className="gradient-button px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};
