import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Teacher, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [student, setStudent] = useState<Student | null>(null);
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [role, setRole] = useState<'student' | 'teacher' | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedStudent = localStorage.getItem('student');
        const savedTeacher = localStorage.getItem('teacher');
        const savedRole = localStorage.getItem('role');

        if (savedStudent && savedRole === 'student') {
            setStudent(JSON.parse(savedStudent));
            setRole('student');
        } else if (savedTeacher && savedRole === 'teacher') {
            setTeacher(JSON.parse(savedTeacher));
            setRole('teacher');
        }
    }, []);

    const login = (user: Student | Teacher, userRole: 'student' | 'teacher') => {
        if (userRole === 'student') {
            setStudent(user as Student);
            setTeacher(null);
            localStorage.setItem('student', JSON.stringify(user));
            localStorage.removeItem('teacher');
        } else {
            setTeacher(user as Teacher);
            setStudent(null);
            localStorage.setItem('teacher', JSON.stringify(user));
            localStorage.removeItem('student');
        }
        setRole(userRole);
        localStorage.setItem('role', userRole);
    };

    const logout = () => {
        setStudent(null);
        setTeacher(null);
        setRole(null);
        localStorage.removeItem('student');
        localStorage.removeItem('teacher');
        localStorage.removeItem('role');
    };

    const isAuthenticated = !!(student || teacher);

    return (
        <AuthContext.Provider value={{ student, teacher, login, logout, isAuthenticated, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
