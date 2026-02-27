// src/routes/index.tsx
import HomeLayout from '../layout/HomeLayout';
import Home from '../home/Home';
import Login from '../pages/auth/Login';
import GraduateRegister from '../pages/auth/GraduateRegister';
import CompanyRegister from '../pages/auth/CompanyRegister';
import DashboardLayout from '../components/common/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Graduate Pages
import GraduateProfile from '../pages/graduate/Profile';
import Exam from '../pages/graduate/Exam';
import CompanySelection from '../pages/graduate/CompanySelection';
import TrainingStatus from '../pages/graduate/TrainingStatus';

// Company Pages
import CompanyProfile from '../pages/company/Profile';
import GraduatePool from '../pages/company/GraduatePool';
import TrainingOpportunities from '../pages/company/TrainingOpportunities';

// ── Public / Marketing ────────────────────────────────────────

export const router = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '/', exact: true, element: <Home /> },
    ]
  },
  // Auth Routes
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register/graduate',
    element: <GraduateRegister />
  },
  {
    path: '/register/company',
    element: <CompanyRegister />
  },
  // Graduate Dashboard
  {
    path: '/dashboard/graduate',
    element: <ProtectedRoute allowedRole="graduate"><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'profile', element: <GraduateProfile /> },
      { path: 'exam', element: <Exam /> },
      { path: 'companies', element: <CompanySelection /> },
      { path: 'training', element: <TrainingStatus /> },
    ]
  },
  // Company Dashboard
  {
    path: '/dashboard/company',
    element: <ProtectedRoute allowedRole="company"><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'profile', element: <CompanyProfile /> },
      { path: 'pool', element: <GraduatePool /> },
      { path: 'opportunities', element: <TrainingOpportunities /> },
    ]
  },
];
