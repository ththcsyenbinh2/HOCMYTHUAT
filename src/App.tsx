import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Landing from '@/pages/Landing';
import StudentAuth from '@/pages/StudentAuth';
import TeacherAuth from '@/pages/TeacherAuth';
import StudentDashboard from '@/pages/StudentDashboard';
import LessonSelection from '@/pages/LessonSelection';
import Exercise from '@/pages/Exercise';
import TeacherDashboard from '@/pages/TeacherDashboard';

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: 'student' | 'teacher' }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated || role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/student/auth" element={<StudentAuth />} />
            <Route path="/teacher/auth" element={<TeacherAuth />} />

            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute requiredRole="student">
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/lesson/:topicId"
                element={
                    <ProtectedRoute requiredRole="student">
                        <LessonSelection />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/exercise/:lessonTypeId"
                element={
                    <ProtectedRoute requiredRole="student">
                        <Exercise />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher/dashboard"
                element={
                    <ProtectedRoute requiredRole="teacher">
                        <TeacherDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
