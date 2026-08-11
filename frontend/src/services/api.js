const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getHeaders = () => {
  const token = localStorage.getItem('iq_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  async get(path) {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
  },

  async post(path, data) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json();
  },

  async put(path, data) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
    return res.json();
  },

  async delete(path) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
    return res.json();
  },
};

export const authApi = {
  async register(data) {
    return api.post('/auth/register', data);
  },
  async login(data) {
    return api.post('/auth/login', data);
  },
  async getProfile() {
    return api.get('/auth/profile');
  },
};

export const usersApi = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/users${qs ? `?${qs}` : ''}`);
  },
  async getOne(id) {
    return api.get(`/users/${id}`);
  },
  async update(id, data) {
    return api.put(`/users/${id}`, data);
  },
  async delete(id) {
    return api.delete(`/users/${id}`);
  },
};

export const lmsApi = {
  async getCourses(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/lms/courses${qs ? `?${qs}` : ''}`);
  },
  async getCourse(id) {
    return api.get(`/lms/courses/${id}`);
  },
  async createCourse(data) {
    return api.post('/lms/courses', data);
  },
  async updateCourse(id, data) {
    return api.put(`/lms/courses/${id}`, data);
  },
  async deleteCourse(id) {
    return api.delete(`/lms/courses/${id}`);
  },
  async enroll(courseId) {
    return api.post('/lms/enroll', { courseId });
  },
  async getModules(courseId) {
    return api.get(`/lms/courses/${courseId}/modules`);
  },
  async createModule(courseId, data) {
    return api.post(`/lms/courses/${courseId}/modules`, data);
  },
  async getLessons(moduleId) {
    return api.get(`/lms/modules/${moduleId}/lessons`);
  },
  async createLesson(moduleId, data) {
    return api.post(`/lms/modules/${moduleId}/lessons`, data);
  },
  async completeLesson(lessonId) {
    return api.post(`/lms/lessons/${lessonId}/complete`);
  },
};

export const internshipsApi = {
  async getListings(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/internships${qs ? `?${qs}` : ''}`);
  },
  async getOne(id) {
    return api.get(`/internships/${id}`);
  },
  async apply(id, data) {
    return api.post(`/internships/${id}/apply`, data);
  },
  async getMyApplications() {
    return api.get('/internships/my-applications');
  },
};

export const eventsApi = {
  async getEvents(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/events${qs ? `?${qs}` : ''}`);
  },
  async getOne(id) {
    return api.get(`/events/${id}`);
  },
  async register(id, data) {
    return api.post(`/events/${id}/register`, data);
  },
  async getMyRegistrations() {
    return api.get('/events/my-registrations');
  },
};

export const careerApi = {
  async getJobs(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/career/jobs${qs ? `?${qs}` : ''}`);
  },
  async getProjects() {
    return api.get('/career/projects');
  },
  async createProject(data) {
    return api.post('/career/projects', data);
  },
};

export const communityApi = {
  async getThreads(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/community/threads${qs ? `?${qs}` : ''}`);
  },
  async getThread(id) {
    return api.get(`/community/threads/${id}`);
  },
  async createThread(data) {
    return api.post('/community/threads', data);
  },
  async addComment(threadId, data) {
    return api.post(`/community/threads/${threadId}/comments`, data);
  },
};

export const aiApi = {
  async chat(data) {
    return api.post('/ai/chat', data);
  },
  async analyzeResume(data) {
    return api.post('/ai/resume-analyze', data);
  },
};

export const adminApi = {
  async getAnalytics() {
    return api.get('/admin/analytics');
  },
  async getUsers(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/admin/users${qs ? `?${qs}` : ''}`);
  },
  async approveContent(entity, id, action) {
    return api.post(`/admin/approve/${entity}/${id}`, { action });
  },
};
