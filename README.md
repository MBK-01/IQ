# Inquisitors Society - 3D Intelligent Learning & Career Platform

A full-stack platform for the Inquisitors Society at UET Lahore, featuring LMS, internship management, event registration, career tools, community forums, and AI-powered assistance.

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching & sessions
- **JWT** - Authentication
- **Socket.IO** - Real-time features
- **Swagger** - API documentation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure

```
IQ/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication & authorization
│   │   │   ├── users/       # User management
│   │   │   ├── lms/         # Learning Management System
│   │   │   ├── internships/ # Internship management
│   │   │   ├── events/      # Event management
│   │   │   ├── career/      # Career development tools
│   │   │   ├── community/   # Community forums
│   │   │   ├── admin/       # Admin dashboard
│   │   │   └── ai/          # AI assistant features
│   │   ├── common/          # Shared utilities
│   │   └── main.ts          # Application entry
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Database seed data
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context
│   │   ├── services/        # API services
│   │   ├── data/            # Mock data
│   │   └── main.jsx         # Application entry
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml       # Production deployment
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Redis (optional, for production)

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# From backend directory
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
```

### 3. Environment Configuration

Create `.env` in the backend directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://inquisitors:inquisitors123@localhost:5432/inquisitors_db?schema=public"
JWT_SECRET="inquisitors-super-secret-jwt-key-2026"
JWT_REFRESH_SECRET="inquisitors-super-secret-refresh-key-2026"
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api
- API Docs (Swagger): http://localhost:3000/api/docs

## Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Default Accounts

After running the seed script:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@inquisitors.uet.edu.pk | password123 |
| Teacher | teacher@inquisitors.uet.edu.pk | password123 |
| Student | student@inquisitors.uet.edu.pk | password123 |
| Company | hr@techcorp.com | password123 |
| Mentor | mentor@inquisitors.uet.edu.pk | password123 |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/profile` - Get current user profile

### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Soft delete user (admin)

### LMS
- `GET /api/lms/courses` - List courses
- `POST /api/lms/courses` - Create course (teacher)
- `GET /api/lms/courses/:id` - Get course details
- `POST /api/lms/enroll` - Enroll in course
- `GET /api/lms/courses/:id/modules` - Get course modules
- `POST /api/lms/modules/:id/lessons` - Create lesson
- `POST /api/lms/lessons/:id/complete` - Mark lesson complete

### Internships
- `GET /api/internships` - List internships
- `POST /api/internships` - Create internship (company)
- `POST /api/internships/:id/apply` - Apply for internship
- `GET /api/internships/my-applications` - My applications

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `POST /api/events/:id/register` - Register for event
- `GET /api/events/my-registrations` - My registrations

### Career
- `GET /api/career/jobs` - List jobs
- `POST /api/career/jobs` - Post job (company)
- `GET /api/career/projects` - List projects
- `POST /api/career/projects` - Create project

### Community
- `GET /api/community/threads` - List forum threads
- `POST /api/community/threads` - Create thread
- `POST /api/community/threads/:id/comments` - Add comment

### AI
- `POST /api/ai/chat` - AI chatbot
- `POST /api/ai/resume-analyze` - Resume analysis

### Admin
- `GET /api/admin/analytics` - Platform analytics
- `GET /api/admin/users` - User management
- `POST /api/admin/approve/:entity/:id` - Approve content

## Database Schema

The Prisma schema includes:
- **Users & Profiles** - Multi-role user system
- **Courses & Modules** - LMS structure
- **Lessons & Assignments** - Content delivery
- **Quizzes & Questions** - Assessments
- **Enrollments & Certificates** - Progress tracking
- **Internships & Applications** - Recruitment
- **Events & Registrations** - Event management
- **Community** - Forums & comments
- **Career** - Jobs, portfolios, projects, resumes
- **AI** - Chatbot, resume analysis
- **Admin** - Analytics, audit logs

## Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests (if configured)
cd frontend
npm run test
```

## License

UNLICENSED - Inquisitors Society Internal Project
