import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, COURSES_DATA, INTERNSHIPS_DATA, MY_APPLICATIONS_DATA, EVENTS_DATA, FORUM_THREADS, JOB_POSTINGS, SYSTEM_ANALYTICS } from '../data/mockData';
import * as api from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('iq_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [activeTab, setActiveTab] = useState('landing');
  const [courses, setCourses] = useState(COURSES_DATA);
  const [myEnrollments, setMyEnrollments] = useState(['crs-001']);
  const [internships, setInternships] = useState(INTERNSHIPS_DATA);
  const [myApplications, setMyApplications] = useState(MY_APPLICATIONS_DATA);
  const [events, setEvents] = useState(EVENTS_DATA);
  const [myEventRegistrations, setMyEventRegistrations] = useState(['evt-001']);
  const [forumThreads, setForumThreads] = useState(FORUM_THREADS);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Application Shortlisted', desc: 'TechCorp Solutions shortlisted your application for Frontend React Intern!', time: '10m ago', read: false },
    { id: 2, title: 'New Event Announcement', desc: 'Inquisitors National Hackathon 2026 registration is now open.', time: '1h ago', read: false },
    { id: 3, title: 'Quiz Graded', desc: 'You scored 90% in JavaScript Fundamentals Quiz.', time: '1d ago', read: true }
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('iq_user', JSON.stringify(user));
  }, [user]);

  const switchRole = (newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  const enrollCourse = async (courseId) => {
    if (myEnrollments.includes(courseId)) return;
    try {
      await api.lmsApi.enroll(courseId);
      setMyEnrollments(prev => [...prev, courseId]);
    } catch {
      setMyEnrollments(prev => [...prev, courseId]);
    }
  };

  const applyInternship = async (internshipId, coverLetter, cvUrl) => {
    try {
      await api.internshipsApi.apply(internshipId, { coverLetter, cvUrl });
      const target = internships.find(i => i.id === internshipId);
      if (target) {
        const newApp = {
          id: `app-${Date.now()}`,
          internshipId,
          company: target.company,
          title: target.title,
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Applied',
          mentor: 'Assigned Mentor',
          mentorFeedback: 'Under initial screening.',
          score: null,
          coverLetter,
          cvUrl
        };
        setMyApplications(prev => [newApp, ...prev]);
      }
    } catch {
      const target = internships.find(i => i.id === internshipId);
      if (target) {
        const newApp = {
          id: `app-${Date.now()}`,
          internshipId,
          company: target.company,
          title: target.title,
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Applied',
          mentor: 'Assigned Mentor',
          mentorFeedback: 'Under initial screening.',
          score: null,
          coverLetter,
          cvUrl
        };
        setMyApplications(prev => [newApp, ...prev]);
      }
    }
  };

  const registerEvent = async (eventId) => {
    if (myEventRegistrations.includes(eventId)) return;
    try {
      await api.eventsApi.register(eventId);
      setMyEventRegistrations(prev => [...prev, eventId]);
    } catch {
      setMyEventRegistrations(prev => [...prev, eventId]);
    }
  };

  const createThread = async (title, category, content) => {
    try {
      const thread = await api.communityApi.createThread({ title, category, content });
      setForumThreads(prev => [thread, ...prev]);
    } catch {
      const newThread = {
        id: `thr-${Date.now()}`,
        title,
        author: user.name,
        authorRole: user.role,
        category,
        views: 1,
        repliesCount: 0,
        createdAt: 'Just now',
        isPinned: false,
        content,
        comments: []
      };
      setForumThreads(prev => [newThread, ...prev]);
    }
  };

  const addComment = async (threadId, commentText) => {
    try {
      await api.communityApi.addComment(threadId, { content: commentText });
      setForumThreads(prev => prev.map(thr => {
        if (thr.id === threadId) {
          return {
            ...thr,
            repliesCount: thr.repliesCount + 1,
            comments: [...thr.comments, {
              id: `c-${Date.now()}`,
              author: user.name,
              authorRole: user.role,
              text: commentText,
              likes: 0,
              isBestAnswer: false,
              time: 'Just now'
            }]
          };
        }
        return thr;
      }));
    } catch {
      setForumThreads(prev => prev.map(thr => {
        if (thr.id === threadId) {
          return {
            ...thr,
            repliesCount: thr.repliesCount + 1,
            comments: [...thr.comments, {
              id: `c-${Date.now()}`,
              author: user.name,
              authorRole: user.role,
              text: commentText,
              likes: 0,
              isBestAnswer: false,
              time: 'Just now'
            }]
          };
        }
        return thr;
      }));
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        switchRole,
        activeTab,
        setActiveTab,
        courses,
        setCourses,
        myEnrollments,
        enrollCourse,
        internships,
        setInternships,
        myApplications,
        setMyApplications,
        applyInternship,
        events,
        setEvents,
        myEventRegistrations,
        registerEvent,
        forumThreads,
        setForumThreads,
        createThread,
        addComment,
        jobPostings: JOB_POSTINGS,
        systemAnalytics: SYSTEM_ANALYTICS,
        notifications,
        markNotificationAsRead,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        loading,
        setLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
